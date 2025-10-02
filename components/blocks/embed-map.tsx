import type { EmbedMapBlock as EmbedMapBlockProps } from "@/payload-types";

import { AppleLogoIcon, GoogleLogoIcon } from "@phosphor-icons/react/dist/ssr";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = EmbedMapBlockProps & {
  className?: string;
};

export const EmbedMap = ({
  title,
  description,
  hasBackground,
  className,
  googleMapsEmbedCode,
  googleMapsUrl,
  appleMapsUrl,
}: Props) => {
  if (!(googleMapsEmbedCode || googleMapsUrl || appleMapsUrl)) {
    return null;
  }

  return (
    <div
      className={cn(
        "py-12 lg:py-20",
        { "bg-primary": hasBackground },
        className
      )}
    >
      <div className="container flex flex-col items-center">
        {title ? (
          <h2
            className={cn(
              "mb-2 border-b pb-1 font-bold text-3xl tracking-tight sm:text-4xl",
              hasBackground
                ? "border-primary-50 text-primary-50"
                : "border-primary-600 text-primary-600"
            )}
          >
            {title}
          </h2>
        ) : null}
        {description ? (
          <p
            className={cn(
              "mx-auto max-w-3xl text-lg",
              hasBackground ? "text-primary-100" : "text-default-600"
            )}
          >
            {description}
          </p>
        ) : null}

        {googleMapsEmbedCode ? (
          <iframe
            allowFullScreen
            className="my-12 aspect-video w-full max-w-3xl rounded-xl border-none shadow-large"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={googleMapsEmbedCode}
            title={title || "Google Maps"}
          />
        ) : null}
        <div className="flex w-full max-w-3xl flex-wrap justify-center gap-6">
          {appleMapsUrl ? (
            <Button asChild variant="outline">
              <a href={appleMapsUrl} rel="noopener noreferrer" target="_blank">
                <AppleLogoIcon />
                Ver en Apple Maps
              </a>
            </Button>
          ) : null}
          {googleMapsUrl ? (
            <Button asChild variant="outline">
              <a href={googleMapsUrl} rel="noopener noreferrer" target="_blank">
                <GoogleLogoIcon />
                Ver en Google Maps
              </a>
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
};
