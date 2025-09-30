import type {
  MarqueeBlock as MarqueeBlockProps,
  Media as MediaType,
} from "@/payload-types";

import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { Marquee as MarqueeRoot } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";

type Props = MarqueeBlockProps & {
  className?: string;
};

const minimumTargets = 4;

export const Marquee = ({ className, style, images }: Props) => {
  if (!images || images.length === 0) {
    return null;
  }

  if (style === "3d") {
    return (
      <div
        className={cn(
          "relative flex w-full flex-row items-center justify-center gap-1.5 overflow-hidden [perspective:300px]",
          "h-44 sm:h-96 md:h-[34rem]",
          className
        )}
      >
        <div
          className={cn(
            "flex flex-row items-center gap-4",
            "-translate-x-[50px] sm:-translate-x-[100px] md:-translate-x-[150px]"
          )}
          style={{
            transform:
              "translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)",
          }}
        >
          {/* Vertical Marquee (downwards) */}
          <MarqueeRoot
            className="[--duration:60s]"
            pauseOnHover
            repeat={3}
            vertical
          >
            {images.map((image) => (
              <ImageCard {...image} key={image.id} />
            ))}
          </MarqueeRoot>
          {/* Vertical Marquee (upwards) */}
          <MarqueeRoot
            className="[--duration:60s]"
            pauseOnHover
            repeat={3}
            reverse
            vertical
          >
            {images.map((image) => (
              <ImageCard {...image} key={image.id} />
            ))}
          </MarqueeRoot>
          {/* Vertical Marquee (upwards) */}
          <MarqueeRoot
            className="[--duration:60s]"
            pauseOnHover
            repeat={3}
            vertical
          >
            {images.map((image) => (
              <ImageCard {...image} key={image.id} />
            ))}
          </MarqueeRoot>
          {/* Vertical Marquee (upwards) */}
          <MarqueeRoot
            className="[--duration:60s]"
            pauseOnHover
            repeat={3}
            reverse
            vertical
          >
            {images.map((image) => (
              <ImageCard {...image} key={image.id} />
            ))}
          </MarqueeRoot>
          {/* Gradient overlays for vertical marquee */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background" />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn({
        "relative flex h-[500px] w-full flex-row items-center justify-center gap-1.5 overflow-hidden":
          style === "vertical",
        "relative flex w-full flex-col items-center justify-center gap-1 overflow-hidden py-8":
          style === "horizontal",
      })}
    >
      {/* Marquee (downwards) */}
      <MarqueeRoot
        className={
          images?.length > minimumTargets
            ? "[--duration:60s]"
            : "[--duration:30s]"
        }
        pauseOnHover
        repeat={3}
        vertical={style === "vertical"}
      >
        {images.map((image) => (
          <ImageCard {...image} key={image.id} />
        ))}
      </MarqueeRoot>
      {/* Marquee (upwards) */}
      <MarqueeRoot
        className={
          images?.length > minimumTargets
            ? "[--duration:60s]"
            : "[--duration:30s]"
        }
        pauseOnHover
        repeat={3}
        reverse
        vertical={style === "vertical"}
      >
        {images.map((image) => (
          <ImageCard {...image} key={image.id} />
        ))}
      </MarqueeRoot>
      {/* Gradient overlays for vertical marquee */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background" />
    </div>
  );
};

const ImageCard = ({ image }: { image: number | MediaType }) => {
  if (typeof image === "number" || !image?.sizes?.small?.url) {
    return null;
  }

  return (
    <Card className="w-full max-w-xl">
      <CardContent>
        <Image
          alt={image.alt || ""}
          height={600}
          placeholder="blur"
          src={image.sizes.small.url}
          width={600}
        />
      </CardContent>
    </Card>
  );
};
