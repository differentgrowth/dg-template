import Link from "next/link";

import { HeartIcon } from "@phosphor-icons/react/dist/ssr";

import { CopyrightParagraph } from "@/components/copyright-paragraph";
import { Button } from "@/components/ui/button";
import { SocialMediaIcon } from "@/components/ui/social-media-icon";
import { cn } from "@/lib/utils";
import { getBlogPage } from "@/queries/get-blog-page";
import { getNavigation } from "@/queries/get-navigation";
import { getSocialMedia } from "@/queries/get-social-media";

export const Footer = async () => {
  const [{ docs: pages }, blogPage, socialMedia] = await Promise.all([
    getNavigation({ header: false, footer: true }),
    getBlogPage(),
    getSocialMedia(),
  ]);

  const navigation = [
    ...pages.map((item) => ({ label: item.label, href: `/${item.slug}` })),
    ...(blogPage?.showOnHeader && blogPage.label
      ? [{ label: blogPage.label, href: "/blog" }]
      : []),
  ];

  return (
    <footer className="mt-12 bg-muted">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <nav
          aria-label="Footer"
          className="-mb-6 flex flex-wrap justify-center gap-x-12 gap-y-3 text-sm/6"
        >
          {navigation.map((item) => (
            <Button asChild key={item.href} variant="link">
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </nav>
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {socialMedia.items.map((item) => (
            <Button asChild key={item.url} size="icon" variant="outline">
              <a href={item.url} rel="noreferrer noopener nofollow">
                <span className="sr-only">{item.platform}</span>
                <SocialMediaIcon platform={item.platform} />
              </a>
            </Button>
          ))}
        </div>
        <CopyrightParagraph />
      </div>
      <div className="flex w-full justify-center">
        <Button asChild className="group" variant="link">
          <Link
            href="https://www.differentgrowth.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            Made by Different Growth with
            <span className="relative flex">
              <HeartIcon
                className={cn(
                  "absolute opacity-75",
                  "text-primary transition-colors group-hover:animate-ping group-hover:text-red-400"
                )}
                weight="duotone"
              />
              <HeartIcon
                className={cn(
                  "relative",
                  "text-primary transition-colors group-hover:text-red-500"
                )}
                weight="duotone"
              />
            </span>
          </Link>
        </Button>
      </div>
    </footer>
  );
};
