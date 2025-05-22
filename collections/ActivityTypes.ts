import type { CollectionConfig } from "payload"

import { authenticated, isAdmin } from "@/lib/access" // Assuming this path is correct

export const ActivityTypes: CollectionConfig = {
	slug: "activity-types",
	access: {
		admin: authenticated, // Or isAdmin if only admins can view all
		create: isAdmin,
		delete: isAdmin,
		read: authenticated,
		update: isAdmin
	},
	admin: {
		useAsTitle: "name"
	},
	fields: [
		{
			name: "name",
			type: "text",
			required: true,
			unique: true,
			admin: {
				description: "e.g., Vinyasa Yoga, Spinning, Personal Training"
			}
		},
		{
			name: "description",
			type: "richText"
		},
		{
			name: "activityNature",
			type: "select",
			options: [
				{ label: "Group Class", value: "group_class" },
				{ label: "Personal Training", value: "personal_training" }
			],
			required: true
		},
		{
			name: "durationMinutes",
			type: "number",
			required: true,
			admin: {
				description: "Duration in minutes. For PT, could be a default or list of allowed durations."
			}
		},
		{
			name: "maxCapacity",
			type: "number",
			admin: {
				condition: ({ activityNature }) => activityNature === "group_class",
				description: "Only for group_class"
			}
		},
		{
			name: "color",
			type: "text",
			admin: {
				description: "For calendar display, e.g., #FF5733"
			}
		}
	]
}
