"use client"

import { useState } from "react"

import {
	Button,
	FieldLabel,
	TextInput,
	useField,
	useFormFields
} from "@payloadcms/ui"
import type { TextFieldClientProps } from "payload"

import { slugify } from "@/lib/utils"

type Props = {
	targetField?: string
} & TextFieldClientProps

export const SlugGenerator = ({
	targetField = "title",
	readOnly: readOnlyFromProps = true
}: Props) => {
	const { value, setValue } = useField<string>({ path: "slug" })
	const [isLocked, setIsLocked] = useState(readOnlyFromProps)

	const targetFieldValue = useFormFields(([fields]) => {
		return fields[targetField]?.value as string
	})

	const handleClick = () => {
		const formattedSlug = slugify(targetFieldValue)

		if (value !== formattedSlug) setValue(formattedSlug)
	}

	return (
		<div
			style={{
				marginBottom: "20px"
			}}
		>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between"
				}}
			>
				<FieldLabel
					htmlFor="slug"
					label="Slug"
				/>
				<Button
					className="lock-button"
					buttonStyle="none"
					onClick={(prev) => setIsLocked(!prev)}
				>
					{isLocked ? "Unlock" : "Lock"}
				</Button>
				<Button
					type="button"
					onClick={handleClick}
					disabled={isLocked}
				>
					Generate
				</Button>
			</div>

			<TextInput
				path="slug"
				placeholder="Generate a slug"
				value={value}
				onChange={setValue}
				readOnly={isLocked}
			/>
		</div>
	)
}
