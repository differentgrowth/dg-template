import type { TestimonialsBlock as TestimonialsBlockProps } from "@/payload-types";

import { ArrowSquareOutIcon } from "@phosphor-icons/react/dist/ssr";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Marquee as MarqueeRoot } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";

type Props = TestimonialsBlockProps & {
  className?: string;
};

export const Testimonials = ({
  title,
  subtitle,
  animated,
  items,
  className,
}: Props) => {
  if (!items?.length) {
    return null;
  }

  return (
    <section className={cn("container py-12 lg:py-20", className)}>
      {(title || subtitle) && (
        <div className="prose prose-lg dark:prose-invert mb-12 text-center">
          {title && <h2 className="mb-4">{title}</h2>}
          {subtitle && (
            <p className="mx-auto max-w-2xl text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>
      )}
      <div
        className={cn(
          {
            "relative flex h-[500px] w-full flex-row items-center justify-center gap-1.5 overflow-hidden":
              animated === "vertical",
            "relative flex w-full flex-col items-center justify-center gap-1 overflow-hidden py-8":
              animated === "horizontal",
          },
          className
        )}
      >
        {/* Marquee (downwards) */}
        <MarqueeRoot
          className="[--duration:40s]"
          pauseOnHover
          repeat={4}
          vertical={animated === "vertical"}
        >
          {items.map((testimonial) => (
            <TestimonialCard {...testimonial} key={testimonial.id} />
          ))}
        </MarqueeRoot>
        {/* Gradient overlays for vertical marquee */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background" />
      </div>
    </section>
  );
};

function TestimonialCard({
  url,
  name,
  content,
  avatar,
  role,
}: NonNullable<TestimonialsBlockProps["items"]>[number]) {
  return (
    <Card className="relative w-full max-w-xs">
      <CardContent>
        <div className="flex items-center gap-2.5">
          <Avatar className="size-12">
            <AvatarImage
              alt={typeof avatar === "object" ? avatar?.alt || undefined : name}
              src={
                typeof avatar === "object"
                  ? avatar?.sizes?.square?.url || undefined
                  : undefined
              }
            />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
          <div className="prose prose-sm dark:prose-invert flex flex-col">
            <figcaption className="font-medium">{name}</figcaption>
            <p className="font-light text-muted-foreground">
              {url ? (
                <Button asChild>
                  <a href={url} rel="noopener noreferrer" target="_blank">
                    <span className="absolute inset-0" />
                    {role}
                    <ArrowSquareOutIcon className="ml-1 h-4 w-4" />
                  </a>
                </Button>
              ) : (
                role
              )}
            </p>
          </div>
        </div>
        <blockquote className="mt-3 text-secondary-foreground">
          {content}
        </blockquote>
      </CardContent>
    </Card>
  );
}
