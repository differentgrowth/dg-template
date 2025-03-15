"use client"

import { useRouter } from "next/navigation"
import type React from "react"

import { RefreshRouteOnSave as PayloadLivePreview } from "@payloadcms/live-preview-react"

import { getClientSideURL } from "@/lib/get-url"

export const LivePreviewListener: React.FC = () => {
	const router = useRouter()
	return (
		<PayloadLivePreview
			refresh={router.refresh}
			serverURL={getClientSideURL()}
		/>
	)
}
