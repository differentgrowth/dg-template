import Link from 'next/link';

import { Logo } from '@/components/logo';
import { Mark } from '@/components/mark';
import { MobileNavbar } from '@/components/mobile-navbar';
import { ModeToggle } from '@/components/mode-toggle';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getNavigation } from '@/queries/get-navigation';

export const Header = async () => {
  const { docs: navigation } = await getNavigation({
    header: true,
    footer: false,
  });

  return (
    <header className="container fixed inset-x-0 z-50 mt-3 bg-background/50 backdrop-blur-xs">
      <div
        className={cn(
          'flex flex-row items-center justify-between gap-x-1.5 rounded-lg border p-1.5',
          'md:h-10'
        )}
      >
        <Link
          className={cn(
            'rounded-md p-1.5',
            'bg-background transition-[color,box-shadow] hover:bg-muted',
            'max-md:border max-md:border-input max-md:shadow-xs'
          )}
          href="/"
        >
          <Logo className="hidden h-5 md:block" />
          <Mark className="h-6 md:hidden" />
        </Link>
        <div className="flex grow items-center justify-end gap-x-1.5">
          <nav className="hidden flex-row items-center justify-end space-x-1.5 md:flex">
            {navigation.map(({ id, label, slug }) => (
              <Link
                className={buttonVariants({
                  variant: 'linkHover2',
                })}
                href={`/${slug}`}
                key={id}
              >
                {label}
              </Link>
            ))}
          </nav>
          <MobileNavbar
            className="bg-background text-base focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            navigation={navigation}
          />
          <ModeToggle className="md:size-7 md:[&>svg]:size-3.5" />
        </div>
      </div>
    </header>
  );
};
