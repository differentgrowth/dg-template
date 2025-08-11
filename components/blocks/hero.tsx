import type { Media as TMedia } from '@/payload-types';

import Link from 'next/link';

import { ArrowRightIcon } from '@phosphor-icons/react/dist/ssr';

import { Media } from '@/components/blocks/media';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Props = {
  h1: string;
  description?: string | null;
  primaryLink?: {
    label?: string | null;
    path?: string | null;
  };
  secondaryLink?: {
    label?: string | null;
    path?: string | null;
  };
  image?: number | TMedia | null;
};

export const Hero = ({
  h1,
  description,
  image,
  primaryLink,
  secondaryLink,
}: Props) => {
  return (
    <section className="container max-w-7xl pt-20 pb-20 md:pb-32">
      <div
        className={cn(
          'mx-auto grid max-w-2xl grid-cols-1 gap-x-16 gap-y-8',
          'lg:mx-0 lg:max-w-none lg:grid-cols-2'
        )}
      >
        <div className="mt-6 max-w-xl lg:mt-0">
          <h1 className="max-w-2xl text-balance">{h1}</h1>
          <p className="text-pretty text-lg text-muted-foreground sm:text-xl/8">
            {description}
          </p>
          {primaryLink || secondaryLink ? (
            <div className="mt-10 flex flex-wrap items-center gap-x-6">
              {primaryLink?.path ? (
                <Link
                  className={cn(
                    buttonVariants({ variant: 'default', size: 'lg' })
                  )}
                  href={primaryLink.path}
                >
                  {primaryLink.label}
                </Link>
              ) : null}
              {secondaryLink?.path ? (
                <Link
                  className={cn(
                    buttonVariants({ variant: 'ghost', size: 'lg' })
                  )}
                  href={secondaryLink.path}
                >
                  {secondaryLink.label} <ArrowRightIcon />
                </Link>
              ) : null}
            </div>
          ) : null}
        </div>
        {image ? (
          <Media
            blockType="media"
            className={cn('w-full max-w-sm', 'xl:row-span-2 xl:row-end-2')}
            htmlElement="div"
            imgClassName="rounded-2xl"
            media={image}
          />
        ) : null}
      </div>
    </section>
  );
};
