import Link from 'next/link';

import { Border } from '@/components/ui/border';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Props = {
  title: string;
  caption?: string | null;
  button: {
    text: string;
    path: string;
  };
  className?: string;
};
export const CallToAction = ({ title, caption, button, className }: Props) => {
  return (
    <Border className={cn('container my-6', className)} position="left">
      <p className="font-bold text-3xl tracking-tight sm:text-4xl">{title}</p>
      {caption ? (
        <p className="font-medium text-muted-foreground text-xl tracking-tight sm:text-2xl">
          {caption}
        </p>
      ) : null}
      <div
        className={cn(
          'mt-10 flex flex-col items-stretch space-y-4',
          'sm:flex-row sm:items-center sm:justify-end sm:space-x-6 sm:space-y-0'
        )}
      >
        {button.path.startsWith('https://') ? (
          <a
            className={buttonVariants({ variant: 'default' })}
            href={button.path}
          >
            {button.text}
          </a>
        ) : (
          <Link
            className={buttonVariants({ variant: 'default' })}
            href={button.path}
          >
            {button.text}
          </Link>
        )}
      </div>
    </Border>
  );
};
