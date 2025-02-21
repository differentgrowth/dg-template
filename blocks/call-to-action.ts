import type { Block } from "payload"

export const CallToActionBlock: Block = {
	slug: "cta",
	interfaceName: "CallToActionBlock",
	fields: [
		{
			name: "title",
			label: "Title",
			type: "group",
			fields: [
				{
					name: "firstLine",
					label: "First Line",
					type: "text",
					required: true,
					admin: {
						placeholder: "Different Growth,"
					}
				},
				{
					name: "secondLine",
					label: "Second Line",
					type: "text",
					required: false,
					admin: {
						placeholder: "tu aliado digital."
					}
				}
			]
		},
		{
			name: "primaryBtn",
			label: "Primary Button",
			type: "group",
			fields: [
				{
					name: "text",
					label: "Text",
					type: "text",
					required: false,
					admin: {
						placeholder: "¡Empieza ahora!"
					}
				},
				{
					name: "path",
					label: "Path",
					type: "text",
					required: false,
					admin: {
						placeholder: "/contacto"
					}
				}
			]
		},
		{
			name: "position",
			label: "Position",
			type: "radio",
			required: true,
			options: [
				{
					label: "Top",
					value: "top"
				},
				{
					label: "Left",
					value: "left"
				}
			],
			defaultValue: "left"
		},
		{
			name: "className",
			label: "Aditional tailwind classes",
			type: "text",
			required: false
		}
	],
	labels: {
		plural: "Calls to Action",
		singular: "Call to Action"
	}
}
