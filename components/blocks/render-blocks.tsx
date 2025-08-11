import type { Page } from '@/payload-types';

import { CallToAction } from '@/components/blocks/call-to-action';
import { ColumnSection } from '@/components/blocks/column-section';
import { ContactForm } from '@/components/blocks/contact-form';
import { Media } from '@/components/blocks/media';
import { Section } from '@/components/blocks/section';
import { TwinLists } from '@/components/blocks/twin-lists';

const blockComponents = {
  columnSection: ColumnSection,
  callToAction: CallToAction,
  media: Media,
  twinLists: TwinLists,
  contactForm: ContactForm,
  section: Section,
};

type Props = {
  blocks: Page['blocks'][0][];
};

export const RenderBlocks = ({ blocks }: Props) => {
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

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
                <div className="my-16" key={block.id}>
                  {/** biome-ignore lint/suspicious/noExplicitAny: lazy */}
                  <Block {...(block as any)} />
                </div>
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
