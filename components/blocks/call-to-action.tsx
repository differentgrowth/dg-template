import type { CallToActionBlock as CallToActionBlockProps } from "@/payload-types";

import Link from "next/link";

import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = CallToActionBlockProps & {
  className?: string;
};

export const CallToAction = ({
  title,
  description,
  button,
  enableSecondaryButton,
  secondaryButton,
  hasBackground,
  className,
}: Props) => (
  <div className={cn({ "bg-primary": hasBackground }, className)}>
    <div
      className={cn("container max-w-7xl py-12 lg:py-20", {
        "border-muted-foreground border-y border-dashed": !hasBackground,
      })}
    >
      <div className="mx-auto max-w-2xl">
        <p
          className={cn(
            "mb-2 border-b pb-1 font-bold text-3xl tracking-tight sm:text-4xl"
          )}
        >
          {title}
        </p>
        {description ? (
          <p className={cn("mx-auto max-w-3xl text-lg text-muted-foreground")}>
            {description}
          </p>
        ) : null}
        <div
          className={cn(
            "mt-10 flex flex-col items-stretch space-y-4",
            "sm:flex-row sm:items-center sm:justify-end sm:space-x-6 sm:space-y-0"
          )}
        >
          {button?.path ? (
            <Button asChild size="lg" variant="default">
              <Link href={button.path}>
                {button?.label || "¡Empezar ahora!"}
                <ArrowRightIcon />
              </Link>
            </Button>
          ) : null}
          {enableSecondaryButton && secondaryButton?.path ? (
            <Button asChild size="lg" variant="outline">
              <Link href={secondaryButton.path}>
                {secondaryButton?.label || "¡Saber más!"}
              </Link>
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  </div>
);
