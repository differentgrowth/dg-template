import { cn } from "@/lib/utils"

export const TailwindIndicator = ({
	position = "left"
}: { position?: "left" | "right" | "center" }) => {
	if (process.env.NODE_ENV === "production") {
		return null
	}

	return (
		<div
			className={cn(
				"fixed bottom-1 z-9999",
				"flex size-6 items-center justify-center rounded",
				"bg-foreground p-3 font-mono text-background text-xs",
				{
					"left-1": position === "left",
					"right-1": position === "right",
					"-translate-x-1/2 left-1/2": position === "center"
				}
			)}
		>
			<div className="block sm:hidden">xs</div>
			<div className="hidden sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">
				sm
			</div>
			<div className="hidden md:block lg:hidden xl:hidden 2xl:hidden">md</div>
			<div className="hidden lg:block xl:hidden 2xl:hidden">lg</div>
			<div className="hidden xl:block 2xl:hidden">xl</div>
			<div className="hidden 2xl:block">2xl</div>
		</div>
	)
}
