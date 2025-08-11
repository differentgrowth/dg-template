'use client';

import { useState } from 'react';
import Link, { type LinkProps } from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { HouseIcon, ListIcon } from '@phosphor-icons/react/dist/ssr';

import { Button, buttonVariants } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

type Props = {
  navigation: {
    id: number;
    label: string;
    slug: string;
  }[];
  className?: string;
};

export const MobileNavbar = ({ navigation, className }: Props) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger asChild>
        <Button
          className={className}
          size="icon"
          type="button"
          variant="outline"
        >
          <ListIcon />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent
        className="flex w-[250px] max-w-full flex-col px-3 sm:w-[400px]"
        side="right"
      >
        <SheetHeader>
          <SheetTitle>Different Growth</SheetTitle>
        </SheetHeader>

        <ScrollArea className="my-4 grow">
          <div className="flex flex-col space-y-3">
            <MobileLink
              aria-disabled={pathname === '/'}
              aria-label="home"
              className={cn(
                buttonVariants({
                  variant: pathname === '/' ? 'default' : 'outline',
                }),
                'justify-start'
              )}
              href="/"
              onOpenChange={setOpen}
            >
              <HouseIcon aria-hidden="true" />
              Inicio
            </MobileLink>

            <Separator />

            {navigation.map(({ id, label, slug }) => (
              <MobileLink
                className={cn(
                  buttonVariants({
                    variant: pathname === `/${slug}` ? 'default' : 'outline',
                  }),
                  'justify-start'
                )}
                href={`/${slug}`}
                key={id}
                onOpenChange={setOpen}
              >
                {label}
              </MobileLink>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter();

  return (
    <Link
      className={cn(className)}
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      {...props}
    >
      {children}
    </Link>
  );
}
