import type { Post } from "@/payload-types";

import Image from "next/image";
import Link from "next/link";

import {
  ArrowRightIcon,
  CalendarDotIcon,
  PencilCircleIcon,
} from "@phosphor-icons/react/dist/ssr";

import { Media } from "@/components/blocks/media";
import { RichText } from "@/components/rich-text";
import { Badge, BadgeDot } from "@/components/ui/base-badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn, formatDate } from "@/lib/utils";
import placeholder from "@/public/placeholder.svg";

type Props = { posts: (PostData | number)[]; className?: string };
type PostData = Pick<
  Post,
  | "slug"
  | "categories"
  | "title"
  | "description"
  | "id"
  | "image"
  | "publishedAt"
  | "authors"
>;

export const PostsList = ({ posts, className }: Props) => {
  if (!posts.length) {
    return null;
  }

  return (
    <div className={cn("container max-w-5xl py-12", className)}>
      <div>
        <div className="flex flex-col gap-y-12">
          {posts.map((item) => {
            if (typeof item === "number") {
              return null;
            }
            const {
              id,
              image,
              title,
              description,
              categories,
              slug,
              publishedAt,
              authors,
            } = item;
            return (
              <Card className="relative" key={id}>
                <CardHeader className="relative z-0 h-48 w-full overflow-hidden">
                  {image ? (
                    <Media
                      blockType="media"
                      className="h-full w-full"
                      fill
                      imgClassName="rounded-t-large object-cover"
                      media={image}
                    />
                  ) : (
                    <Image
                      alt={title}
                      className="rounded-t-large object-cover"
                      fill
                      src={placeholder}
                    />
                  )}
                </CardHeader>
                <CardContent className="p-5">
                  {categories?.length || authors?.length ? (
                    <div className="mb-3 flex flex-wrap gap-2">
                      {categories?.map((category) =>
                        typeof category === "object" ? (
                          <Badge
                            appearance="light"
                            key={category.id}
                            shape="circle"
                            variant="primary"
                          >
                            <BadgeDot />
                            {category.title}
                          </Badge>
                        ) : null
                      )}
                      {authors?.map((author) =>
                        typeof author === "object" ? (
                          <Badge
                            appearance="ghost"
                            key={author.id}
                            shape="circle"
                            variant="primary"
                          >
                            <PencilCircleIcon weight="duotone" />
                            {author.name}
                          </Badge>
                        ) : null
                      )}
                    </div>
                  ) : null}
                  <h3 className="mb-2 line-clamp-2 font-semibold text-xl">
                    {title}
                  </h3>
                  <RichText
                    className="mb-4 line-clamp-3 text-default-600"
                    data={description}
                  />
                </CardContent>

                <CardFooter className="flex flex-wrap items-center justify-between border-default-100 border-t p-5">
                  {publishedAt ? (
                    <div className="flex items-center gap-2 text-default-500 text-small">
                      <CalendarDotIcon className="size-4" weight="duotone" />
                      <span>{formatDate(publishedAt)}</span>
                    </div>
                  ) : null}
                  <Link
                    aria-label={title}
                    className="flex items-center gap-1"
                    color="primary"
                    href={`/${slug}`}
                  >
                    Leer más
                    <span className="absolute inset-0" />
                    <ArrowRightIcon className="size-4" />
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
