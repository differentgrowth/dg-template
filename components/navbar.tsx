"use client";

import { useState } from "react";
import Link from "next/link";

import { ModeToggle } from "@/components/mode-toggle";
import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavBody,
  NavbarLogo,
  NavItems,
  Navbar as ResizableNavbar,
} from "@/components/ui/resizable-navbar";

type Props = {
  items: {
    id: number;
    label: string;
    href: string;
  }[];
};

export function Navbar({ items }: Props) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (

    <ResizableNavbar>
      {/* Desktop Navigation */}
      <NavBody>
        <NavbarLogo />
        <NavItems items={items} />
        <div className="flex items-center gap-4">
          <ModeToggle />
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {items.map((item) => (
            <Link
              className="relative text-muted-foreground"
              href={item.href}
              key={item.id}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="block">{item.label}</span>
            </Link>
          ))}
          <div className="flex flex-col w-full gap-4">
            <ModeToggle />
          </div>
        </MobileNavMenu>
      </MobileNav>
    </ResizableNavbar>
  );
}
