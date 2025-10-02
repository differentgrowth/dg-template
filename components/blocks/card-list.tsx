import type { CardListBlock as CardListBlockProps } from "@/payload-types";

import Image from "next/image";

import { Logo } from "@/components/logo";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Props = CardListBlockProps & {
  className?: string;
};

export function CardList({ items, className }: Props) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section
      className={cn("container max-w-7xl space-y-4 px-6 py-16", className)}
    >
      {items.map((item) => (
        <Card
          className={cn(
            "group flex-col bg-muted/30 pt-0",
            "hover:-translate-y-0.5 overflow-hidden transition-all duration-300 hover:shadow-lg"
          )}
          key={item.id}
        >
          <CardHeader className="flex flex-col sm:flex-row">
            <div className="flex h-20 w-full items-center justify-center sm:h-24">
              {item.image &&
              typeof item.image === "object" &&
              item.image.url ? (
                <Image
                  alt={item.image.alt || item.label}
                  className="h-full w-full object-contain"
                  height={96}
                  src={item.image.url}
                  width={192}
                />
              ) : (
                <Logo className="h-16 w-auto opacity-40" />
              )}
            </div>
          </CardHeader>

          <CardContent className="flex-1 p-6">
            <div className="flex h-full items-center">
              <p className="text-base text-foreground leading-relaxed transition-colors duration-200 group-hover:text-primary">
                {item.label}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
