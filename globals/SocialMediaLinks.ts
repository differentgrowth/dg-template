import type { GlobalConfig } from "payload"

import { revalidateSocialMediaLinks } from "@/hooks/revalidate-social-media-links"
import { anyone, isAdmin } from "@/lib/access"

export const SocialMediaLinks: GlobalConfig = {
	slug: "social-media-links",
	access: {
		read: anyone,
		update: isAdmin
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
				},
				{
					name: "platform",
					type: "select",
					options: [
						{ label: "None", value: "" },
						{ label: "Facebook", value: "facebook" },
						{ label: "Instagram", value: "instagram" },
						{ label: "LinkedIn", value: "linkedin" },
						{ label: "Telegram", value: "telegram" },
						{ label: "TikTok", value: "tiktok" },
						{ label: "Twitter/X", value: "twitter" },
						{ label: "YouTube", value: "youtube" }
					],
					defaultValue: "",
					admin: {
						description: "Select a social media platform (optional)",
						position: "sidebar"
					}
				}
			]
		}
	],
	hooks: {
		afterChange: [revalidateSocialMediaLinks]
	}
}
