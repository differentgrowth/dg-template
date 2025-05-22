import type { PayloadHandler } from "payload/config"
import type { PayloadRequest } from "payload/types"
import type { StaffProfile } from "payload/generated-types" // Assuming generated types

// --- Interfaces ---
interface TimeBlock {
	start: Date
	end: Date
}

interface AvailabilitySlot {
	startTime: Date
	endTime: Date
	durationMinutes: 30 | 60
}

// --- Helper Functions ---

/**
 * Parses an HH:MM string into hours and minutes.
 */
function parseHHMM(timeStr: string): { hours: number; minutes: number } | null {
	const match = timeStr.match(/^(\d{2}):(\d{2})$/)
	if (match) {
		return { hours: parseInt(match[1], 10), minutes: parseInt(match[2], 10) }
	}
	return null
}

/**
 * Creates a Date object for a specific day and HH:MM time.
 * Assumes server's local timezone for date construction.
 */
function createDateFromDayAndTime(
	day: Date,
	timeStr: string
): Date | null {
	const timeParts = parseHHMM(timeStr)
	if (timeParts) {
		const newDate = new Date(day)
		newDate.setHours(timeParts.hours, timeParts.minutes, 0, 0)
		return newDate
	}
	return null
}

/**
 * Adds minutes to a Date object.
 */
function addMinutes(date: Date, minutes: number): Date {
	return new Date(date.getTime() + minutes * 60000)
}

/**
 * Subtracts a busy block from a list of available blocks.
 * This is the core logic for availability calculation.
 */
function subtractBlock(
	existingBlocks: TimeBlock[],
	busyBlock: TimeBlock
): TimeBlock[] {
	const updatedBlocks: TimeBlock[] = []
	for (const block of existingBlocks) {
		// Case 1: No overlap
		if (block.end <= busyBlock.start || block.start >= busyBlock.end) {
			updatedBlocks.push(block)
			continue
		}

		// Case 2: Busy block covers existing block entirely
		if (busyBlock.start <= block.start && busyBlock.end >= block.end) {
			continue // This block is removed
		}

		// Case 3: Busy block is within the existing block (splits it)
		if (busyBlock.start > block.start && busyBlock.end < block.end) {
			updatedBlocks.push({ start: block.start, end: busyBlock.start })
			updatedBlocks.push({ start: busyBlock.end, end: block.end })
			continue
		}

		// Case 4: Busy block truncates the start of the existing block
		if (busyBlock.start <= block.start && busyBlock.end < block.end) {
			updatedBlocks.push({ start: busyBlock.end, end: block.end })
			continue
		}

		// Case 5: Busy block truncates the end of the existing block
		if (busyBlock.start > block.start && busyBlock.end >= block.end) {
			updatedBlocks.push({ start: block.start, end: busyBlock.start })
			continue
		}
	}
	return updatedBlocks
}

