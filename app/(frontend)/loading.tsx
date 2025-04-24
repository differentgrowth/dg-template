import { SpinnerGap } from "@phosphor-icons/react/dist/ssr"

export default function Loading() {
	return (
		<div className="my-24 flex items-center justify-center">
			{/* biome-ignore lint/a11y/useSemanticElements: <explanation> */}
			<div role="status">
				<SpinnerGap
					className="inline size-24 animate-spin"
					aria-hidden="true"
				/>
				<span className="sr-only">Loading...</span>
			</div>
		</div>
	)
}
