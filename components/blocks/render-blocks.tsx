import type { Page } from "@/payload-types";

const blockComponents = {
  callToAction: null,
  cardLinks: null,
  cardList: null,
  columnSection: null,
  comparison: null,
  contactForm: null,
  descriptionList: null,
  embedMap: null,
  faqs: null,
  featuredPosts: null,
  gallery: null,
  latestPosts: null,
  teamSection: null,
  testimonials: null,
};

type Props = {
  blocks: Page["blocks"];
};

export const RenderBlocks = ({ blocks }: Props) => {
  const hasBlocks = Array.isArray(blocks) && blocks.length > 0;

  if (hasBlocks) {
    return (
      <>
        {blocks.map((block) => {
          const { blockType } = block;

          if (blockType && blockType in blockComponents) {
            const Block =
              blockComponents[blockType as keyof typeof blockComponents];

            if (Block) {
              return (
                <Block
                  // biome-ignore lint/suspicious/noExplicitAny: lazy
                  {...(block as any)}
                  key={block.id}
                />
              );
            }
          }
          return null;
        })}
      </>
    );
  }

  return null;
};
