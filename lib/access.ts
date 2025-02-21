import type { User } from "@/payload-types"
import type { AccessArgs, FieldAccess } from "payload"

type Authenticated = (args: AccessArgs<User>) => boolean
type AdminOrOwner = (
	args: AccessArgs<User>
) => boolean | { owner: { equals: number } }

export const anyone: Authenticated = () => true

export const authenticated: Authenticated = ({ req: { user } }) => {
	return Boolean(user)
}

export const isAdmin: Authenticated = ({ req: { user } }) => {
	return Boolean(user && user.role === "admin")
}

export const isAdminOrSelf: Authenticated = ({ req: { user }, id }) => {
	if (user) {
		if (user.role === "admin") {
			return true
		}

		return user.id === id
	}

	return false
}

export const isAdminOrOwner: AdminOrOwner = ({ req: { user } }) => {
	if (!user) {
		return false // Deny access if the user is not logged in
	}

	if (user.role === "admin") {
		return true
	}

	return {
		owner: {
			equals: user.id // Allow access if the current user is the owner
		}
	}
}

export const isAdminField: FieldAccess = ({ req: { user } }) => {
	return Boolean(user && user.role === "admin")
}
