import type { Page } from "@/payload-types";

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

  const renderTitle = () =>
    title ? (
      <div
        className={cn("prose prose-2xl dark:prose-invert", {
          "prose-invert": image,
        })}
      >
        <h1>{title}</h1>
      </div>
    ) : null;

  const renderDescription = () =>
    description ? (
      <div
        className={cn("max-w-2xl", {
          "bg-white/10 backdrop-blur-xs": image,
          "rounded-large border-1 border-white/20 p-2 py-1 shadow-small": image,
          "before:rounded-xl before:bg-white/10": image,
        })}
      >
        <RichText
          className={cn("prose-2xl", {
            "text-muted-foreground": !image,
            "prose-invert": image,
          })}
          data={description}
        />
      </div>
    ) : null;

  const renderPrimaryButton = () =>
    enablePrimaryLink && primaryLink?.label && primaryLink?.path ? (
      <Button asChild size="lg">
        <Link href={primaryLink.path}>
          {primaryLink.label}
          {primaryLink.path.startsWith("tel:") ? (
            <PhoneCallIcon weight="duotone" />
          ) : (
            <ArrowRightIcon />
          )}
        </Link>
      </Button>
    ) : null;

  const renderSecondaryButton = () =>
    enableSecondaryLink && secondaryLink?.label && secondaryLink?.path ? (
      <Button asChild size="lg" variant="outline">
        <Link href={secondaryLink.path}>
          {secondaryLink.label}
          {secondaryLink.path.startsWith("tel:") ? (
            <PhoneCallIcon weight="duotone" />
          ) : (
            <CaretRightIcon />
          )}
        </Link>
      </Button>
    ) : null;

  const renderButtons = () =>
    enablePrimaryLink || enableSecondaryLink ? (
      <div className="flex flex-wrap items-center justify-center gap-4">
        {renderPrimaryButton()}
        {renderSecondaryButton()}
      </div>
    ) : null;

  return (
    <section
      className={cn(
        "min-h-[calc(100dvh-4rem)] w-full",
        "flex items-center justify-center overflow-hidden",
        image && "relative"
      )}
    >
      {image ? (
        <>
          <div className="absolute inset-0 z-10 bg-background/90 backdrop-blur-xs" />
          <Media blockType="media" fill media={image} />
        </>
      ) : null}
      <div className="container relative z-20 flex max-w-6xl flex-col items-center gap-8 text-center">
        {renderTitle()}
        {renderDescription()}
        {renderButtons()}
      </div>
    </section>
  );
};
