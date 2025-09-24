import type { Config } from "payload";

import { BlogPage } from "@/globals/blog-page";
import { HomePage } from "@/globals/home-page";
import { Links } from "@/globals/links";
import { SocialMedia } from "@/globals/social-media";

export const globals: NonNullable<Config["globals"]> = [
  Links,
  HomePage,
  SocialMedia,
  BlogPage,
];
