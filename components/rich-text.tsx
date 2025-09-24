import type {
  DefaultNodeTypes,
  SerializedBlockNode,
} from "@payloadcms/richtext-lexical";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import type {
  CallToActionBlock as CallToActionBlockProps,
  MediaBlock as MediaBlockProps,
} from "@/payload-types";

import {
  type JSXConvertersFunction,
  RichText as RichTextWithBlocks,
} from "@payloadcms/richtext-lexical/react";

import { CallToAction } from "@/components/blocks/call-to-action";
import { Media } from "@/components/blocks/media";
import { cn } from "@/lib/utils";

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<MediaBlockProps | CallToActionBlockProps>;

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
  blocks: {
    media: ({ node }) => (
      <Media
        captionClassName="mx-auto w-full max-w-lg"
        enableGutter={false}
        imgClassName="rounded-md shadow-sm"
        {...node.fields}
      />
    ),
    callToAction: ({ node }) => (
      <CallToAction
        className="max-w-none rounded-2xl px-0 md:py-12 lg:py-12"
        {...node.fields}
      />
    ),
  },
});

type Props = {
  data: SerializedEditorState;
  enableGutter?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export const RichText = ({
  className,
  enableGutter = false,
  ...rest
}: Props) => (
  <RichTextWithBlocks
    className={cn(
      "prose dark:prose-invert",
      {
        "container max-w-7xl": enableGutter,
      },
      className
    )}
    converters={
      jsxConverters as unknown as JSXConvertersFunction<DefaultNodeTypes>
    }
    {...rest}
  />
);
