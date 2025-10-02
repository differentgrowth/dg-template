import { draftMode } from "next/headers";

import { Hero } from "@/components/blocks/hero";
import { RenderBlocks } from "@/components/blocks/render-blocks";
import { LivePreviewListener } from "@/components/live-preview-listener";
import { PayloadRedirects } from "@/components/payload-redirects";
import { getPageBySlug } from "@/queries/get-page-by-slug";
import { getPageSlugs } from "@/queries/get-page-slugs";

export async function generateStaticParams() {
  const pages = await getPageSlugs();

  return pages.docs.map((doc) => ({ slug: doc.slug }));
}

export default async function Page({ params }: PageProps<"/[slug]">) {
  const { isEnabled: draft } = await draftMode();
  const { slug } = await params;

  const page = await getPageBySlug({ slug, draft });

  if (!page) {
    return <PayloadRedirects url="/" />;
  }

  return (
    <main>
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={`/${page.slug}`} />

      {draft ? <LivePreviewListener /> : null}

      <Hero {...page.hero} />
      <RenderBlocks blocks={page.blocks} />
    </main>
  );
}
