import type { CollectionConfig } from "payload"
import { isAdmin, isClientOwnerOrAdmin } from "@/lib/access" // Assuming/Creating these access controls

export const UserMemberships: CollectionConfig = {
	slug: "user-memberships",
	access: {
		create: isAdmin,
		read: isClientOwnerOrAdmin("user"), // Clients can read their own, admins can read all
		update: isAdmin,
		delete: isAdmin
	},
	admin: {
		useAsTitle: "id" // Placeholder; a hook could make this more descriptive
	},
	fields: [
		{
			name: "user",
			type: "relationship",
			relationTo: "users",
			required: true,
			filterOptions: () => {
				return {
					roles: {
						contains: "client" // Only allow selection of clients
					}
				}
			}
		},
		{
			name: "membershipPlan",
			type: "relationship",
			relationTo: "membership-plans",
			required: true
		},
		{
			name: "stripeSubscriptionId",
			type: "text",
			required: true,
			unique: true
		},
		{
			name: "startDate",
			type: "date",
			required: true,
			admin: {
				date: {
					pickerAppearance: "dayOnly"
				}
			}
		},
		{
			name: "endDate",
			type: "date",
			admin: {
				description: "Calculated or updated via Stripe webhook/logic",
				date: {
					pickerAppearance: "dayOnly"
				}
			}
		},
		{
			name: "nextBillingDate",
			type: "date",
			admin: {
				date: {
					pickerAppearance: "dayOnly"
				}
			}
		},
		{
			name: "creditsRemaining",
			type: "number",
			admin: {
				description: "Updated when a booking is made or membership renews."
			}
		},
		{
			name: "status",
			type: "select",
			options: [
				{ label: "Active", value: "active" },
				{ label: "Past Due", value: "past_due" },
				{ label: "Cancelled", value: "cancelled" },
				{ label: "Expired", value: "expired" } // e.g. after cancellation period ends
			],
			required: true,
			defaultValue: "active"
		}
	]
}
