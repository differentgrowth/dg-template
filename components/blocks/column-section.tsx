import type { ColumnSectionBlock as ColumnSectionBlockProps } from '@/payload-types';

import { CMSLink } from '@/components/blocks/cms-link';
import { RichText } from '@/components/rich-text';
import { cn } from '@/lib/utils';

export const ColumnSection = ({ columns }: ColumnSectionBlockProps) => {
  return (
    <section className="container my-16 max-w-7xl">
      <div className="grid grid-cols-4 gap-x-16 gap-y-8 lg:grid-cols-12">
        {columns &&
          columns.length > 0 &&
          columns.map(({ enableLink, link, richText, size, id }) => {
            return (
              <div
                className={cn('col-span-4', {
                  'md:col-span-2': size !== 'full',
                  'lg:col-span-full': size === 'full',
                  'lg:col-span-6': size === 'half',
                  'lg:col-span-4': size === 'oneThird',
                  'lg:col-span-8': size === 'twoThirds',
                })}
                key={id}
              >
                {richText && <RichText data={richText} enableGutter={false} />}

                {enableLink && <CMSLink {...link} />}
              </div>
            );
          })}
      </div>
    </section>
  );
};
