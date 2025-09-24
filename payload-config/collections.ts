import type { Config } from "payload";

import { Categories } from "@/collections/categories";
import { Media } from "@/collections/media";
import { Pages } from "@/collections/pages";
import { Posts } from "@/collections/posts";
import { Users } from "@/collections/users";

export const collections: NonNullable<Config["collections"]> = [
  Users,
  Categories,
  Media,
  Posts,
  Pages,
];
