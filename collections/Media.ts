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
		defaultColumns: ["filename", "alt", "mimeType", "filesize"],
		useAsTitle: "filename"
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
		imageSizes: [
			{
				name: "thumbnail",
				width: 400,
				height: 300,
				position: "centre"
			},
			{
				name: "card",
				width: 1024,
				height: undefined,
				position: "center"
			},
			{
				name: "original",
				width: undefined,
				height: undefined,
				position: "center"
			},
			{
				name: "og",
				width: 1200,
				height: 630,
				crop: "center"
			}
		],
		adminThumbnail: "thumbnail"
	}
}
