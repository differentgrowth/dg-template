import Link from 'next/link';

import { UserCircleIcon } from '@phosphor-icons/react/dist/ssr';

export const AccountLink = () => {
  return (
    <Link className="custom--btn" href="/admin/account">
      <UserCircleIcon />
    </Link>
  );
};
