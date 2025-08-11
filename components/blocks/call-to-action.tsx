import type { CallToActionBlock as CallToActionBlockProps } from '@/payload-types';

import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const CallToAction = ({
  title,
  description,
  button,
}: CallToActionBlockProps) => {
  return (
    <div className="container my-12 max-w-7xl border-t border-dashed md:my-20 lg:my-32">
      <div className={cn('mx-auto max-w-4xl')}>
        <p className="font-bold text-3xl tracking-tight sm:text-4xl">{title}</p>
        {description ? (
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
            {description}
          </p>
        ) : null}
        <div
          className={cn(
            'mt-10 flex flex-col items-stretch space-y-4',
            'sm:flex-row sm:items-center sm:justify-end sm:space-x-6 sm:space-y-0'
          )}
        >
          {button?.path?.startsWith('https://') ? (
            <a
              className={buttonVariants({ variant: 'default' })}
              href={
                button?.path
                  ? button.path
                  : 'https://www.differentgrowth.com/contacto'
              }
            >
              {button?.label ? button.label : '¡Empezar ahora!'}
            </a>
          ) : (
            <Link
              className={buttonVariants({ variant: 'default' })}
              href={button?.path ? button.path : '/contacto'}
              rel={button?.path === '/contacto' ? 'nofollow' : undefined}
            >
              {button?.label ? button.label : '¡Empezar ahora!'}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
