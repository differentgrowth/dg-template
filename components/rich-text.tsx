import type {
  DefaultNodeTypes,
  SerializedBlockNode,
} from '@payloadcms/richtext-lexical';
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import type {
  CallToActionBlock as CallToActionBlockProps,
  MediaBlock as MediaBlockProps,
  TwinListBlock as TwinListBlockProps,
} from '@/payload-types';

import {
  type JSXConvertersFunction,
  RichText as RichTextWithBlocks,
} from '@payloadcms/richtext-lexical/react';

import { CallToAction } from '@/components/blocks/call-to-action';
import { Media } from '@/components/blocks/media';
import { TwinLists } from '@/components/blocks/twin-lists';
import { cn } from '@/lib/utils';

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<
      CallToActionBlockProps | MediaBlockProps | TwinListBlockProps
    >;

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
  blocks: {
    callToAction: ({ node }) => <CallToAction {...node.fields} />,
    twinLists: ({ node }) => <TwinLists {...node.fields} />,
    media: ({ node }) => (
      <Media
        captionClassName="mx-auto w-full max-w-lg"
        enableGutter={false}
        imgClassName="rounded-md shadow-sm shadow-success"
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
}: Props) => {
  return (
    <RichTextWithBlocks
      className={cn({ 'container max-w-7xl': enableGutter }, className)}
      converters={
        jsxConverters as unknown as JSXConvertersFunction<DefaultNodeTypes>
      }
      {...rest}
    />
  );
};
