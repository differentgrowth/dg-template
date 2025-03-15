import type { MetadataRoute } from "next"

import { COMPANY_DATA } from "@/config/company"

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: [
				"/*.json$",
				"/*_buildManifest.js$",
				"/*_middlewareManifest.js$",
				"/*_ssgManifest.js$",
				"/*.js$",
				"/_next/*"
			]
		},
		sitemap: `${COMPANY_DATA.URL}/sitemap.xml`
	}
}
