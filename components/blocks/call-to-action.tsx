import type { CallToActionBlock as CallToActionBlockProps } from "@/payload-types";

import Link from "next/link";

import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";

import { Button } from "@/components/ui/base-button";
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
        "border-muted border-y border-dashed": !hasBackground,
      })}
    >
      <div className="mx-auto max-w-2xl">
        <p
          className={cn(
            "mb-2 border-b pb-1 font-bold text-3xl tracking-tight sm:text-4xl",
            {"border-muted border-y border-dashed": !hasBackground}
          )}
        >
          {title}
        </p>
        {description ? (
          <p
            className={cn(
              "mx-auto max-w-3xl text-lg",
              hasBackground ? "text-primary-100" : "text-default-600"
            )}
          >
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
            <Button color="primary" mode="link">
              <Link href={button.path}>
                {button?.label || "¡Empezar ahora!"}
                <ArrowRightIcon className="ml-1.5 inline-flex items-center" />
              </Link>
            </Button>
          ) : null}
          {enableSecondaryButton && secondaryButton?.path ? (
            <Button mode="link" variant="outline">
              <Link href={secondaryButton.path}>
                {secondaryButton?.label || "¡Empezar ahora!"}
              </Link>
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  </div>
);
