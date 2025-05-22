import type { CollectionConfig } from "payload"
import type { BeforeChangeHook, CollectionValidate } from "payload/types" // Import CollectionValidate
import { authenticated, isAdmin, isClient, isStaffOrAdmin } from "@/lib/access" // Assuming these access controls exist or will be created

const calculatePtEndTime: BeforeChangeHook = ({ data, req, operation }) => {
	if (
		data.bookingType === "personal_training" &&
		data.ptStartTime &&
		data.ptDurationMinutes
	) {
		const startTime = new Date(data.ptStartTime)
		const duration = Number(data.ptDurationMinutes)
		data.ptEndTime = new Date(
			startTime.getTime() + duration * 60000
		).toISOString()
	}
	return data
}

const validateBookingData: CollectionValidate = async (data, { payload, user }) => {
	const errors: Array<{ message: string; field?: string }> = []

	if (data.bookingType === "group_class") {
		if (!data.scheduledSession) {
			errors.push({
				message: "Scheduled Session is required for Group Class bookings.",
				field: "scheduledSession"
			})
		}
	} else if (data.bookingType === "personal_training") {
		if (!data.personalTrainingStaff) {
			errors.push({
				message: "Personal Training Staff is required for Personal Training bookings.",
				field: "personalTrainingStaff"
			})
		}
		if (!data.ptStartTime) {
			errors.push({
				message: "Start Time is required for Personal Training bookings.",
				field: "ptStartTime"
			})
		}
		if (!data.ptDurationMinutes) {
			errors.push({
				message: "Duration is required for Personal Training bookings.",
				field: "ptDurationMinutes"
			})
		}
	}

	if (errors.length > 0) {
		// Payload expects a string return for validation errors, so we join messages.
		// Ideally, future Payload versions might support structured errors better.
		return errors.map((err) => err.message).join("\n")
	}

	return true // No errors
}

export const Bookings: CollectionConfig = {
	slug: "bookings",
	access: {
		// Define specific access controls
		create: isClient, // Clients can create bookings
		read: ({ req: { user } }) => {
			if (user) {
				if (user.roles?.includes("admin") || user.roles?.includes("staff")) {
					return true // Admins/Staff can read all
				}
				// Clients can read their own bookings
				return {
					client: {
						equals: user.id
					}
				}
			}
			return false // No access if not logged in
		},
		update: isStaffOrAdmin, // Only staff/admin can update (e.g., status)
		delete: isStaffOrAdmin // Only staff/admin can delete
	},
	admin: {
		useAsTitle: "id" // Can be improved later with a hook for a dynamic title
	},
	fields: [
		{
			name: "client",
			type: "relationship",
			relationTo: "users",
			required: true,
			filterOptions: () => {
				// Filter for users with the 'client' role
				return {
					roles: {
						contains: "client"
					}
				}
			},
			hooks: {
				// Auto-assign logged-in client user on create if not admin/staff
				beforeChange: [
					({ req, operation, data }) => {
						if (operation === "create" && req.user) {
							if (
								!req.user.roles.includes("admin") &&
								!req.user.roles.includes("staff")
							) {
								return req.user.id
							}
						}
						return data?.client // Keep existing or admin-set value
					}
				]
			}
		},
		{
			name: "bookingType",
			type: "select",
			options: [
				{ label: "Group Class", value: "group_class" },
				{ label: "Personal Training", value: "personal_training" }
			],
			required: true
		},
		{
			name: "scheduledSession",
			type: "relationship",
			relationTo: "scheduled-sessions",
			admin: {
				condition: ({ bookingType }) => bookingType === "group_class",
				description: "Required if bookingType is 'Group Class'"
			}
		},
		{
			name: "personalTrainingStaff",
			type: "relationship",
			relationTo: "staff-profiles",
			admin: {
				condition: ({ bookingType }) => bookingType === "personal_training",
				description: "Required if bookingType is 'Personal Training'"
			}
		},
		{
			name: "ptStartTime",
			type: "date",
			admin: {
				date: {
					pickerAppearance: "dayAndTime"
				},
				condition: ({ bookingType }) => bookingType === "personal_training",
				description: "Required for Personal Training"
			}
		},
		{
			name: "ptDurationMinutes",
			type: "number",
			admin: {
				condition: ({ bookingType }) => bookingType === "personal_training",
				description: "e.g., 30 or 60. Required for Personal Training"
			}
		},
		{
			name: "ptEndTime",
			type: "date",
			admin: {
				date: {
					pickerAppearance: "dayAndTime"
				},
				condition: ({ bookingType }) => bookingType === "personal_training",
				description: "Calculated for Personal Training via hook.",
				readOnly: true // Make it read-only in admin as it's auto-calculated
			}
		},
		{
			name: "bookingTime",
			type: "date",
			defaultValue: () => new Date(),
			admin: {
				readOnly: true,
				description: "Auto-set on creation"
			}
		},
		{
			name: "status",
			type: "select",
			options: [
				{ label: "Confirmed", value: "confirmed" },
				{ label: "Cancelled by Client", value: "cancelled_by_client" },
				{ label: "Cancelled by Admin", value: "cancelled_by_admin" },
				{ label: "Attended", value: "attended" },
				{ label: "No Show", value: "no_show" }
			],
			defaultValue: "confirmed",
			required: true
		},
		{
			name: "paymentSource",
			type: "text",
			admin: {
				description:
					"Placeholder for UserMembership/UserPack relation. For now, a text field."
			}
		},
		{
			name: "stripePaymentIntentId",
			type: "text",
			admin: {
				description: "For direct payments not covered by pack/membership"
			}
		}
	],
	hooks: {
		beforeChange: [calculatePtEndTime]
	},
	validate: validateBookingData // Add collection-level validation
}
