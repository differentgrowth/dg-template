import "server-only";

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { RichText } from "@/components/rich-text";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getHomepageData } from "@/queries/get-homepage-data";
import type { Post } from "@/payload-types";

const HomePage = async () => {
  const homepageData = await getHomepageData();

  if (!homepageData) {
    return notFound();
  }

  const { hero, introduction, featuredPostsSection } = homepageData;

  return (
    <main className="flex-grow">
      {/* Hero Section */}
      {hero && (
        <section className="bg-gradient-to-r from-primary to-secondary py-20 text-primary-foreground dark:from-slate-800 dark:to-slate-900 md:py-32">
          <div className="container mx-auto px-4 text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
              {hero.headline}
            </h1>
            {hero.subheadline && (
              <p className="mb-8 text-lg text-primary-foreground/80 md:text-xl">
                {hero.subheadline}
              </p>
            )}
            {hero.ctaButtonLabel && hero.ctaButtonLink && (
              <Button asChild size="lg" variant="outline">
                {hero.ctaButtonLink.startsWith("/") ? (
                  <Link href={hero.ctaButtonLink}>{hero.ctaButtonLabel}</Link>
                ) : (
                  <a href={hero.ctaButtonLink} target="_blank" rel="noopener noreferrer">
                    {hero.ctaButtonLabel}
                  </a>
                )}
              </Button>
            )}
          </div>
        </section>
      )}

      {/* Introduction Section */}
      {introduction && (
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-8 text-3xl font-bold md:text-4xl">
                {introduction.title}
              </h2>
              {/* @ts-expect-error */}
              <RichText content={introduction.content} className="prose dark:prose-invert mx-auto max-w-prose text-lg" />
            </div>
          </div>
        </section>
      )}

      {/* Featured Posts Section */}
      {featuredPostsSection &&
        featuredPostsSection.featuredPostsTitle &&
        featuredPostsSection.featuredPosts &&
        featuredPostsSection.featuredPosts.length > 0 && (
          <section className="bg-muted py-16 dark:bg-slate-800 md:py-24">
            <div className="container mx-auto px-4">
              <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
                {featuredPostsSection.featuredPostsTitle}
              </h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {featuredPostsSection.featuredPosts.map((postOrId) => {
                  if (typeof postOrId === "object" && postOrId !== null && "slug" in postOrId) {
                    const post = postOrId as Post;
                    return (
                      <Card key={post.id} className="flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg">
                        <CardHeader>
                          <CardTitle className="text-xl hover:text-primary">
                            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                          </CardTitle>
                          {post.meta?.description && (
                            <CardDescription className="mt-2 line-clamp-3">
                              {post.meta.description}
                            </CardDescription>
                          )}
                        </CardHeader>
                        <CardContent className="flex-grow" />
                        <CardFooter>
                          <Button asChild variant="linkHover1" className="p-0">
                            <Link href={`/blog/${post.slug}`}>Read More</Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </section>
        )}
    </main>
  );
};

export const generateMetadata = async (): Promise<Metadata> => {
  const homepageData = await getHomepageData();

  if (!homepageData) {
    return {};
  }

  const { hero, introduction } = homepageData;
  let description = "Welcome to our website."; 

  if (hero?.subheadline) {
    description = hero.subheadline;
  } else if (introduction?.content) {
    if (Array.isArray(introduction.content.root?.children)) {
      const firstP = introduction.content.root.children.find(
        (node: any) => node.type === "paragraph"
      );
      if (firstP && Array.isArray(firstP.children)) {
        description = firstP.children
          .filter((child: any) => child.type === "text")
          .map((child: any) => child.text)
          .join(" ");
      }
    }
  }

  return {
    title: hero?.headline || "Homepage",
    description: description.substring(0, 160), 
    // openGraph: {
    //   images: homepageData.meta?.image ? [ homepageData.meta.image.url ] : [],
    // },
  };
};

export default HomePage;
