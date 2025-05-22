import type { CollectionConfig } from "payload"
import { authenticated, isAdmin } from "@/lib/access" // Assuming these access controls exist

export const ServicePacks: CollectionConfig = {
	slug: "service-packs",
	access: {
		read: authenticated,
		create: isAdmin,
		update: isAdmin,
		delete: isAdmin
	},
	admin: {
		useAsTitle: "name"
	},
	fields: [
		{
			name: "name",
			type: "text",
			required: true,
			admin: {
				description: "e.g., 10 Yoga Classes Pack"
			}
		},
		{
			name: "description",
			type: "richText"
		},
		{
			name: "stripePriceId",
			type: "text",
			required: true,
			admin: {
				description: "Stripe Price ID (e.g., price_xxxxxxxxxxxxxx)"
			}
		},
		{
			name: "appliesTo",
			type: "select",
			hasMany: true,
			options: [
				{ label: "Group Classes", value: "group_classes" },
				{ label: "Personal Training", value: "personal_training" }
			],
			required: true
		},
		{
			name: "creditsGranted",
			type: "number",
			required: true
		},
		{
			name: "price",
			type: "number",
			required: true
		},
		{
			name: "validityDays",
			type: "number",
			admin: {
				description: "e.g., 90 days to use pack. Leave blank for no expiry."
			}
		},
		{
			name: "isActive",
			type: "checkbox",
			defaultValue: true
		}
	]
}