// --- Main Endpoint Logic ---
export const getPTAvailability: PayloadHandler = async (
	req: PayloadRequest,
	res
) => {
	const { staffId, startDate, endDate } = req.query

	// 1. Validate parameters
	if (!staffId || typeof staffId !== "string") {
		return res.status(400).json({ error: "Missing or invalid staffId" })
	}
	if (!startDate || typeof startDate !== "string" || !Date.parse(startDate)) {
		return res.status(400).json({ error: "Missing or invalid startDate" })
	}
	if (!endDate || typeof endDate !== "string" || !Date.parse(endDate)) {
		return res.status(400).json({ error: "Missing or invalid endDate" })
	}

	const startQueryDate = new Date(startDate)
	startQueryDate.setHours(0, 0, 0, 0) // Normalize to start of day
	const endQueryDate = new Date(endDate)
	endQueryDate.setHours(23, 59, 59, 999) // Normalize to end of day

	if (startQueryDate >= endQueryDate) {
		return res
			.status(400)
			.json({ error: "startDate must be before endDate" })
	}

	try {
		// 2. Fetch StaffProfile
		const staffProfile = (await req.payload.findByID({
			collection: "staff-profiles",
			id: staffId
			// Removed depth: 1 as workingHours is a top-level field in StaffProfiles
		})) as StaffProfile // Cast to specific type

		if (!staffProfile || !staffProfile.workingHours) {
			return res
				.status(404)
				.json({ error: "StaffProfile or working hours not found" })
		}

		// 3. Fetch ScheduledSessions (Group Classes taught by this staff)
		const groupClassesResponse = await req.payload.find({
			collection: "scheduled-sessions",
			where: {
				and: [
					{ sessionType: { equals: "group_class_instance" } },
					{ instructors: { contains: staffId } },
					{
						startTime: { less_than_equal: endQueryDate.toISOString() }
					},
					{
						endTime: {
							greater_than_equal: startQueryDate.toISOString()
						}
					}
				]
			},
			limit: 0 // Fetch all matching
		})
		const groupClasses = groupClassesResponse.docs

		// 4. Fetch Bookings (Personal Training sessions for this staff)
		const personalTrainingSessionsResponse = await req.payload.find({
			collection: "bookings",
			where: {
				and: [
					{ bookingType: { equals: "personal_training" } },
					{ personalTrainingStaff: { equals: staffId } },
					{
						ptStartTime: { less_than_equal: endQueryDate.toISOString() }
					},
					{
						ptEndTime: { greater_than_equal: startQueryDate.toISOString() }
					}
				]
			},
			limit: 0 // Fetch all matching
		})
		const personalTrainingSessions = personalTrainingSessionsResponse.docs

		// 5. Calculate Initial Availability from workingHours
		let availableBlocks: TimeBlock[] = []
		const dayMapping = [
			"sunday",
			"monday",
			"tuesday",
			"wednesday",
			"thursday",
			"friday",
			"saturday"
		]

		for (
			let day = new Date(startQueryDate);
			day <= endQueryDate;
			day.setDate(day.getDate() + 1)
		) {
			const dayOfWeekStr = dayMapping[day.getDay()]
			const workingDay = staffProfile.workingHours.find(
				(whBlock: any) =>
					whBlock.blockType === "WorkingDay" &&
					whBlock.dayOfWeek === dayOfWeekStr
			)

			if (workingDay && workingDay.slots) {
				for (const slot of workingDay.slots) {
					if (slot.startTime && slot.endTime) {
						const start = createDateFromDayAndTime(day, slot.startTime)
						const end = createDateFromDayAndTime(day, slot.endTime)
						if (start && end && start < end) {
							availableBlocks.push({ start, end })
						}
					}
				}
			}
		}

		// 6. Subtract Group Classes
		for (const session of groupClasses) {
			if (session.startTime && session.endTime) {
				const busyBlock: TimeBlock = {
					start: new Date(session.startTime),
					end: new Date(session.endTime)
				}
				availableBlocks = subtractBlock(availableBlocks, busyBlock)
			}
		}

		// 7. Subtract Existing Personal Training Sessions
		for (const booking of personalTrainingSessions) {
			if (booking.ptStartTime && booking.ptEndTime) {
				const busyBlock: TimeBlock = {
					start: new Date(booking.ptStartTime),
					end: new Date(booking.ptEndTime)
				}
				availableBlocks = subtractBlock(availableBlocks, busyBlock)
			}
		}

		// 8. Split Available Blocks into Slots and Filter
		const availablePTSlots: AvailabilitySlot[] = []
		const now = new Date()
		const minLeadTime = addMinutes(now, 15) // Minimum 15 mins lead time
		// const maxLeadTime = addMinutes(now, 7 * 24 * 60); // Maximum 1 week lead time (optional for now)

		for (const block of availableBlocks) {
			// Generate 30-minute slots
			let currentSlotStart = new Date(block.start)
			while (addMinutes(currentSlotStart, 30) <= block.end) {
				if (currentSlotStart >= minLeadTime) {
					// Basic lead time check (not in past + 15 min)
					availablePTSlots.push({
						startTime: new Date(currentSlotStart),
						endTime: addMinutes(currentSlotStart, 30),
						durationMinutes: 30
					})
				}
				currentSlotStart = addMinutes(currentSlotStart, 30) // Or use a configurable slot step
			}

			// Generate 60-minute slots
			currentSlotStart = new Date(block.start)
			while (addMinutes(currentSlotStart, 60) <= block.end) {
				if (currentSlotStart >= minLeadTime) {
					availablePTSlots.push({
						startTime: new Date(currentSlotStart),
						endTime: addMinutes(currentSlotStart, 60),
						durationMinutes: 60
					})
				}
				currentSlotStart = addMinutes(currentSlotStart, 60)
			}
		}

		// Sort slots by start time
		availablePTSlots.sort(
			(a, b) => a.startTime.getTime() - b.startTime.getTime()
		)

		// 9. Return calculated slots
		return res.status(200).json({
			availablePTSlots
			// For debugging, you might also return:
			// _debug: {
			// 	initialWorkingBlocks: staffProfile.workingHours,
			// 	fetchedGroupClasses: groupClasses,
			// 	fetchedPTSessions: personalTrainingSessions,
			// 	calculatedInitialAvailableBlocks: availableBlocksBeforeSubtraction, // Need to store this if wanted
			//  finalAvailableBlocksAfterSubtraction: availableBlocks
			// }
		})
	} catch (error: unknown) {
		const message =
			error instanceof Error ? error.message : "An unknown error occurred."
		req.payload.logger.error(
			`Error in /api/pt-availability: ${message}`
		)
		return res
			.status(500)
			.json({ error: "Failed to calculate availability data." })
	}
}
