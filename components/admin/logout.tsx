import Link from 'next/link';

import { SignOutIcon } from '@phosphor-icons/react/dist/ssr';

export const LogoutButton = () => {
  return (
    <Link className="custom--btn" href="/admin/logout">
      <SignOutIcon />
    </Link>
  );
};
