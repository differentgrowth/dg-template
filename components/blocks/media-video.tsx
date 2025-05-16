"use client"

import { type Ref, useRef } from "react"

import { getClientSideURL } from "@/lib/get-url"
import type { Media as MediaType } from "@/payload-types"

type Props = {
	className?: string
	videoClassName?: string
	onClick?: () => void
	onLoad?: () => void
	ref?: Ref<HTMLImageElement | HTMLVideoElement | null>
	resource?: MediaType | string | number // for Payload media
}

export const MediaVideo = ({ onClick, resource, videoClassName }: Props) => {
	const videoRef = useRef<HTMLVideoElement>(null)

	if (!resource || typeof resource !== "object") return null

	const src = `${getClientSideURL()}${resource.url}`

	return (
		<div className="animate-pulse bg-muted-foreground">
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
			<video
				autoPlay
				className={videoClassName}
				controls={false}
				loop
				muted
				playsInline
				onClick={onClick}
				ref={videoRef}
			>
				<source src={src} />
			</video>
		</div>
	)
}
