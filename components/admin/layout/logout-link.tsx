import Link from "next/link";

import { SignOutIcon } from "@phosphor-icons/react/dist/ssr";

export const LogoutLink = () => (
  <Link
    className="inline-flex size-8 items-center justify-center rounded-lg border border-(--theme-border-color) hover:bg-(--theme-elevation-200)"
    href="/admin/logout"
  >
    <SignOutIcon className="size-4" />
  </Link>
);
