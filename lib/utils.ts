import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const slugify = (str: string): string => {
  return str
    .normalize('NFD') // Normalize to decompose diacritical marks
    .replace(/\u0300-\u036f/g, '') // Remove diacritical marks (accents)
    .replace(/[^a-zA-Z0-9\s-]/g, '') // Remove any non-alphanumeric or space/dash characters
    .trim() // Remove whitespace from start and end
    .replace(/\s+/g, '-') // Replace spaces with a single dash
    .replace(/-+/g, '-') // Remove multiple dashes
    .toLowerCase(); // Convert to lowercase
};

export const formatDate = (date: string | Date) => {
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(typeof date === 'string' ? new Date(date) : date);
};

export const currency = (amount: number) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
};

export function isObject(item: unknown): item is object {
  return typeof item === 'object' && !Array.isArray(item);
}

export function deepMerge<
  // biome-ignore lint/suspicious/noExplicitAny: this any type is necessary
  T extends Record<string, any>,
  // biome-ignore lint/suspicious/noExplicitAny: this any type is necessary
  R extends Record<string, any>,
>(target: T, source: R): T & R {
  // biome-ignore lint/suspicious/noExplicitAny: this any type is necessary for deepMerge function
  const output = { ...target } as any;
  if (isObject(target) && isObject(source)) {
    for (const key of Object.keys(source)) {
      if (isObject(source[key])) {
        if (key in target) {
          output[key] = deepMerge(target[key], source[key]);
        } else {
          output[key] = source[key];
        }
      } else {
        output[key] = source[key];
      }
    }
  }

  return output;
}
