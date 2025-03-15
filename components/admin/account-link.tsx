import Link from "next/link"

import { UserCircle } from "@phosphor-icons/react/dist/ssr"

export const AccountLink = () => {
	return (
		<Link
			href="/admin/account"
			className="custom-btn"
		>
			<UserCircle />
		</Link>
	)
}
