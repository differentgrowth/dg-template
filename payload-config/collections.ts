import type { Config } from "payload";

import { Categories } from "@/collections/categories";
import { Leads } from "@/collections/leads";
import { Media } from "@/collections/media";
import { Pages } from "@/collections/pages";
import { Posts } from "@/collections/posts";
import { Users } from "@/collections/users";

export const collections: NonNullable<Config["collections"]> = [
  Pages,
  Posts,
  Categories,
  Leads,
  Media,
  Users,
];
