import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import type { Category, User } from "@/payload-types";

export const postData = (
  setRichText: (text: string) => SerializedEditorState,
  config: {
    author: User;
    featured: boolean;
    category: Category;
    slug: string;
    status: "published" | "draft";
  }
) => ({
  slug: config.slug,
  title: "Title of the post",
  description: setRichText(
    "Caption of the post lotem ipsum dolor sit amet consectetur adipiscing elit"
  ),
  publishedAt: new Date().toISOString(),
  author: config.author.id,
  featured: config.featured,
  categories: [config.category.id],
  relatedPosts: [],
  content: setRichText(
    "lotem ipsum dolor sit amet consectetur adipiscing elit lorem ipsum dolor sit amet consectetur adipiscing elit lorem ipsum dolor sit amet consectetur adipiscing elit lorem ipsum dolor sit amet consectetur adipiscing elit lorem ipsum dolor sit amet consectetur adipiscing elit lorem ipsum dolor sit amet consectetur adipiscing elit"
  ),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  _status: config.status,
});
