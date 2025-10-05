import type { Page } from "@/payload-types";

import Link from "next/link";

import { ArrowRightIcon, CaretRightIcon } from "@phosphor-icons/react/dist/ssr";

import { Media } from "@/components/blocks/media";
import { RichText } from "@/components/rich-text";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const HeroHighImpact = (props: Page["hero"]) => {
  if (!props) {
    return null;
  }

  const {
    title,
    description,
    enablePrimaryLink,
    primaryLink,
    enableSecondaryLink,
    secondaryLink,
    image,
  } = props;

  const renderBackgroundImage = () => {
    if (!image) {
      return null;
    }
    return (
      <>
        <div className="absolute inset-0 z-10 bg-background/90 backdrop-blur-xs" />
        <Media blockType="media" fill media={image} />
      </>
    );
  };

  const renderTopBanner = () => {
    if (!(enablePrimaryLink && primaryLink?.path)) {
      return null;
    }
    return (
      <div className="hidden sm:mb-8 sm:flex sm:justify-center">
        <div
          className={cn(
            "relative rounded-full px-3 py-1 text-muted-foreground",
            "text-sm/6 ring-1 ring-foreground/10 hover:ring-foreground/20 dark:text-muted-foreground"
          )}
        >
          {primaryLink.label}
          <Link
            className="font-semibold text-primary-foreground"
            href={primaryLink.path}
          >
            <span aria-hidden className="absolute inset-0" />
            <ArrowRightIcon />
          </Link>
        </div>
      </div>
    );
  };

  const renderActionButtons = () => {
    if (!(enablePrimaryLink || enableSecondaryLink)) {
      return null;
    }

    return (
      <div className="mt-10 flex items-center justify-center gap-x-6">
        {enablePrimaryLink && primaryLink?.path ? (
          <Button asChild className="sm:hidden">
            <Link href={primaryLink.path}>
              {primaryLink.label || "Get started"}
              <ArrowRightIcon />
            </Link>
          </Button>
        ) : null}

        {enableSecondaryLink && secondaryLink?.path ? (
          <Button asChild variant="ghost">
            <Link href={secondaryLink.path}>
              {secondaryLink.label || "Learn more"}
              <CaretRightIcon />
            </Link>
          </Button>
        ) : null}
      </div>
    );
  };

  return (
    <section
      className={cn(
        "isolate min-h-[60dvh] overflow-hidden pt-14",
        image && "relative"
      )}
    >
      {renderBackgroundImage()}

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          {renderTopBanner()}

          <div className="prose prose-2xl dark:prose-invert text-balance text-center">
            <h1>{title}</h1>
            {description ? (
              <RichText className="prose-2xl" data={description} />
            ) : null}

            {renderActionButtons()}
          </div>
        </div>
      </div>
    </section>
  );
};
