import type { SVGProps } from "react"

import {
	ArrowSquareOut,
	FacebookLogo,
	InstagramLogo,
	LinkedinLogo,
	TelegramLogo,
	TiktokLogo,
	XLogo,
	YoutubeLogo
} from "@phosphor-icons/react/dist/ssr"

type PlatformIconProps = SVGProps<SVGSVGElement> & {
	platform: keyof typeof platformIcons | undefined | null | ""
	label: string
}

const platformIcons = {
	twitter: (props: SVGProps<SVGSVGElement>) => <XLogo {...props} />,
	facebook: (props: SVGProps<SVGSVGElement>) => <FacebookLogo {...props} />,
	instagram: (props: SVGProps<SVGSVGElement>) => <InstagramLogo {...props} />,
	linkedin: (props: SVGProps<SVGSVGElement>) => <LinkedinLogo {...props} />,
	youtube: (props: SVGProps<SVGSVGElement>) => <YoutubeLogo {...props} />,
	tiktok: (props: SVGProps<SVGSVGElement>) => <TiktokLogo {...props} />,
	telegram: (props: SVGProps<SVGSVGElement>) => <TelegramLogo {...props} />
}

export const SocialMediaIcon = ({
	platform,
	label,
	...props
}: PlatformIconProps) => {
	if (!platform) return <ArrowSquareOut />

	const Icon = platformIcons[platform]

	return (
		<Icon
			aria-label={label}
			{...props}
		/>
	)
}
