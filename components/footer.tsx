import Link from 'next/link';

import { Logo } from '@/components/logo';
import { buttonVariants } from '@/components/ui/button';
import { SocialMediaIcon } from '@/components/ui/social-media-icon';
import { cn } from '@/lib/utils';
import { getNavigation } from '@/queries/get-navigation';
import { getSocialMediaLinks } from '@/queries/get-social-media-links';

export const Footer = async () => {
  const [{ docs: navigation }, socialMediaLinks] = await Promise.all([
    getNavigation({ header: false, footer: true }),
    getSocialMediaLinks(),
  ]);

  return (
    <footer className="container mt-12 max-w-7xl border-t lg:mt-24">
      <div className="px-3 pt-20 pb-8 sm:pt-24 lg:pt-32">
        <div className="xl:grid xl:grid-cols-4 xl:gap-8">
          <div className="space-y-3">
            <p className="text-muted-foreground text-sm italic leading-6 tracking-tighter">
              Creando algo diferente
            </p>
            <div className="flex space-x-6">
              {socialMediaLinks.items.map(({ id, label, url, platform }) => (
                <a
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'icon',
                  })}
                  href={url}
                  key={id}
                  rel="nofollow norefferer"
                  target="_blank"
                >
                  <span className="sr-only">{label}</span>
                  <SocialMediaIcon platform={platform} />
                </a>
              ))}
            </div>
          </div>

          <div className="mt-12 xl:col-span-3 xl:mt-0">
            <Logo className="mx-auto h-auto w-full max-w-2xl" />
          </div>
        </div>
      </div>

      <div className="mt-12 w-full gap-10 border-t border-dashed px-2 pt-8 pb-3 sm:mt-20">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
          <a
            className={cn(
              buttonVariants({
                variant: 'link',
                size: 'sm',
              }),
              'text-muted-foreground text-xs'
            )}
            href="/"
          >
            Inicio
          </a>
          {navigation.map(({ id, label, slug }) => (
            <Link
              className={cn(
                buttonVariants({
                  variant: 'link',
                  size: 'sm',
                }),
                'text-muted-foreground text-xs'
              )}
              href={`/${slug}`}
              key={id}
            >
              {label}
            </Link>
          ))}
        </div>

        <div
          className={cn(
            'mt-12 pt-8 sm:mt-20',
            'md:flex md:items-end lg:mt-24',
            'border-t border-dashed'
          )}
        >
          <div className="flex flex-col items-start space-y-2">
            <a
              className={cn(
                buttonVariants({
                  variant: 'link',
                  size: 'sm',
                }),
                'text-muted-foreground text-xs'
              )}
              href="/sitemap.xml"
            >
              Sitemap
            </a>
          </div>
          <div className="flex grow items-center justify-end">
            <p className="mt-8 text-muted-foreground text-xs leading-5 md:order-1 md:mt-0">
              &copy; {new Date().getFullYear()} Different Growth | Desarrollo
              web y marketing digital.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
