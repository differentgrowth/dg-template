import {
	MetaDescriptionField,
	MetaImageField,
	MetaTitleField,
	OverviewField
} from "@payloadcms/plugin-seo/fields"
import {
	BlocksFeature,
	FixedToolbarFeature,
	HeadingFeature,
	HorizontalRuleFeature,
	InlineToolbarFeature,
	lexicalEditor
} from "@payloadcms/richtext-lexical"
import type { CollectionConfig } from "payload"

import { CallToActionBlock } from "@/blocks/call-to-action"
import { MediaBlock } from "@/blocks/media-block"
import { formatSlugHook } from "@/hooks/format-slug"
import { populateAuthors } from "@/hooks/populate-authors"
import { revalidateDelete, revalidatePost } from "@/hooks/revalidate-posts"
import { anyone, authenticated } from "@/lib/access"
import { generatePreviewPath } from "@/lib/generate-preview-path"

export const Posts: CollectionConfig<"posts"> = {
	slug: "posts",
	access: {
		create: authenticated,
		delete: authenticated,
		read: anyone,
		update: authenticated
	},
	admin: {
		defaultColumns: ["id", "title", "publishedAt", "updatedAt"],
		useAsTitle: "title",
		livePreview: {
			url: ({ data, req }) => {
				const path = generatePreviewPath({
					slug: typeof data?.slug === "string" ? data.slug : "",
					collection: "posts",
					req
				})

				return path
			}
		},
		preview: (data, { req }) =>
			generatePreviewPath({
				slug: typeof data?.slug === "string" ? data.slug : "",
				collection: "posts",
				req
			})
	},
	defaultPopulate: {
		title: true,
		slug: true,
		categories: true
	},
	hooks: {
		afterChange: [revalidatePost],
		afterRead: [populateAuthors],
		afterDelete: [revalidateDelete]
	},
	defaultSort: "-publishedAt",
	timestamps: true,
	fields: [
		{
			name: "title",
			type: "text",
			required: true
		},
		{
			name: "caption",
			type: "text",
			required: true
		},
		{
			name: "image",
			label: "Image",
			type: "upload",
			relationTo: "media",
			filterOptions: {
				mimeType: {
					in: ["image/jpeg", "image/png", "image/webp"]
				}
			}
		},
		{
			name: "publishedAt",
			type: "date",
			admin: {
				date: {
					pickerAppearance: "dayAndTime",
					displayFormat: "dd-MM-yyyy HH:mm",
					timeFormat: "HH:mm"
				},
				position: "sidebar"
			},
			hooks: {
				beforeChange: [
					({ siblingData, value }) => {
						if (siblingData._status === "published" && !value) {
							return new Date()
						}
						return value
					}
				]
			}
		},
		{
			name: "authors",
			type: "relationship",
			admin: {
				position: "sidebar"
			},
			hasMany: true,
			relationTo: "users"
		},
		{
			name: "populatedAuthors",
			type: "array",
			access: {
				update: () => false
			},
			admin: {
				disabled: true,
				readOnly: true
			},
			fields: [
				{
					name: "id",
					type: "text"
				},
				{
					name: "name",
					type: "text"
				}
			]
		},
		{
			name: "slug",
			type: "text",
			unique: true,
			required: true,
			admin: {
				readOnly: true,
				position: "sidebar",
				components: {
					Field: {
						path: "@/components/fields/slug-generator#SlugGenerator"
					}
				}
			},
			hooks: {
				beforeValidate: [formatSlugHook()]
			}
		},
		{
			type: "tabs",
			tabs: [
				{
					label: "Content",
					fields: [
						{
							name: "content",
							type: "richText",
							label: false,
							required: true,
							editor: lexicalEditor({
								features: ({ rootFeatures }) => {
									return [
										...rootFeatures,
										HeadingFeature({ enabledHeadingSizes: ["h1", "h2", "h3", "h4"] }),
										BlocksFeature({ blocks: [CallToActionBlock, MediaBlock] }),
										FixedToolbarFeature(),
										InlineToolbarFeature(),
										HorizontalRuleFeature()
									]
								}
							})
						}
					]
				},
				{
					label: "Meta",
					fields: [
						{
							name: "categories",
							type: "relationship",
							hasMany: true,
							relationTo: "categories"
						},
						{
							name: "relatedPosts",
							type: "relationship",
							hasMany: true,
							relationTo: "posts",
							filterOptions: ({ id }) => {
								return {
									id: {
										not_in: [id]
									}
								}
							}
						}
					]
				},
				{
					name: "meta",
					label: "SEO",
					fields: [
						OverviewField({
							titlePath: "meta.title",
							descriptionPath: "meta.description",
							imagePath: "meta.image"
						}),
						MetaTitleField({
							hasGenerateFn: true
						}),
						MetaDescriptionField({
							hasGenerateFn: true
						}),
						MetaImageField({
							// hasGenerateFn: true,
							relationTo: "media"
						})
					]
				}
			]
		}
	],
	versions: {
		drafts: {
			autosave: {
				interval: 100
			},
			schedulePublish: true
		},
		maxPerDoc: 25
	}
}
