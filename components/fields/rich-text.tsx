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
				disableInnerContainer={true}
			/>
		)
	}
})

type Props = {
	data: SerializedEditorState
	enableGutter?: boolean
	enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export const RichText = (props: Props) => {
	const { className, enableProse = true, enableGutter = true, ...rest } = props

	return (
		<RichTextWithBlocks
			converters={
				jsxConverters as unknown as JSXConvertersFunction<DefaultNodeTypes>
			}
			className={cn(
				"[&_img]:mx-auto [&_img]:w-full [&_img]:max-w-2xl [&_img]:rounded-xl [&_img]:border",
				"[&_p>a]:underline [&_p>a]:underline-offset-4",
				"[&_ul>li]:mt-2 [&_ul]:ml-6 [&_ul]:list-disc",
				"[&_ol>li]:mt-2 [&_ol]:ml-6 [&_ol]:list-decimal",
				{
					container: enableGutter,
					"max-w-none": !enableGutter,
					"prose md:prose-md dark:prose-invert mx-auto": enableProse
				},
				className
			)}
			{...rest}
		/>
	)
}
