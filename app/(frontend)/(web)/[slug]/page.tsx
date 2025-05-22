import "server-only";

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import type { Page } from "@/payload-types";
import { RichText } from "@/components/rich-text";
import { generateMeta } from "@/lib/generate-meta";
import { getPageBySlug, getPageSlugs } from "@/queries";

type PagePageProps = {
  params: {
    slug: string;
  };
};

const PagePage = async ({ params }: PagePageProps) => {
  const page = await getPageBySlug(params.slug);

  if (!page) {
    return notFound();
  }

  return (
    <div className="container mx-auto max-w-screen-md py-12 prose dark:prose-invert">
      <h1 className="mb-8 text-4xl font-bold">{page.title}</h1>
      {/* @ts-expect-error */}
      <RichText content={page.content} />
    </div>
  );
};

export const generateStaticParams = async () => {
  const slugs = await getPageSlugs();
  return slugs.map(({ slug }) => ({
    slug,
  }));
};

export const generateMetadata = async ({
  params,
}: PagePageProps): Promise<Metadata> => {
  const page = (await getPageBySlug(params.slug)) as Page | null;

  if (!page) {
    return {};
  }

  return generateMeta({ doc: page });
};

export default PagePage;
