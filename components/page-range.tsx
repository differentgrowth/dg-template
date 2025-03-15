import { cn } from "@/lib/utils"

const defaultLabels = {
	plural: "Docs",
	singular: "Doc"
}

const defaultCollectionLabels: {
	[key: string]: { plural: string; singular: string }
} = {
	posts: {
		plural: "Posts",
		singular: "Post"
	}
}

type Props = {
	className?: string
	collection?: string
	collectionLabels?: {
		plural?: string
		singular?: string
	}
	currentPage?: number
	limit?: number
	totalDocs?: number
}

export const PageRange = ({
	className,
	collection,
	collectionLabels: collectionLabelsFromProps,
	currentPage,
	limit,
	totalDocs
}: Props) => {
	let indexStart = (currentPage ? currentPage - 1 : 1) * (limit || 1) + 1
	if (totalDocs && indexStart > totalDocs) indexStart = 0

	let indexEnd = (currentPage || 1) * (limit || 1)
	if (totalDocs && indexEnd > totalDocs) indexEnd = totalDocs

	const { plural, singular } =
		collectionLabelsFromProps ||
		defaultCollectionLabels[collection || ""] ||
		defaultLabels ||
		{}

	return (
		<div className={cn("container mb-8 font-semibold", className)}>
			{typeof totalDocs !== "undefined" && totalDocs > 0
				? `Mostrando ${indexStart}${indexStart > 0 ? ` - ${indexEnd}` : ""} de ${totalDocs} ${
						totalDocs > 1 ? plural : singular
					}`
				: "Búsqueda sin resultados."}
		</div>
	)
}
