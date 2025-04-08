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
	defaultPopulate: {
		title: true,
		slug: true,
		categories: true
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
			name: "publishedAt",
			type: "date",
			admin: {
				date: {
					pickerAppearance: "dayAndTime",
					displayFormat: "dd-MM-yyyy"
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
			name: "featured",
			type: "checkbox",
			admin: {
				position: "sidebar",
				components: {
					Cell: "@/components/cells/boolean-cell#BooleanCell"
				}
			}
		},
		{
			name: "slug",
			type: "text",
			unique: true,
			required: true,
			admin: {
				position: "sidebar",
				components: {
					Field: {
						path: "@/components/fields/slug-generator#SlugGenerator"
					}
				}
			}
		},
		{
			type: "tabs",
			tabs: [
				{
					fields: [
						{
							name: "content",
							type: "richText",
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
							}),
							label: false,
							required: true
						}
					],
					label: "Content"
				},
				{
					label: "Meta",
					fields: [
						{
							name: "categories",
							type: "relationship",
							admin: {
								position: "sidebar"
							},
							hasMany: true,
							relationTo: "categories"
						},
						{
							name: "relatedPosts",
							type: "relationship",
							admin: {
								position: "sidebar"
							},
							filterOptions: ({ id }) => {
								return {
									id: {
										not_in: [id]
									}
								}
							},
							hasMany: true,
							relationTo: "posts"
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
						MetaTitleField({}),
						MetaDescriptionField({}),
						MetaImageField({
							relationTo: "media"
						})
					]
				}
			]
		}
	],
	hooks: {
		afterChange: [revalidatePost],
		afterRead: [populateAuthors],
		afterDelete: [revalidateDelete]
	},
	versions: {
		drafts: {
			autosave: {
				interval: 100
			}
		},
		maxPerDoc: 25
	},
	defaultSort: "-publishedAt"
}
