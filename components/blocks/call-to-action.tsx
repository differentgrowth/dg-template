import Link from "next/link"

import { Border } from "@/components/ui/border"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Props = {
	title: string
	caption?: string
	button?: {
		text?: string | null
		path?: string | null
	}
	position?: ("top" | "left") | null
	className?: string | null
}

export const CallToAction = ({
	title,
	caption,
	button,
	position,
	className
}: Props) => {
	return (
		<Border
			position={position ? position : "left"}
			className={cn("container", className)}
		>
			<p className="font-bold text-3xl tracking-tight sm:text-4xl">{title}</p>
			{caption ? (
				<p className="font-bold text-3xl tracking-tight sm:text-4xl">{caption}</p>
			) : null}
			<div
				className={cn(
					"mt-10 flex flex-col items-stretch space-y-4",
					"sm:flex-row sm:items-center sm:justify-end sm:space-x-6 sm:space-y-0"
				)}
			>
				<Link
					href={button?.path ? button.path : "/contacto"}
					className={buttonVariants({ variant: "default" })}
					rel={button?.path === "/contacto" ? "nofollow" : undefined}
				>
					{button?.text ? button.text : "¡Empieza ahora!"}
				</Link>
			</div>
		</Border>
	)
}
