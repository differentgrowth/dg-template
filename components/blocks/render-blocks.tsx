import type { Page } from "@/payload-types";

import { CallToAction } from "@/components/blocks/call-to-action";
import { CardLinks } from "@/components/blocks/card-links";
import { CardList } from "@/components/blocks/card-list";
import { ColumnSection } from "@/components/blocks/column-section";
import { Comparison } from "@/components/blocks/comparison";
import { ContactForm } from "@/components/blocks/contact-form";
import { DescriptionList } from "@/components/blocks/description-list";
import { EmbedMap } from "@/components/blocks/embed-map";
import { Faqs } from "@/components/blocks/faqs";
import { FeaturedPosts } from "@/components/blocks/featured-posts";
import { Gallery } from "@/components/blocks/gallery";
import { LatestPosts } from "@/components/blocks/latest-posts";
import { Marquee } from "@/components/blocks/marquee";
import { Media } from "@/components/blocks/media";
import { TeamSection } from "@/components/blocks/team-section";
import { Testimonials } from "@/components/blocks/testimonials";

const blockComponents = {
  callToAction: CallToAction,
  cardLinks: CardLinks,
  cardList: CardList,
  columnSection: ColumnSection,
  comparison: Comparison,
  contactForm: ContactForm,
  descriptionList: DescriptionList,
  embedMap: EmbedMap,
  faqs: Faqs,
  featuredPosts: FeaturedPosts,
  gallery: Gallery,
  latestPosts: LatestPosts,
  marquee: Marquee,
  media: Media,
  teamSection: TeamSection,
  testimonials: Testimonials,
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
              // biome-ignore lint/suspicious/noExplicitAny: lazy
              return <Block {...(block as any)} key={block.id} />;
            }
          }
          return null;
        })}
      </>
    );
  }

  return null;
};
