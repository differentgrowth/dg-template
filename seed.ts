import type {
  SerializedEditorState,
  SerializedLexicalNode,
} from "@payloadcms/richtext-lexical/lexical";
import type {
  CollectionSlug,
  GlobalSlug,
  Payload,
  SanitizedConfig,
} from "payload";
import type { HomePage, Page, Post } from "./payload-types";

import payload from "payload";

import {
  convertMarkdownToLexical,
  editorConfigFactory,
} from "@payloadcms/richtext-lexical";

import { categories } from "@/seed-data/categories";
import { homepageData } from "@/seed-data/homepage";
import { links } from "@/seed-data/links";
import { pageData } from "@/seed-data/pages";
import { postData } from "@/seed-data/posts";
import { socialMedia } from "@/seed-data/social-media";

// Seeding context to skip hooks if needed (e.g., for performance)
const seedingContext = { isSeeding: true };

async function cleanDatabase(currentPayload: Payload) {
  const collections = [
    "categories", // Delete dependents first
    "media",
    "posts",
    "pages",
    "users",
  ];
  for (const collection of collections) {
    try {
      await currentPayload.delete({
        collection: collection as CollectionSlug,
        where: {},
        req: { context: seedingContext },
      });
      currentPayload.logger.info(`Cleared ${collection} collection`);
    } catch (error) {
      currentPayload.logger.error(`Error clearing ${collection}:`, error);
    }
  }

  const globals = ["links", "social-media", "home-page", "blog-page"];

  for (const global of globals) {
    try {
      await currentPayload.updateGlobal({
        slug: global as GlobalSlug,
        data: {},
        req: { context: seedingContext },
      });
      currentPayload.logger.info(`Cleared ${global} global`);
    } catch (error) {
      currentPayload.logger.error(`Error clearing ${global}:`, error);
    }
  }
}

export const script = async (config: SanitizedConfig) => {
  try {
    await payload.init({ config });
    payload.logger.info("Initializing super admin for cleaning...");

    const defaultEditorConfig = await editorConfigFactory.default({
      config: payload.config,
    });

    const setRichText = (
      text: string
    ): SerializedEditorState<SerializedLexicalNode> =>
      convertMarkdownToLexical({
        editorConfig: defaultEditorConfig,
        markdown: `# Hello world\n\nThis is a **test**.\n\n${text}`,
      });

    payload.logger.info("Cleaning database with superAdmin...");
    await cleanDatabase(payload);
    payload.logger.info("Database cleaned successfully!");

    const adminUser = await payload.create({
      collection: "users",
      data: {
        name: "Admin",
        email: "iam@email.com",
        password: "Testing123!",
        role: "admin",
      },
      req: { context: seedingContext },
    });

    await payload.updateGlobal({
      slug: "home-page",
      data: homepageData(setRichText) as HomePage,
      req: { context: seedingContext },
    });
    await payload.updateGlobal({
      slug: "blog-page",
      data: {
        label: "Blog",
        showOnHeader: true,
        showOnFooter: true,
      },
      req: { context: seedingContext },
    });

    await payload.updateGlobal({
      slug: "social-media",
      data: {
        items: socialMedia,
      },
      req: { context: seedingContext },
    });
    await payload.updateGlobal({
      slug: "links",
      data: {
        items: links,
      },
      req: { context: seedingContext },
    });

    const [category1, category2] = await Promise.all(
      categories.map((category) =>
        payload.create({
          collection: "categories",
          data: { title: category },
          req: { context: seedingContext },
        })
      )
    );

    await payload.create({
      collection: "pages",
      data: pageData(setRichText, {
        showOnHeader: true,
        showOnFooter: true,
        slug: "about-us",
        status: "published",
      }) as unknown as Page,
      req: { context: seedingContext },
    });

    await payload.create({
      collection: "posts",
      data: postData(setRichText, {
        slug: "post-1",
        author: adminUser,
        featured: false,
        category: category2,
        status: "published",
      }) as unknown as Post,
      req: { context: seedingContext },
    });
    await payload.create({
      collection: "posts",
      data: postData(setRichText, {
        slug: "featured-post",
        author: adminUser,
        featured: true,
        category: category2,
        status: "published",
      }) as unknown as Post,
      req: { context: seedingContext },
    });
    await payload.create({
      collection: "posts",
      data: postData(setRichText, {
        author: adminUser,
        featured: false,
        category: category1,
        slug: "post-2",
        status: "published",
      }) as unknown as Post,
      req: { context: seedingContext },
    });

    payload.logger.info("Seed data created successfully!");
    process.exit(0);
  } catch (error) {
    payload.logger.error(error);
    payload.logger.error(
      `Seed failed: ${error instanceof Error ? error.message : "Unknown error"}`
    );
    process.exit(1);
  }
};
