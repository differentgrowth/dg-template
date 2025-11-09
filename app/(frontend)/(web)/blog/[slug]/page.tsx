import type { Metadata } from "next";

import { draftMode } from "next/headers";

import { Hero } from "@/components/blocks/hero";
import { LivePreviewListener } from "@/components/live-preview-listener";
import { PayloadRedirects } from "@/components/payload-redirects";
import { PostsList } from "@/components/posts-list";
import { RichText } from "@/components/rich-text";
import { generateMeta } from "@/lib/generate-meta";
import { getPostBySlug } from "@/queries/get-post-by-slug";
import { getPostSlugs } from "@/queries/get-post-slugs";

export async function generateStaticParams() {
  const posts = await getPostSlugs();

  return posts.docs.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({
  params: paramsPromise,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await paramsPromise;
  const { isEnabled: draft } = await draftMode();

  const page = await getPostBySlug({ slug, draft });

  return generateMeta({ doc: page, isDraft: draft, prefix: "/blog" });
}

export default async function Page({ params }: PageProps<"/blog/[slug]">) {
  const { isEnabled: draft } = await draftMode();
  const { slug } = await params;

  const post = await getPostBySlug({ slug, draft });

  if (!post) {
    return <PayloadRedirects url="/" />;
  }

  return (
    <main>
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={`/${post.slug}`} />

      {draft ? <LivePreviewListener /> : null}

      <Hero
        description={post.description}
        image={post.image}
        impact="low"
        title={post.title}
      />

      <div className="mt-6 flex flex-col items-center gap-4">
        <RichText
          className="prose-lg container max-w-5xl"
          data={post.content}
        />

        {post.relatedPosts && post.relatedPosts?.length > 0 ? (
          <section className="prose container max-w-5xl pt-8">
            <h4>Post relacionados</h4>

            <PostsList posts={post.relatedPosts} />
          </section>
        ) : null}
      </div>
    </main>
  );
}
