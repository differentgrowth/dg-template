import type {
  SerializedEditorState,
  SerializedLexicalNode,
} from "@payloadcms/richtext-lexical/lexical";
import type { StaticImageData } from "next/image";
import type {
  MediaBlock as MediaBlockProps,
  Media as MediaType,
} from "@/payload-types";

import { type ElementType, Fragment } from "react";

import { MediaImage } from "@/components/blocks/media-image";
import { MediaVideo } from "@/components/blocks/media-video";
import { RichText } from "@/components/rich-text";
import { cn } from "@/lib/utils";

export type Props = MediaBlockProps & {
  breakout?: boolean;
  className?: string;
  captionClassName?: string;
  pictureClassName?: string;
  enableGutter?: boolean;
  imgClassName?: string;
  staticImage?: StaticImageData;
  sizesFromProps?: string;
  fill?: boolean;
  htmlElement?: ElementType | null;
  videoClassName?: string;
  sizeName?: keyof NonNullable<MediaType["sizes"]>;
};

export const Media = ({
  captionClassName,
  className,
  media,
  htmlElement,
  ...props
}: Props) => {
  let caption: SerializedEditorState<SerializedLexicalNode> | undefined | null =
    null;
  if (media && typeof media === "object") {
    caption = media.caption;
  }

  const isVideo =
    typeof media === "object" && media?.mimeType?.includes("video");
  const Tag = htmlElement || Fragment;

  return (
    <Tag
      {...(htmlElement !== null
        ? {
            className,
          }
        : {})}
    >
      {isVideo ? (
        <MediaVideo resource={media} {...props} />
      ) : (
        <MediaImage resource={media} {...props} />
      )}
      {caption ? (
        <div className={cn("mt-2", captionClassName)}>
          <RichText className="prose-sm" data={caption} />
        </div>
      ) : null}
    </Tag>
  );
};
