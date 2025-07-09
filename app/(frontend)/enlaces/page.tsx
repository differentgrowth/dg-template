import { redirect } from 'next/navigation';

import { ArrowSquareOutIcon } from '@phosphor-icons/react/dist/ssr';

import { SocialMediaIcon } from '@/components/social-media-icon';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getLinks } from '@/queries/get-links';
import { getSocialMediaLinks } from '@/queries/get-social-media-links';

export default async function Page() {
  const [{ items: links }, { items: socialMediaLinks }] = await Promise.all([
    getLinks(),
    getSocialMediaLinks(),
  ]);

  if (!links) {
    redirect('/');
  }

  return (
    <main className="mt-12 flex flex-col space-y-12">
      <div className="container max-w-2xl border-b">
        <h1>Different Growth</h1>
      </div>
      <section
        className={cn(
          'container max-w-md grow',
          'flex flex-col items-center space-y-6'
        )}
      >
        {links.map(({ id, label, url }) => (
          <a
            className={cn(
              'group',
              buttonVariants({ variant: 'ghost', size: 'lg' }),
              'w-full justify-between border'
            )}
            href={url}
            key={id}
            rel="noreferrer"
            target="_blank"
          >
            {label}
            <ArrowSquareOutIcon
              aria-hidden="true"
              className="origin-bottom-left scale-0 transition-transform group-hover:scale-100"
            />
          </a>
        ))}
      </section>

      <section
        className={cn(
          'container max-w-md',
          'flex flex-wrap items-center gap-3'
        )}
      >
        {socialMediaLinks.map(({ id, label, url, platform }) => (
          <a
            aria-label={label}
            className={buttonVariants({
              variant: 'ghost',
              size: 'icon',
              className: 'border',
            })}
            href={url}
            key={id}
            rel="noreferrer"
            target="_blank"
          >
            <SocialMediaIcon aria-label={platform} platform={platform} />
          </a>
        ))}
      </section>
    </main>
  );
}
