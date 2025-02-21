import Link from "next/link"

import { Border } from "@/components/ui/border"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Props = {
	title: {
		firstLine: string
		secondLine?: string | null
	}
	primaryBtn?: {
		text?: string | null
		path?: string | null
	}
	position?: ("top" | "left") | null
	className?: string | null
}

export const CallToAction = ({
	title,
	primaryBtn,
	position,
	className
}: Props) => {
	return (
		<Border
			position={position ? position : "left"}
			className={cn("container", className)}
		>
			<p className="font-bold text-3xl tracking-tight sm:text-4xl">
				{title.firstLine}
				{title.secondLine ? (
					<>
						<br />
						{title.secondLine}
					</>
				) : null}
			</p>
			<div
				className={cn(
					"mt-10 flex flex-col items-stretch space-y-4",
					"sm:flex-row sm:items-center sm:justify-end sm:space-x-6 sm:space-y-0"
				)}
			>
				<Link
					href={primaryBtn?.path ? primaryBtn.path : "/contacto"}
					className={buttonVariants({ variant: "default" })}
					rel={primaryBtn?.path === "/contacto" ? "nofollow" : undefined}
				>
					{primaryBtn?.text ? primaryBtn.text : "¡Empieza ahora!"}
				</Link>
			</div>
		</Border>
	)
}
