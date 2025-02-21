import type { Block } from "payload"

export const CallToActionBlock: Block = {
	slug: "callToAction",
	interfaceName: "CallToActionBlock",
	fields: [
		{
			name: "title",
			label: "Title",
			type: "text",
			required: true,
			admin: {
				placeholder: "Different Growth,"
			}
		},
		{
			name: "caption",
			label: "Caption",
			type: "text",
			admin: {
				placeholder: "tu aliado digital."
			}
		},
		{
			name: "button",
			label: "Button",
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
						placeholder: "/contacto",
						description: "Without domain"
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
		}
	],
	labels: {
		plural: "Calls to Action",
		singular: "Call to Action"
	}
}
