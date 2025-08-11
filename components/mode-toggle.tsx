'use client';

import { MoonIcon as Moon, SunIcon as Sun } from '@phosphor-icons/react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

export function ModeToggle({ className }: { className?: string }) {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      className={className}
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      size="icon"
      variant="outline"
    >
      <Sun className="dark:-rotate-90 rotate-0 scale-100 transition-all dark:scale-0" />
      <Moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
