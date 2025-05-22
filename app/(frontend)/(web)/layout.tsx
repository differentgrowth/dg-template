import "server-only";

import Link from "next/link";
import { Suspense } from "react";

import { ModeToggle } from "@/components/mode-toggle";
import { SocialMediaIcon } from "@/components/social-media-icon";
import { getLinks } from "@/queries/get-links";
import { getSocialMediaLinks } from "@/queries/get-social-media-links";
import type { Link as LinkType, SocialMediaLink, Page as PageType } from "@/payload-types"; // Added PageType

// Simple Logo Component (can be moved to its own file later)
const SiteLogo = () => (
  <Link href="/" className="text-2xl font-bold text-primary hover:text-primary/80">
    MySite
  </Link>
);

async function Header() {
  const linksData = await getLinks();
  // Ensure navLinks is an array, default to empty if undefined or not an array
  const navLinks = Array.isArray(linksData?.navLinks) ? linksData.navLinks : [];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <SiteLogo />
        <nav className="hidden items-center space-x-6 md:flex">
          {navLinks.map((item, index) => { // Added index for key if id is not present on item itself
            // Assuming item has a 'link' property which is the actual LinkType object
            const link = item.link as LinkType | undefined;

            if (!link) return null; // Skip if link is not defined

            let href = "#"; // Default href
            let label = "Missing Label";

            if (link.type === "custom" && link.url) {
              href = link.url;
              label = link.label || href;
            } else if (link.type === "page" && typeof link.page === "object" && link.page !== null && "slug" in link.page) {
              const pageData = link.page as PageType; // Cast to PageType
              href = `/${pageData.slug}`;
              label = link.label || pageData.title || "Page Link";
            } else if (link.type === "page" && typeof link.page === 'string') {
              // This case might occur if 'page' is an ID and not populated.
              // Handle appropriately, maybe skip or log a warning.
              // For now, we'll skip it.
              // console.warn(`Skipping navLink with page ID: ${link.page}`);
              return null;
            }


            if (href === "#" && label === "Missing Label") return null; // Don't render if link is not properly formed

            return (
              <Link
                key={link.id || `nav-${index}`} // Use link.id if available, otherwise index
                href={href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center space-x-4">
          <ModeToggle />
          {/* Mobile Menu Button (optional, for future enhancement) */}
          {/* <button className="md:hidden">Menu</button> */}
        </div>
      </div>
    </header>
  );
}

async function Footer() {
  const socialMediaData = await getSocialMediaLinks();
  // Ensure links is an array, default to empty if undefined or not an array
  const socialLinks = Array.isArray(socialMediaData?.links) ? socialMediaData.links : [];


  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <SiteLogo />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Different Growth. All rights reserved.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          {socialLinks.map((social: SocialMediaLink) => (
            <a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary"
              aria-label={`Visit our ${social.type} page`}
            >
              <SocialMediaIcon type={social.type} className="h-5 w-5" />
              <span className="sr-only">{social.type}</span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default function WebLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Suspense fallback={<div className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"><div className="container flex h-16 items-center justify-between animate-pulse"><div className="h-6 w-20 rounded bg-muted"></div><div className="h-6 w-32 rounded bg-muted"></div></div></div>}>
        {/* @ts-expect-error Server Component */}
        <Header />
      </Suspense>
      <main className="flex-1">{children}</main>
      <Suspense fallback={<div className="border-t border-border/40 bg-background"><div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0 animate-pulse"><div className="h-6 w-20 rounded bg-muted"></div><div className="h-4 w-48 rounded bg-muted"></div></div></div>}>
        {/* @ts-expect-error Server Component */}
        <Footer />
      </Suspense>
    </div>
  );
}
