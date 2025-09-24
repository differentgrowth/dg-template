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
      blockType: "callToAction" as const,
      title: "Get Started",
      description: "Sign up today!",
      button: {
        label: "Join Now",
        path: "/signup",
      },
    },
    {
      blockType: "descriptionList" as const,
      items: [
        {
          title: "Item 1",
          content: setRichText(
            "lorem ipsum dolor sit amet. lotem ipsum dolor sit amet."
          ),
        },
        {
          title: "Item 2",
          content: setRichText(
            "Description for item 2. lorem ipsum dolor sit amet. consectetur adipiscing elit. sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          ),
        },
      ],
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
        {
          question: "Question 3",
          answer: setRichText(
            "lorem ipsum dolor sit amet. lotem ipsum dolor sit amet."
          ),
        },
        {
          question: "Question 4",
          answer: setRichText(
            "lorem ipsum dolor sit amet. lotem ipsum dolor sit amet."
          ),
        },
      ],
    },
    {
      blockType: "testimonials" as const,
      items: [
        {
          name: "Person Name 1",
          content: "lorem ipsum dolor sit amet. lotem ipsum dolor sit amet.",
          url: "#",
        },
        {
          name: "Person Name 2",
          content: "lorem ipsum dolor sit amet. lotem ipsum dolor sit amet.",
          url: "#",
        },
        {
          name: "Person Name 3",
          content: "lorem ipsum dolor sit amet. lotem ipsum dolor sit amet.",
          url: "#",
        },
        {
          name: "Person Name 4",
          content: "lorem ipsum dolor sit amet. lotem ipsum dolor sit amet.",
          url: "#",
        },
      ],
    },
    {
      blockType: "featuredLinks" as const,
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
        {
          title: "Featured 3",
          label: "Label 3",
          url: "#",
        },
        {
          title: "Featured 4",
          label: "Label 4",
          url: "#",
        },
      ],
    },
    {
      blockType: "contactForm" as const,
      title: "Contact Us",
      subtitle: "Get in touch with us",
    },
  ],
});
