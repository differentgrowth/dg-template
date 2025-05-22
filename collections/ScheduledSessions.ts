import type { CollectionConfig } from "payload"
import type { Payload } from "payload" // Import Payload for hook
import { authenticated, isAdmin } from "@/lib/access" // Assuming this path is correct

export const ScheduledSessions: CollectionConfig = {
	slug: "scheduled-sessions",
	access: {
		admin: authenticated, // Or isAdmin
		create: isAdmin,
		delete: isAdmin,
		read: authenticated,
		update: isAdmin
	},
	admin: {
		useAsTitle: "id" // Placeholder, can be improved with a custom title hook later
	},
	fields: [
		{
			name: "activityType",
			type: "relationship",
			relationTo: "activity-types",
			required: true
		},
		{
			name: "sessionType",
			type: "select",
			options: [
				{ label: "Group Class Instance", value: "group_class_instance" },
				{
					label: "Personal Training Slot Template",
					value: "personal_training_slot_template"
				}
			],
			required: true
		},
		{
			name: "startTime",
			type: "date",
			required: true,
			admin: {
				date: {
					pickerAppearance: "dayAndTime"
				}
			}
		},
		{
			name: "endTime",
			type: "date",
			required: true,
			admin: {
				date: {
					pickerAppearance: "dayAndTime"
				},
				description: "Auto-calculated for group classes via hook."
			}
		},
		{
			name: "instructors",
			type: "relationship",
			relationTo: "staff-profiles",
			hasMany: true,
			admin: {
				condition: ({ sessionType }) => sessionType === "group_class_instance",
				description: "For group classes"
			}
		},
		{
			name: "maxCapacityOverride",
			type: "number",
			admin: {
				description: "For specific group class instance capacity"
			}
		},
		{
			name: "status",
			type: "select",
			options: [
				{ label: "Scheduled", value: "scheduled" },
				{ label: "Cancelled", value: "cancelled" },
				{ label: "Completed", value: "completed" }
			],
			defaultValue: "scheduled",
			required: true
		},
		{
			name: "notes",
			type: "text",
			admin: {
				description: "Internal notes"
			}
		}
	],
	hooks: {
		beforeChange: [
			async ({ data, req, operation }) => {
				if (
					data.sessionType === "group_class_instance" &&
					data.startTime &&
					data.activityType
				) {
					const payload = req.payload as Payload // Get payload instance from request

					try {
						const activityTypeDoc = await payload.findByID({
							collection: "activity-types",
							id: data.activityType as string // Assuming activityType is stored as ID
						})

						if (activityTypeDoc && activityTypeDoc.durationMinutes) {
							const startTime = new Date(data.startTime)
							const duration = Number(activityTypeDoc.durationMinutes)
							data.endTime = new Date(
								startTime.getTime() + duration * 60000
							).toISOString()
						}
					} catch (error) {
						// Log the error or handle it as needed
						console.error(
							"Error fetching activity type or calculating endTime:",
							error
						)
						// Optionally, you could throw an error to prevent saving if endTime calculation fails
						// throw new Error("Could not calculate end time due to an error.");
					}
				}
				return data
			}
		]
	}
}
