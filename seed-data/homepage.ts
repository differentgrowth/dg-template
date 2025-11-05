import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

export const homepageData = (
  setRichText: (text: string) => SerializedEditorState<SerializedLexicalNode>
) => ({
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
  ],
});
