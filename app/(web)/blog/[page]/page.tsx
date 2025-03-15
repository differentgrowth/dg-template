import { unstable_cache } from "next/cache"
import { notFound } from "next/navigation"
import type { Metadata } from "next/types"

import { getPayload } from "payload"

import { CollectionArchive } from "@/components/collection-archive"
import { PageRange } from "@/components/page-range"
import { PostsPagination } from "@/components/posts-pagination"
import configPromise from "@payload-config"

export const generateStaticParams = unstable_cache(
	async () => {
		const payload = await getPayload({ config: configPromise })
		const { totalDocs } = await payload.count({
			collection: "posts",
			overrideAccess: false
		})

		const totalPages = Math.ceil(totalDocs / 10)

		const pages: { pageNumber: string }[] = []

		for (let i = 1; i <= totalPages; i++) {
			pages.push({ pageNumber: String(i) })
		}

		return pages
	},
	["posts"],
	{
		tags: ["posts"]
	}
)

export async function generateMetadata({
	params: paramsPromise
}: PageProps): Promise<Metadata> {
	const { page: pageNumber } = await paramsPromise
	return {
		title: `DifferentGrowth Posts Page ${pageNumber || ""}`
	}
}

type PageProps = {
	params: Promise<{
		page: string
	}>
	searchParams: Promise<Record<string, never>>
}

const getData = unstable_cache(
	async ({ pageNumber }: { pageNumber: number }) => {
		const payload = await getPayload({ config: configPromise })
		const posts = await payload.find({
			collection: "posts",
			depth: 1,
			limit: 12,
			page: pageNumber,
			overrideAccess: false,
			select: {
				slug: true,
				title: true,
				caption: true,
				categories: true,
				meta: true
			}
		})

		return posts
	},
	["posts"],
	{
		tags: ["posts"]
	}
)

export default async function Page({ params: paramsPromise }: PageProps) {
	const { page: pageNumber } = await paramsPromise

	const sanitizedPageNumber = Number(pageNumber)
	if (!Number.isInteger(sanitizedPageNumber)) notFound()

	const posts = await getData({ pageNumber: sanitizedPageNumber })

	return (
		<div className="pt-24 pb-24">
			<div className="container mb-16">
				<div>
					<h1>Posts</h1>
				</div>
			</div>

			<div className="container mb-8">
				<PageRange
					collection="posts"
					currentPage={posts.page}
					limit={12}
					totalDocs={posts.totalDocs}
				/>
			</div>

			<CollectionArchive posts={posts.docs} />

			{posts.totalPages > 1 && posts.page ? (
				<PostsPagination
					page={posts.page}
					totalPages={posts.totalPages}
				/>
			) : null}
		</div>
	)
}
