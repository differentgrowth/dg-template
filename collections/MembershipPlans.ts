import type { CollectionConfig } from "payload"
import { authenticated, isAdmin } from "@/lib/access" // Assuming these access controls exist

export const MembershipPlans: CollectionConfig = {
	slug: "membership-plans",
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
				description: "e.g., Gold Classes Membership"
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
			name: "billingInterval",
			type: "select",
			options: [
				{ label: "Month", value: "month" },
				{ label: "Year", value: "year" }
			],
			required: true,
			admin: {
				description: "Corresponds to Stripe billing interval (month or year)"
			}
		},
		{
			name: "price",
			type: "number",
			required: true
		},
		{
			name: "creditsGranted",
			type: "number",
			required: true,
			admin: {
				description:
					"e.g., 10 credits/month. For unlimited, use a very high number or a specific flag if needed later."
			}
		},
		{
			name: "isActive",
			type: "checkbox",
			defaultValue: true
		}
	]
}
