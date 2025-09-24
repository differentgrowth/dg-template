import type { Access } from "payload";
import type { User } from "@/payload-types";

export const checkRole = (
  role: User["role"],
  user: User | null = null
): boolean => {
  if (user) {
    return user.role === role;
  }

  return false;
};

export const anyone: Access = () => true;

export const nobody: Access = () => false;

export const adminsAndUser: Access = ({ req: { user } }) => {
  if (user) {
    if (checkRole("admin", user)) {
      return true;
    }

    return {
      id: { equals: user.id },
    };
  }

  return false;
};

export const adminsAndEditors: Access = ({ req: { user } }) => {
  if (user) {
    if (checkRole("admin", user)) {
      return true;
    }
    if (checkRole("editor", user)) {
      return true;
    }
  }

  return false;
};

export const admins: Access = ({ req: { user } }) => checkRole("admin", user);
