import path from "node:path"
import { fileURLToPath } from "node:url"

import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres"
// import { postgresAdapter } from "@payloadcms/db-postgres"
import { redirectsPlugin } from "@payloadcms/plugin-redirects"
import { seoPlugin } from "@payloadcms/plugin-seo"
import {
	FixedToolbarFeature,
	HorizontalRuleFeature,
	InlineToolbarFeature,
	lexicalEditor
} from "@payloadcms/richtext-lexical"
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob"
import { buildConfig } from "payload"
import sharp from "sharp"

import { Categories } from "@/collections/Categories"
import { Media } from "@/collections/Media"
import { Posts } from "@/collections/Posts"
import { Users } from "@/collections/Users"
import { revalidateRedirects } from "@/hooks/revalidate-redirects"
import { Links } from "./globals/Links"
import { SocialMediaLinks } from "./globals/SocialMediaLinks"

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
	routes: {
		api: "/admin-api"
	},
	admin: {
		autoLogin:
			process.env.NODE_ENV === "development"
				? {
						username: "IAM",
						email: "iam@email.com",
						password: "Testing123!"
					}
				: false,
		user: Users.slug,
		livePreview: {
			breakpoints: [
				{
					label: "Mobile",
					name: "mobile",
					width: 375,
					height: 667
				},
				{
					label: "Tablet",
					name: "tablet",
					width: 768,
					height: 1024
				},
				{
					label: "Desktop",
					name: "desktop",
					width: 1440,
					height: 900
				}
			]
		},
		meta: {
			title: "DG Admin",
			description: "The best admin panel in the world",
			icons: [
				{
					rel: "icon",
					type: "image/x-icon",
					url: "/favicon.ico"
				}
			]
		},
		timezones: {
			supportedTimezones: [{ value: "Europe/Madrid", label: "Madrid" }],
			defaultTimezone: "Europe/Madrid"
		},
		dateFormat: "LLL dd, y - HH:mm",
		theme: "light",
		avatar: "gravatar",
		importMap: {
			baseDir: path.resolve(dirname)
		},
		components: {
			graphics: {
				Icon: {
					path: "/components/admin/mark",
					exportName: "Mark"
				},
				Logo: {
					path: "/components/admin/logo",
					exportName: "Logo"
				}
			},
			logout: {
				Button: {
					path: "/components/admin/logout",
					exportName: "LogoutButton"
				}
			},
			actions: [
				{
					path: "/components/admin/account-link",
					exportName: "AccountLink"
				}
			]
		}
	},
	collections: [Users, Categories, Media, Posts],
	globals: [Links, SocialMediaLinks],
	editor: lexicalEditor({
		features: ({ rootFeatures }) => {
			return [
				...rootFeatures,
				FixedToolbarFeature(),
				InlineToolbarFeature(),
				HorizontalRuleFeature()
			]
		}
	}),
	secret: process.env.PAYLOAD_SECRET || "",
	typescript: {
		outputFile: path.resolve(dirname, "payload-types.ts")
	},
	// db: postgresAdapter({
	// 	pool: {
	// 		connectionString: process.env.DATABASE_URI || ""
	// 	}
	// }),
	db: vercelPostgresAdapter({
		pool: {
			connectionString: process.env.DATABASE_URI || ""
		}
	}),
	sharp,
	plugins: [
		seoPlugin({}),
		redirectsPlugin({
			collections: ["posts"],
			overrides: {
				// @ts-expect-error
				fields: ({ defaultFields }) => {
					return defaultFields.map((field) => {
						if ("name" in field && field.name === "from") {
							return {
								...field,
								admin: {
									description:
										"You will need to rebuild the website when changing this field."
								}
							}
						}
						return field
					})
				},
				hooks: {
					afterChange: [revalidateRedirects]
				}
			}
		}),
		vercelBlobStorage({
			collections: {
				media: {
					prefix: "payload-template/"
				}
			},
			token: process.env.BLOB_READ_WRITE_TOKEN || ""
		})
	]
})
