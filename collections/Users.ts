import type { CollectionConfig } from "payload"

import { authenticated, isAdmin } from "@/lib/access"

export const Users: CollectionConfig = {
	slug: "users",
	access: {
		admin: authenticated,
		create: isAdmin,
		delete: isAdmin,
		read: authenticated,
		update: authenticated
	},
	admin: {
		defaultColumns: ["firstName", "lastName", "email", "roles"],
		useAsTitle: "email"
	},
	auth: true,
	timestamps: true,
	fields: [
		{
			name: "firstName",
			type: "text",
			required: true
		},
		{
			name: "lastName",
			type: "text",
			required: true
		},
		{
			name: "phone",
			type: "text"
		},
		{
			name: "stripeCustomerId",
			type: "text"
		},
		{
			name: "roles",
			type: "select",
			hasMany: true,
			options: [
				{ label: "Admin", value: "admin" },
				{ label: "Staff", value: "staff" },
				{ label: "Client", value: "client" }
			],
			required: true,
			defaultValue: ["client"]
		}
	]
}
