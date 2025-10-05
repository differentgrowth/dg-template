import type { CardLinksBlock as CardLinksBlockProps } from "@/payload-types";

import Image from "next/image";
import Link from "next/link";

import {
  ArrowSquareOutIcon,
  CaretRightIcon,
} from "@phosphor-icons/react/dist/ssr";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Props = CardLinksBlockProps & {
  className?: string;
};

export function CardLinks({ links, className }: Props) {
  if (!links || links.length === 0) {
    return null;
  }

  return (
    <section
      className={cn(
        "container grid max-w-7xl grid-cols-1 gap-6 px-6 py-16",
        "sm:grid-cols-2 lg:grid-cols-3 lg:px-8",
        className
      )}
    >
      {links.map((link) => (
        <Card className="group" key={link.id}>
          <CardHeader className="pb-4">
            <div className="mb-4 flex h-16 items-center justify-center">
              {link.image &&
              typeof link.image === "object" &&
              link.image.sizes?.square?.url ? (
                <Image
                  alt={link.image.alt || link.title}
                  className="size-16 object-contain"
                  height={64}
                  src={link.image.sizes?.square?.url}
                  width={64}
                />
              ) : (
                <Logo className="h-12 w-auto opacity-60" />
              )}
            </div>
            <CardTitle className="text-center font-semibold text-lg leading-tight">
              {link.title}
            </CardTitle>
          </CardHeader>

          <CardFooter className="pt-0">
            <Button
              asChild
              className="w-full transition-transform group-hover:scale-[1.02]"
              size="lg"
              variant="outline"
            >
              <Link href={link.url}>
                {link.label}
                {link.url.startsWith("http") ? (
                  <ArrowSquareOutIcon />
                ) : (
                  <CaretRightIcon />
                )}
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </section>
  );
}
