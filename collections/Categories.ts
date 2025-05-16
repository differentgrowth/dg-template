import type { CollectionConfig } from "payload"

import { anyone, authenticated, isAdmin } from "@/lib/access"

export const Categories: CollectionConfig = {
	slug: "categories",
	access: {
		create: isAdmin,
		delete: isAdmin,
		read: anyone,
		update: authenticated
	},
	admin: {
		useAsTitle: "title",
		hideAPIURL: process.env.NODE_ENV === "production"
	},
	fields: [
		{
			name: "title",
			type: "text",
			required: true
		}
	]
}
