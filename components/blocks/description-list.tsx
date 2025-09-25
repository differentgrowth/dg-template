import type { DescriptionListBlock as DescriptionListBlockProps } from "@/payload-types";

import { RichText } from "@/components/rich-text";
import { cn } from "@/lib/utils";

type Props = DescriptionListBlockProps & {
  className?: string;
};

export function DescriptionList({ title, subtitle, items, className }: Props) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className={cn("px-6 py-16", className)}>
      <div className="mx-auto max-w-4xl">
        {(title || subtitle) && (
          <div className="prose prose-lg dark:prose-invert mb-12 text-center">
            {title && <h2 className="mb-4">{title}</h2>}
            {subtitle && (
              <p className="mx-auto max-w-2xl text-muted-foreground">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <dl className="space-y-8">
          {items.map((item) => (
            <div
              className="prose dark:prose-invert border-border border-l-2 pl-6 transition-colors hover:border-primary/50"
              key={item.id}
            >
              <dt className="mb-3">{item.title}</dt>
              <dd className="dark:prose-invert max-w-none text-muted-foreground">
                <RichText data={item.content} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
