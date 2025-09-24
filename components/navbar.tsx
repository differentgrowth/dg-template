"use client";

import { useState } from "react";

import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavBody,
  // NavbarButton,
  NavbarLogo,
  NavItems,
  Navbar as ResizableNavbar,
} from "@/components/ui/resizable-navbar";

import { ModeToggle } from "./mode-toggle";

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
            <a
              className="relative text-muted-foreground"
              href={item.href}
              key={item.id}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="block">{item.label}</span>
            </a>
          ))}
          <div className="flex w-full flex-col gap-4">
            <ModeToggle />
          </div>
        </MobileNavMenu>
      </MobileNav>
    </ResizableNavbar>
  );
}
