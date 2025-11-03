"use client";

export function CopyrightParagraph() {
  return (
    <p className="mt-10 text-center text-gray-600 text-sm/6 dark:text-gray-400">
      &copy; {new Date().getFullYear()} Different Growth. All rights reserved.
    </p>
  );
}
