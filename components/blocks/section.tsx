import type { SectionBlock as SectionBlockProps } from '@/payload-types';

import { RichText } from '@/components/rich-text';

export const Section = ({ title, eyebrow, richText }: SectionBlockProps) => {
  return (
    <section className="container my-16 max-w-7xl">
      <div>
        {eyebrow && (
          <span className="scroll-m-20 text-balance font-light font-mono text-sm uppercase tracking-normal">
            {eyebrow}
          </span>
        )}
        <h2 className="max-w-2xl">{title}</h2>
      </div>
      <div className="max-w-4xl">
        {richText && <RichText data={richText} enableGutter={false} />}
      </div>
    </section>
  );
};
