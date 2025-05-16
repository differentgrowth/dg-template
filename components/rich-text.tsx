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
				"prose prose-stone dark:prose-invert",
				enableGutter ? "container max-w-6xl" : "max-w-none",
				className
			)}
			{...rest}
		/>
	)
}
