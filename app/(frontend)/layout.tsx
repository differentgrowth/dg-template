import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import {
	Check,
	ExclamationMark,
	Info,
	Spinner,
	Warning
} from "@phosphor-icons/react/dist/ssr"

import { TailwindIndicator } from "@/components/tailwind-indicator"
import { Toaster } from "@/components/ui/sonner"
import { COMPANY_DATA } from "@/config/company"
import { cn } from "@/lib/utils"

import "./globals.css"

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" })
const geistMono = Geist_Mono({
	subsets: ["latin"],
	variable: "--font-geist-mono"
})

export const metadata: Metadata = {
	title: {
		default: "Different Growth | Potenciando tu marca con estrategias digitales",
		template: `%s | ${COMPANY_DATA.NAME}`
	},
	description:
		"En Different Growth, te ayudamos a impulsar el crecimiento de tu marca con soluciones digitales. Desde diseño web a medida hasta estrategias SEO.",
	metadataBase: new URL(COMPANY_DATA.URL),
	alternates: {
		canonical: COMPANY_DATA.URL
	},
	openGraph: {
		title: COMPANY_DATA.NAME,
		description:
			"En Different Growth, te ayudamos a impulsar el crecimiento de tu marca con soluciones digitales. Desde diseño web a medida hasta estrategias SEO.",
		url: `${COMPANY_DATA.URL}/`,
		siteName: COMPANY_DATA.NAME,
		locale: "es_ES",
		type: "website"
	},
	formatDetection: {
		email: false,
		address: false,
		telephone: false
	},
	robots: {
		index: true,
		follow: true,
		nocache: false,
		googleBot: {
			index: true,
			follow: true,
			noimageindex: false,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1
		}
	}
}

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	minimumScale: 1,
	maximumScale: 1,
	userScalable: false,
	colorScheme: "light dark",
	themeColor: [
		{
			media: "(prefers-color-scheme: light)",
			color: COMPANY_DATA.LIGHT
		},
		{
			media: "(prefers-color-scheme: dark)",
			color: COMPANY_DATA.DARK
		}
	]
}

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html
			lang="es-ES"
			className={cn("antialiased", geistSans.variable, geistMono.variable)}
		>
			<body className="selection:bg-primary selection:text-primary-foreground">
				{children}
				<Toaster
					richColors
					toastOptions={{
						classNames: {
							error: "bg-destructive-foreground text-destructive",
							success: "bg-success-foreground text-success",
							warning: "bg-warning-foreground text-warning",
							info: "bg-info-foreground text-info"
						}
					}}
					icons={{
						success: <Check className="size-4" />,
						info: <Info className="size-4" />,
						warning: <Warning className="size-4" />,
						error: <ExclamationMark className="size-4" />,
						loading: <Spinner className="size-4" />
					}}
					position="top-right"
					closeButton
				/>
				<TailwindIndicator position="right" />
			</body>
		</html>
	)
}
