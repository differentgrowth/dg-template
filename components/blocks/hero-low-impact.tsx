import type { Media as MediaType, Page } from "@/payload-types";

import Image from "next/image";
import Link from "next/link";

import {
  ArrowRightIcon,
  CaretRightIcon,
  PhoneCallIcon,
} from "@phosphor-icons/react/dist/ssr";

import { Media } from "@/components/blocks/media";
import { RichText } from "@/components/rich-text";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import placeholder from "@/public/placeholder.svg";

const HeroButtons = ({
  primary,
  secondary,
}: {
  primary?: { label?: string | null; path?: string | null };
  secondary?: { label?: string | null; path?: string | null };
  image: number | MediaType | null | undefined;
  heroImpact: "low" | "high" | null | undefined;
}) => {
  if (!(primary || secondary)) {
    return null;
  }

  return (
    <div className="mt-10 flex items-center gap-6">
      <div className="flex flex-wrap items-center justify-center gap-4">
        {primary?.path ? (
          <Button asChild size="lg">
            <Link href={primary.path}>
              {primary.label}
              {primary.path.startsWith("tel:") ? (
                <PhoneCallIcon weight="duotone" />
              ) : (
                <ArrowRightIcon />
              )}
            </Link>
          </Button>
        ) : null}
        {secondary?.path ? (
          <Button asChild size="lg" variant="outline">
            <Link href={secondary.path}>
              {secondary.label}
              {secondary.path.startsWith("tel:") ? (
                <PhoneCallIcon weight="duotone" />
              ) : (
                <CaretRightIcon />
              )}
            </Link>
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export const HeroLowImpact = (props: Page["hero"]) => {
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
    impact,
  } = props;

  const primaryBtn =
    enablePrimaryLink && primaryLink?.label && primaryLink?.path
      ? primaryLink
      : undefined;

  const secondaryBtn =
    enableSecondaryLink && secondaryLink?.label && secondaryLink?.path
      ? secondaryLink
      : undefined;

  return (
    <section className="relative isolate overflow-hidden bg-linear-to-b from-muted-foreground">
      <div
        aria-hidden="true"
        className="-z-10 -mr-96 sm:-mr-80 lg:-mr-96 absolute inset-y-0 right-1/2 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-primary/20 shadow-xl ring-1 ring-primary-50 dark:shadow-primary-400/10"
      />
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-32 lg:px-8">
        <div
          className={cn(
            "prose prose-xl dark:prose-invert text-balance",
            "mx-auto max-w-2xl max-lg:space-y-6 lg:mx-0",
            "lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-8 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8"
          )}
        >
          {title ? (
            <h1
              className={cn("sm:text-5xl lg:col-span-2 lg:mt-12 xl:col-auto", {
                "lg:row-span-2": !description,
              })}
            >
              {title}
            </h1>
          ) : null}
          {description || primaryBtn || secondaryBtn ? (
            <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
              {description ? (
                <RichText
                  className="prose-lg text-muted-foreground"
                  data={description}
                />
              ) : null}
              <HeroButtons
                heroImpact={impact}
                image={image}
                primary={primaryBtn}
                secondary={secondaryBtn}
              />
            </div>
          ) : null}
          {image ? (
            <Media
              blockType="media"
              imgClassName="rounded-2xl"
              media={image}
              pictureClassName={cn(
                "-outline-offset-1 mt-10 h-fit w-full max-w-lg rounded-2xl object-cover outline-1 outline-black/5",
                "sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36s"
              )}
              videoClassName={cn(
                "-outline-offset-1 mt-10 h-fit w-full max-w-lg rounded-2xl object-cover outline-1 outline-black/5",
                "sm:mt-16 lg:mt-0 xl:row-span-2 xl:row-end-2 xl:mt-36s"
              )}
            />
          ) : (
            <Image
              alt="placeholder"
              className={cn(
                "-outline-offset-1 mt-10 aspect-6/5 w-full max-w-lg rounded-2xl object-cover outline-1 outline-black/5",
                "sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36s"
              )}
              src={placeholder}
              unoptimized
            />
          )}
        </div>
      </div>
      <div className="-z-10 absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-background sm:h-32" />
    </section>
  );
};
