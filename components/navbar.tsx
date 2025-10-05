import Link from "next/link";

import { ListIcon } from "@phosphor-icons/react/dist/ssr";

import { Logo } from "@/components/logo";
import { Mark } from "@/components/mark";
import { ModeToggle } from "@/components/mode-toggle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type MenuItem = {
  label: string;
  href: string;
  description?: string;
  items?: MenuItem[];
};

type Props = {
  className?: string;
  menu: MenuItem[];
};

export const Navbar = ({ menu, className }: Props) => {
  return (
    <section
      className={cn(
        "sticky inset-x-0 top-0 z-40 border-b bg-background/75 py-4 backdrop-blur-sm",
        className
      )}
    >
      <div className="container">
        {/* Desktop Menu */}
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link className="flex items-center gap-2" href="/">
              <Mark className="h-8 w-auto" />
              <span className="font-semibold text-lg tracking-tighter">
                Different Growth
              </span>
            </Link>

            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex gap-2">
            <ModeToggle />
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link className="flex items-center gap-2" href="/">
              <Mark className="h-8 w-auto" />
            </Link>
            <div className="flex gap-3">
              <ModeToggle />
              <Sheet>
                <SheetTrigger asChild>
                  <Button size="icon" variant="outline">
                    <ListIcon className="size-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="overflow-y-auto bg-background text-foreground">
                  <SheetHeader>
                    <SheetTitle>
                      <Link className="flex items-center gap-2" href="/">
                        <Logo className="h-8 w-auto" />
                      </Link>
                    </SheetTitle>
                    <SheetDescription>Creando algo diferente</SheetDescription>
                  </SheetHeader>
                  <div className="flex grow flex-col gap-6 p-4">
                    <Accordion
                      className="flex w-full flex-col gap-4"
                      collapsible
                      type="single"
                    >
                      {menu.map((item) => renderMobileMenuItem(item))}
                    </Accordion>
                  </div>
                  <div className="flex flex-col items-end gap-3 p-4">
                    <ModeToggle />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.label}>
        <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild className="w-80" key={subItem.label}>
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.label}>
      <NavigationMenuLink asChild>
        <Button asChild variant="ghost">
          <Link href={item.href}>{item.label}</Link>
        </Button>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem className="border-b-0" key={item.label} value={item.label}>
        <AccordionTrigger className="py-0 font-semibold text-md hover:no-underline">
          {item.label}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <SubMenuLink item={subItem} key={subItem.label} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Link className="font-semibold text-md" href={item.href} key={item.label}>
      {item.label}
    </Link>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => (
  <Link
    className={cn(
      "flex min-w-80 select-none flex-row gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors",
      "hover:bg-muted hover:text-accent-foreground"
    )}
    href={item.href}
  >
    <div>
      <div className="font-semibold text-sm">{item.label}</div>
      {item.description && (
        <p className="text-muted-foreground text-sm leading-snug">
          {item.description}
        </p>
      )}
    </div>
  </Link>
);
