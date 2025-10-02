import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

export const pageData = (
  setRichText: (text: string) => SerializedEditorState,
  config: {
    status: "published" | "draft";
    showOnHeader: boolean;
    showOnFooter: boolean;
    slug: string;
  }
) => ({
  slug: config.slug,
  _status: config.status,
  label: config.slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" "),
  showOnHeader: config.showOnHeader,
  showOnFooter: config.showOnFooter,
  hero: {
    title: "Welcome to Our Site",
    description: setRichText("Discover amazing features"),
  },
  blocks: [
    {
      blockType: "callToAction" as const,
      title: "Get Started",
      description: "Sign up today!",
      button: {
        label: "Join Now",
        path: "/signup",
      },
    },
    {
      blockType: "cardLinks" as const,
      links: [
        {
          title: "Featured 1",
          label: "Label",
          url: "#",
        },
        {
          title: "Featured 2",
          label: "Label 2",
          url: "#",
        },
      ],
    },
    {
      blockType: "cardList" as const,
      items: [
        {
          label: "Item 1",
        },
        {
          label: "Item 2",
        },
      ],
    },
    {
      blockType: "columnSection" as const,
      columns: [
        {
          size: "half" as const,
          content: setRichText("Column 1 content."),
        },
        {
          size: "half" as const,
          content: setRichText("Column 2 content."),
        },
      ],
    },
    {
      blockType: "contactForm" as const,
      title: "Contact Us",
      subtitle: "Get in touch with us",
    },
    {
      blockType: "descriptionList" as const,
      items: [
        {
          title: "Item 1",
          content: setRichText("Description for item 1."),
        },
        {
          title: "Item 2",
          content: setRichText("Description for item 2."),
        },
      ],
    },
    {
      blockType: "embedMap" as const,
      title: "Our Location",
      description: "Find us on the map.",
      googleMapsEmbedCode: "...",
      googleMapsUrl: "...",
      appleMapsUrl: "...",
    },
    {
      blockType: "faqs" as const,
      items: [
        {
          question: "Question 1",
          answer: setRichText("Answer 1."),
        },
        {
          question: "Question 2",
          answer: setRichText("Answer 2."),
        },
      ],
    },
    {
      blockType: "featuredPosts" as const,
      title: "Featured Posts",
      subtitle: "Check out our featured posts.",
    },
    {
      blockType: "latestPosts" as const,
      title: "Latest Posts",
      subtitle: "Check out our latest posts.",
    },
    {
      blockType: "teamSection" as const,
      title: "Our Team",
      subtitle: "Meet the team.",
      members: [
        {
          name: "John Doe",
          role: "CEO",
          bio: "...",
        },
      ],
    },
    {
      blockType: "testimonials" as const,
      items: [
        {
          name: "Person Name 1",
          content: "lorem ipsum dolor sit amet.",
          url: "#",
        },
      ],
    },
  ],
});
