import type { TeamSectionBlock as TeamSectionBlockProps } from "@/payload-types";

import Image from "next/image";

import { Media } from "@/components/blocks/media";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import placeholder from "@/public/placeholder.svg";

type Props = TeamSectionBlockProps & {
  className?: string;
};

export const TeamSection = ({
  title,
  subtitle,
  members,
  hasBackground,
  className,
}: Props) => (
  <section
    className={cn(
      "py-12 lg:py-20",
      { "bg-muted/30": hasBackground },
      className
    )}
  >
    <div className="container max-w-7xl">
      <div
        className={cn("prose prose-lg dark:prose-invert mx-auto max-w-xl", {
          "prose-invert": hasBackground,
        })}
      >
        {title ? (
          <h2
            className={cn(
              "mb-2 border-b pb-1",
              hasBackground ? "border-primary-50" : "border-primary-600"
            )}
          >
            {title}
          </h2>
        ) : null}

        {subtitle ? (
          <p
            className={cn("mx-auto max-w-3xl", {
              "text-muted-foreground": !hasBackground,
            })}
          >
            {subtitle}
          </p>
        ) : null}
      </div>

      {members?.length ? (
        <div className="mt-8 flex flex-row flex-wrap justify-evenly gap-8">
          {members.map(({ name, role, bio, image, id }) => {
            if (typeof image === "string") {
              return null;
            }

            return (
              <Card
                className="flex w-full max-w-sm flex-col overflow-hidden bg-muted/30 pt-0"
                key={id}
              >
                <CardHeader className="px-0">
                  {image ? (
                    <Media
                      blockType="media"
                      imgClassName="rounded-b-none"
                      media={image}
                      pictureClassName="w-full aspect-square rounded-xl object-cover"
                    />
                  ) : (
                    <Image
                      alt=""
                      className="aspect-square w-full rounded-t-xl"
                      src={placeholder}
                    />
                  )}
                </CardHeader>

                <CardContent
                  className={cn("prose prose-sm dark:prose-invert mt-4", {
                    "prose-invert": hasBackground,
                  })}
                >
                  <p className="font-bold">{name}</p>

                  <p className="mt-2 sm:mt-0">{role}</p>
                </CardContent>

                <CardFooter
                  className={cn(
                    "grow border-primary-300 border-t border-dashed",
                    "prose prose-sm dark:prose-invert mt-4",
                    {
                      "prose-invert": hasBackground,
                    }
                  )}
                >
                  <p>{bio}</p>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      ) : null}
    </div>
  </section>
);
