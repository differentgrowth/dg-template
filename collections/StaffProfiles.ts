import type { CollectionConfig } from "payload"

import { authenticated, isAdmin } from "@/lib/access" // Assuming this path is correct

export const StaffProfiles: CollectionConfig = {
	slug: "staff-profiles",
	access: {
		admin: authenticated, // Or isAdmin if only admins can view all profiles
		create: isAdmin,
		delete: isAdmin,
		read: authenticated,
		update: isAdmin // Or allow staff to update their own profiles
	},
	admin: {
		useAsTitle: "user" // This will likely show the user's ID, consider a hook to populate with name/email
	},
	fields: [
		{
			name: "user",
			type: "relationship",
			relationTo: "users",
			required: true,
			unique: true,
			filterOptions: ({ relationTo, data, siblingData }) => {
				// Only show users with the 'staff' role
				// This requires that the 'roles' field in the 'users' collection is properly configured
				return {
					roles: {
						contains: "staff"
					}
				}
			},
			admin: {
				condition: ({ user }) => !!user // Hide if user is not selected (relevant for creation)
			}
		},
		{
			name: "bio",
			type: "richText"
		},
		{
			name: "photo",
			type: "relationship",
			relationTo: "media"
		},
		{
			name: "canTeachPersonalTraining",
			type: "checkbox",
			defaultValue: false
		},
		{
			name: "workingHours",
			type: "blocks",
			blocks: [
				{
					slug: "WorkingDay",
					fields: [
						{
							name: "dayOfWeek",
							type: "select",
							options: [
								{ label: "Monday", value: "monday" },
								{ label: "Tuesday", value: "tuesday" },
								{ label: "Wednesday", value: "wednesday" },
								{ label: "Thursday", value: "thursday" },
								{ label: "Friday", value: "friday" },
								{ label: "Saturday", value: "saturday" },
								{ label: "Sunday", value: "sunday" }
							],
							required: true
						},
						{
							name: "slots",
							type: "array",
							fields: [
								{
									name: "startTime",
									type: "text",
									required: true,
									admin: {
										description: "HH:MM format"
									}
								},
								{
									name: "endTime",
									type: "text",
									required: true,
									admin: {
										description: "HH:MM format"
									}
								}
							]
						}
					]
				}
			]
		}
	]
}
