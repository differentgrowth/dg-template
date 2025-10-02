import type { ColumnSectionBlock as ColumnSectionBlockProps } from "@/payload-types";

import Link from "next/link";

import { RichText } from "@/components/rich-text";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = ColumnSectionBlockProps & {
  className?: string;
};

export const ColumnSection = ({ columns, hasBackground, className }: Props) => {
  return (
    <section
      className={cn(
        "py-12 lg:py-20",
        { "bg-muted/30": hasBackground },
        className
      )}
    >
      <div className="container max-w-7xl">
        <div className="grid grid-cols-4 gap-x-16 gap-y-8 lg:grid-cols-12">
          {columns &&
            columns.length > 0 &&
            columns.map(({ enableLink, link, content, size, id }) => {
              return (
                <div
                  className={cn("col-span-4", {
                    "mx-auto max-w-7xl lg:col-span-full": size === "full",
                    // Single column: explicit centering with col-start-*
                    "lg:col-span-6 lg:col-start-4":
                      columns.length === 1 && size === "half", // 6 columns, centered (12-6)/2 + 1 = 4
                    "lg:col-span-4 lg:col-start-5":
                      columns.length === 1 && size === "oneThird", // 4 columns, centered (12-4)/2 + 1 = 5
                    "lg:col-span-8 lg:col-start-3":
                      columns.length === 1 && size === "twoThirds", // 8 columns, centered (12-8)/2 + 1 = 3
                    // Multi-column layout
                    "lg:col-span-6": columns.length > 1 && size === "half",
                    "lg:col-span-4": columns.length > 1 && size === "oneThird",
                    "lg:col-span-8": columns.length > 1 && size === "twoThirds",
                  })}
                  key={id}
                >
                  {content ? (
                    <RichText
                      className={cn("prose-lg", {
                        "prose-invert": hasBackground,
                      })}
                      data={content}
                    />
                  ) : null}

                  {enableLink && link?.url ? (
                    <Button asChild>
                      <Link href={link.url}>{link.label}</Link>
                    </Button>
                  ) : null}
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};
