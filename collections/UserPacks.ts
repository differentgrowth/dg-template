import type { CollectionConfig, BeforeChangeHook } from "payload/types"
import type { Payload } from "payload" // Import Payload for hook
import { isAdmin, isClientOwnerOrAdmin } from "@/lib/access" // Assuming/Creating these access controls

const calculateExpirationAndCredits: BeforeChangeHook = async ({
	data,
	req,
	operation
}) => {
	const payload = req.payload as Payload

	if (operation === "create" && data.servicePack && data.purchaseDate) {
		try {
			const servicePackDoc = await payload.findByID({
				collection: "service-packs",
				id: data.servicePack as string // Assuming servicePack is stored as ID
			})

			if (servicePackDoc) {
				// Initialize creditsRemaining
				if (servicePackDoc.creditsGranted) {
					data.creditsRemaining = Number(servicePackDoc.creditsGranted)
				}

				// Calculate expirationDate
				if (servicePackDoc.validityDays) {
					const purchaseDate = new Date(data.purchaseDate)
					const validity = Number(servicePackDoc.validityDays)
					data.expirationDate = new Date(
						purchaseDate.setDate(purchaseDate.getDate() + validity)
					).toISOString()
				}
			}
		} catch (error) {
			console.error("Error fetching service pack or calculating fields:", error)
		}
	}
	return data
}

export const UserPacks: CollectionConfig = {
	slug: "user-packs",
	access: {
		create: isAdmin, // Or allow clients to purchase, then this needs to be isClient
		read: isClientOwnerOrAdmin("user"),
		update: isAdmin,
		delete: isAdmin
	},
	admin: {
		useAsTitle: "id" // Placeholder
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
			name: "servicePack",
			type: "relationship",
			relationTo: "service-packs",
			required: true
		},
		{
			name: "purchaseDate",
			type: "date",
			required: true,
			defaultValue: () => new Date().toISOString(),
			admin: {
				date: {
					pickerAppearance: "dayOnly"
				}
			}
		},
		{
			name: "expirationDate",
			type: "date",
			admin: {
				description:
					"Calculated if servicePack.validityDays exists. Hook needed.",
				date: {
					pickerAppearance: "dayOnly"
				},
				readOnly: true
			}
		},
		{
			name: "creditsRemaining",
			type: "number",
			required: true,
			admin: {
				description: "Initialized from Service Pack on creation."
			}
		},
		{
			name: "status",
			type: "select",
			options: [
				{ label: "Active", value: "active" },
				{ label: "Depleted", value: "depleted" }, // All credits used
				{ label: "Expired", value: "expired" } // Past expirationDate
			],
			required: true,
			defaultValue: "active"
		}
	],
	hooks: {
		beforeChange: [calculateExpirationAndCredits]
	}
}
