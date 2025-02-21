import {
	FixedToolbarFeature,
	InlineToolbarFeature,
	lexicalEditor
} from "@payloadcms/richtext-lexical"
import type { CollectionConfig } from "payload"

import { anyone, isAdmin } from "@/lib/access"

export const Media: CollectionConfig = {
	slug: "media",
	access: {
		create: isAdmin,
		delete: isAdmin,
		read: anyone,
		update: isAdmin
	},
	admin: {
		defaultColumns: ["filename", "alt", "mimeType", "filesize"]
	},
	fields: [
		{
			name: "alt",
			type: "text"
		},
		{
			name: "caption",
			type: "richText",
			editor: lexicalEditor({
				features: ({ rootFeatures }) => {
					return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
				}
			})
		}
	],
	upload: {
		adminThumbnail: "thumbnail"
	}
}
