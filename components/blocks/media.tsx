import type { StaticImageData } from "next/image"

import type {
	SerializedEditorState,
	SerializedLexicalNode
} from "@payloadcms/richtext-lexical/lexical"

import { MediaImage } from "@/components/blocks/media-image"
import { RichText } from "@/components/fields/rich-text"
import { cn } from "@/lib/utils"
import type { MediaBlock as MediaBlockProps } from "@/payload-types"

type Props = MediaBlockProps & {
	breakout?: boolean
	captionClassName?: string
	className?: string
	enableGutter?: boolean
	imgClassName?: string
	staticImage?: StaticImageData
	disableInnerContainer?: boolean
}

export const Media = (props: Props) => {
	const {
		captionClassName,
		className,
		enableGutter = true,
		imgClassName,
		media,
		staticImage,
		disableInnerContainer
	} = props

	let caption: SerializedEditorState<SerializedLexicalNode> | undefined | null =
		null
	if (media && typeof media === "object") caption = media.caption

	return (
		<div
			className={cn(
				{
					container: enableGutter
				},
				className
			)}
		>
			{(media || staticImage) && (
				<MediaImage
					className="mx-auto w-full max-w-2xl rounded-xl border"
					imgClassName={cn(imgClassName)}
					resource={media}
					src={staticImage}
				/>
			)}
			{caption ? (
				<div
					className={cn(
						"mt-6",
						{
							container: !disableInnerContainer
						},
						captionClassName
					)}
				>
					<RichText
						data={caption}
						enableGutter={false}
					/>
				</div>
			) : null}
		</div>
	)
}
