import type { Metadata } from "next"
import { unstable_cache } from "next/cache"
import { draftMode } from "next/headers"

import { getPayload } from "payload"

import { LivePreviewListener } from "@/components/admin/live-preview-listener"
import { RichText } from "@/components/fields/rich-text"
import { PayloadRedirects } from "@/components/payload-redirects"
import { RelatedPosts } from "@/components/related-posts"
import { generateMeta } from "@/lib/generate-meta"
import configPromise from "@payload-config"

export const generateStaticParams = unstable_cache(
	async () => {
		const payload = await getPayload({ config: configPromise })
		const posts = await payload.find({
			collection: "posts",
			draft: false,
			limit: 1000,
			overrideAccess: false,
			pagination: false,
			select: {
				slug: true
			}
		})

		const params = posts.docs.map(({ slug }) => {
			return { slug }
		})

		return params
	},
	["posts"],
	{ tags: ["posts"] }
)

export const generateMetadata = async ({
	params: paramsPromise
}: PageProps): Promise<Metadata> => {
	const { isEnabled: draft } = await draftMode()
	const { slug = "" } = await paramsPromise

	const post = await queryPostBySlug({ slug, draft })

	return generateMeta({ doc: post })
}

const queryPostBySlug = unstable_cache(
	async ({ slug, draft }: { slug: string; draft: boolean }) => {
		const payload = await getPayload({ config: configPromise })

		const result = await payload.find({
			collection: "posts",
			draft,
			limit: 1,
			overrideAccess: draft,
			pagination: false,
			where: {
				slug: {
					equals: slug
				}
			}
		})

		return result.docs?.[0] || null
	},
	["posts"],
	{ tags: ["posts"] }
)

type PageProps = {
	params: Promise<{
		slug?: string
	}>
	searchParams: Promise<Record<string, never>>
}

export default async function Page({ params: paramsPromise }: PageProps) {
	const { isEnabled: draft } = await draftMode()
	const { slug = "" } = await paramsPromise
	const url = `/${slug}`
	const post = await queryPostBySlug({ slug, draft })

	if (!post) return <PayloadRedirects url={url} />

	return (
		<article className="pt-16 pb-16">
			{/* Allows redirects for valid pages too */}
			<PayloadRedirects
				disableNotFound
				url={url}
			/>

			{draft ? <LivePreviewListener /> : null}

			<div className="flex flex-col items-center gap-4 pt-8">
				<div className="container max-w-4xl">
					<RichText
						data={post.content}
						enableGutter={false}
					/>
					{post.relatedPosts && post.relatedPosts.length > 0 && (
						<RelatedPosts
							className="col-span-3 col-start-1 mt-12 max-w-[52rem] grid-rows-[2fr] lg:grid lg:grid-cols-subgrid"
							docs={post.relatedPosts.filter((post) => typeof post === "object")}
							intro="Posts relacionados"
						/>
					)}
				</div>
			</div>
		</article>
	)
}
