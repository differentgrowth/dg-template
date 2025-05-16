import type { GlobalConfig } from "payload"

import { revalidateLinks } from "@/hooks/revalidate-links"
import { anyone, isAdmin } from "@/lib/access"

export const Links: GlobalConfig = {
	slug: "links",
	access: {
		read: anyone,
		update: isAdmin
	},
	admin: {
		hideAPIURL: process.env.NODE_ENV === "production"
	},
	hooks: {
		afterChange: [revalidateLinks]
	},
	fields: [
		{
			name: "items",
			type: "array",
			required: true,
			fields: [
				{
					name: "label",
					type: "text",
					required: true,
					label: "Nombre"
				},
				{
					name: "url",
					type: "text",
					required: true,
					label: "URL"
				},
				{
					name: "event",
					type: "text",
					admin: { description: "Analytics event" }
				}
			]
		}
	]
}
