import { draftMode } from "next/headers";

import { LivePreviewListener } from "@/components/live-preview-listener";
import { PayloadRedirects } from "@/components/payload-redirects";
import { getPostBySlug } from "@/queries/get-post-by-slug";
import { getPostSlugs } from "@/queries/get-post-slugs";

export async function generateStaticParams() {
  const posts = await getPostSlugs();

  return posts.docs.map((doc) => ({ slug: doc.slug }));
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

      <div className="container">POST: {slug}</div>
    </main>
  );
}
