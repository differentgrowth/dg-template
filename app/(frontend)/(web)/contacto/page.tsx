import type { Metadata } from "next";
import type { Media } from "@/payload-types";

import { Hero } from "@/components/blocks/hero";
import { RenderBlocks } from "@/components/blocks/render-blocks";
import { getServerSideURL } from "@/lib/get-url";
import { getContactPage } from "@/queries/get-contact-page";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getContactPage();

  const imageUrl =
    (page.meta?.image as Media).sizes?.og?.url ||
    (page.meta?.image as Media).url;

  return {
    title: {
      absolute: page.meta?.title || "Coinbroker | Aseguramos tu día a día",
    },
    description:
      page.meta?.description ||
      "Somos una empresa de Asesoramiento y Mediación de Seguros, siendo uno de nuestros mayores objetivos ofrecer el mejor servicio a nuestros clientes",
    alternates: {
      canonical: `${getServerSideURL()}/contacto`,
    },
    openGraph: {
      url: `${getServerSideURL()}/contacto`,
      siteName: "Coinbroker",
      locale: "es_ES",
      type: "website",
      ...(imageUrl
        ? {
            images: [
              {
                url: `${getServerSideURL()}${imageUrl}`,
                width: 1200,
                height: 630,
                alt: page.meta?.title || "Coinbroker",
              },
            ],
          }
        : {}),
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function Page() {
  const { hero, blocks } = await getContactPage();

  return (
    <main>
      <Hero {...hero} />
      <RenderBlocks blocks={blocks} />
    </main>
  );
}
