import Link from "next/link"

import { SignOut } from "@phosphor-icons/react/dist/ssr"

export const LogoutButton = () => {
	return (
		<Link
			href="/admin/logout"
			className="custom-btn"
		>
			<SignOut />
		</Link>
	)
}
