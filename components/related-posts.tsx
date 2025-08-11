import type { Post } from '@/payload-types';

import Link from 'next/link';

import { Media } from '@/components/blocks/media';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export type Props = {
  docs?: Post[];
  className?: string;
  intro: string;
};

export const RelatedPosts = ({ docs, intro, className }: Props) => {
  return (
    <div className={className}>
      <h3 className="mb-6">{intro}</h3>
      <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        {docs?.map(({ id, title, categories, slug, meta }) => (
          <Card
            className="relative flex w-full max-w-[250px] flex-col"
            key={id}
          >
            <CardHeader className="rounded-t-xl px-0 pt-0">
              {meta?.image && typeof meta?.image !== 'string' ? (
                <Media
                  blockType="media"
                  captionClassName="sr-only"
                  className="w-full max-w-[250px] border-b"
                  imgClassName="w-full max-w-[250px] aspect-square rounded-t-xl object-cover grayscale"
                  media={meta.image}
                />
              ) : null}
            </CardHeader>
            <CardContent className="grow">
              <CardTitle>{title}</CardTitle>
            </CardContent>
            <CardFooter>
              <div className="flex flex-row flex-wrap items-start justify-start gap-1.5 space-y-0">
                {categories?.map((category) => {
                  if (typeof category === 'object') {
                    const { title: titleFromCategory } = category;

                    const categoryTitle =
                      titleFromCategory || 'Untitled category';

                    return (
                      <Badge className="font-mono" key={categoryTitle}>
                        {categoryTitle}
                      </Badge>
                    );
                  }

                  return null;
                })}
              </div>
              <Link aria-label={title} href={`/blog/${slug}`}>
                <span className="absolute inset-0" />
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
