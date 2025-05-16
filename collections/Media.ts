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
		defaultColumns: ["id", "filename", "alt", "mimeType", "filesize"],
		useAsTitle: "filename",
		hideAPIURL: process.env.NODE_ENV === "production"
	},
	defaultPopulate: {
		alt: true,
		url: true,
		caption: true,
		thumbnailURL: true,
		filename: true,
		mimeType: true,
		width: true,
		height: true,
		sizes: true
	},
	fields: [
		{
			name: "alt",
			type: "text",
			localized: true
		},
		{
			name: "caption",
			type: "richText",
			editor: lexicalEditor({
				features: ({ rootFeatures }) => {
					return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
				}
			}),
			localized: true
		}
	],
	upload: {
		adminThumbnail: "thumbnail",
		focalPoint: true,
		imageSizes: [
			{
				name: "thumbnail",
				width: 300
			},
			{
				name: "square",
				width: 500,
				height: 500
			},
			{
				name: "small",
				width: 600
			},
			{
				name: "medium",
				width: 900
			},
			{
				name: "large",
				width: 1400
			},
			{
				name: "xlarge",
				width: 1920
			},
			{
				name: "og",
				width: 1200,
				height: 630,
				crop: "center",
				withoutEnlargement: false
			}
		]
	}
}
