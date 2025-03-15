import type { Route } from "next"
import Link from "next/link"

import { Border } from "@/components/ui/border"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Props = {
	title: string
	caption?: string | null
	button?: {
		text?: string | null
		path?: string | null
	}
	className?: string
}
export const CallToAction = ({ title, caption, button, className }: Props) => {
	return (
		<Border
			position="left"
			className={cn("container my-6", className)}
		>
			<p className="font-bold text-3xl tracking-tight sm:text-4xl">{title}</p>
			{caption ? (
				<p className="font-medium text-muted-foreground text-xl tracking-tight sm:text-2xl">
					{caption}
				</p>
			) : null}
			<div
				className={cn(
					"mt-10 flex flex-col items-stretch space-y-4",
					"sm:flex-row sm:items-center sm:justify-end sm:space-x-6 sm:space-y-0"
				)}
			>
				<Link
					href={
						(button?.path !== undefined && button?.path !== null
							? button.path
							: "/contacto") as Route
					}
					className={buttonVariants({ variant: "default" })}
					rel={button?.path === "/contacto" ? "nofollow" : undefined}
				>
					{button?.text ? button.text : "¡Empieza ahora!"}
				</Link>
			</div>
		</Border>
	)
}
