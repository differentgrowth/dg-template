import type {
	DefaultNodeTypes,
	SerializedBlockNode
} from "@payloadcms/richtext-lexical"
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical"
import {
	type JSXConvertersFunction,
	RichText as RichTextWithBlocks
} from "@payloadcms/richtext-lexical/react"

import { CallToAction } from "@/components/blocks/call-to-action"
import { Media } from "@/components/blocks/media"
import { cn } from "@/lib/utils"
import type { CallToActionBlock as CTABlockProps } from "@/payload-types"
import type { MediaBlock as MediaBlockProps } from "@/payload-types"

type NodeTypes =
	| DefaultNodeTypes
	| SerializedBlockNode<CTABlockProps | MediaBlockProps>

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({
	defaultConverters
}) => ({
	...defaultConverters,
	blocks: {
		callToAction: ({ node }) => <CallToAction {...node.fields} />,
		mediaBlock: ({ node }) => (
			<Media
				{...node.fields}
				captionClassName="mx-auto w-full max-w-lg"
				enableGutter={false}
			/>
		)
	}
})

type Props = {
	data: SerializedEditorState
	enableGutter?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export const RichText = (props: Props) => {
	const { className, enableGutter = true, ...rest } = props

	return (
		<RichTextWithBlocks
			converters={
				jsxConverters as unknown as JSXConvertersFunction<DefaultNodeTypes>
			}
			className={cn(
				"[&_img]:mx-auto [&_img]:w-full [&_img]:max-w-2xl [&_img]:rounded-xl",
				"[&_a]:inline-flex [&_a]:shrink-0 [&_a]:cursor-pointer [&_a]:items-center [&_a]:justify-center",
				"[&_a]:whitespace-nowrap [&_a]:rounded-md [&_a]:font-medium [&_a]:text-sm",
				"[&_a]:outline-none [&_a]:transition-all [&_a]:focus-visible:border-ring",
				"[&_a]:focus-visible:ring-[3px] [&_a]:focus-visible:ring-ring/50",
				"[&_a]:bg-primary [&_a]:text-primary-foreground [&_a]:shadow-xs [&_a]:hover:bg-primary/90",
				"[&_a]:h-10 [&_a]:rounded-md [&_a]:px-6",
				"[&_ul>li]:mt-2 [&_ul]:ml-6 [&_ul]:list-disc",
				"[&_ol>li]:mt-2 [&_ol]:ml-6 [&_ol]:list-decimal",
				"[&_h1]:my-6",
				"[&_h2]:my-4",
				"[&_h3]:mt-2",
				"[&_blockquote]:border-l-4 [&_blockquote]:border-l-primary",
				enableGutter ? "container" : !enableGutter,
				className
			)}
			{...rest}
		/>
	)
}
