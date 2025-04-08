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
	sizesFromProps?: string
	fill?: boolean
}

export const Media = ({
	captionClassName,
	className,
	enableGutter = false,
	imgClassName,
	media,
	staticImage,
	sizesFromProps,
	fill = false
}: Props) => {
	let caption: SerializedEditorState<SerializedLexicalNode> | undefined | null =
		null
	if (media && typeof media === "object") caption = media.caption

	return (
		<>
			{(media || staticImage) && (
				<MediaImage
					className={cn(
						"mx-auto ",
						{
							"container w-full": enableGutter
						},
						className
					)}
					imgClassName={imgClassName}
					resource={media}
					src={staticImage}
					sizes={sizesFromProps}
					fill={fill}
				/>
			)}
			{caption ? (
				<div className={cn("mt-2", captionClassName)}>
					<RichText
						data={caption}
						enableGutter={false}
					/>
				</div>
			) : null}
		</>
	)
}
