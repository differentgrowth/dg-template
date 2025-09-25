import type { ComparisonBlock as ComparisonBlockProps } from "@/payload-types";

import { Media } from "@/components/blocks/media";
import {
  ComparisonHandle,
  ComparisonItem,
  Comparison as ComparisonRoot,
} from "@/components/ui/comparison";
import { cn } from "@/lib/utils";

type Props = ComparisonBlockProps & {
  className?: string;
};

export const Comparison = ({
  title,
  description,
  beforeImage,
  afterImage,
  className,
}: Props) => (
  <div
    className={cn(
      "container max-w-7xl py-12 lg:py-20",
      "prose prose-lg dark:prose-invert",
      className
    )}
  >
    {title ? (
      <h2 className={cn(description ? "mb-4" : "mb-8")}>{title}</h2>
    ) : null}
    {description ? (
      <p className="mx-auto mb-8 max-w-2xl text-balance text-center text-lg text-muted-foreground">
        {description}
      </p>
    ) : null}
    <ComparisonRoot className="mx-auto aspect-video max-w-4xl overflow-hidden rounded-xl">
      <ComparisonItem className="shadow-md" position="left">
        <Media blockType="media" media={afterImage} />
      </ComparisonItem>
      <ComparisonItem className="shadow-md" position="right">
        <Media blockType="media" media={beforeImage} />
      </ComparisonItem>
      <ComparisonHandle />
    </ComparisonRoot>
  </div>
);
