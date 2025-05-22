export const CACHE_TAGS = {
	POSTS: "posts",
	PAGES: "pages",
	HOMEPAGE: "homepage",
	REDIRECTS: "redirects",
	LINKS: "links",
	SOCIAL_MEDIA_LINKS: "social-media-links"
} as const

export const POSTS_PER_PAGE = 12 as const

export const PAGE_CACHE_TAG = (slug: string) => `${CACHE_TAGS.PAGES}/${slug}`
export const PAGES_CACHE_TAG = CACHE_TAGS.PAGES
export const HOMEPAGE_CACHE_TAG = CACHE_TAGS.HOMEPAGE
