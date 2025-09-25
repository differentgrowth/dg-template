import type { GalleryBlock as GalleryBlockProps } from "@/payload-types";

import { Media } from "@/components/blocks/media";
import { cn } from "@/lib/utils";

type Props = GalleryBlockProps & {
  className?: string;
};

export const Gallery = ({ images, className }: Props) => (
  <div
    className={cn(
      "container py-12 lg:py-20",
      "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4",
      className
    )}
  >
    {images?.map(({ image, id }) => {
      if (typeof image === "number") {
        return null;
      }

      return <Media blockType="media" key={id} media={image} />;
    })}
  </div>
);
