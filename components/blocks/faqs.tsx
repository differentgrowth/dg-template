import type { FaqsBlock as FaqsBlockProps } from "@/payload-types";

import { RichText } from "@/components/rich-text";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

type Props = FaqsBlockProps & {
  className?: string;
};

export function Faqs({ title, subtitle, items, className }: Props) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className={cn("px-6 py-16", className)}>
      <div className="mx-auto max-w-4xl">
        {(title || subtitle) && (
          <div className="mb-12 text-center">
            {title && (
              <h2 className="mb-4 font-bold text-3xl text-foreground tracking-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <Accordion
          className="space-y-4"
          collapsible
          indicator="plus"
          type="single"
          variant="outline"
        >
          {items.map((item) => (
            <AccordionItem key={item.id} value={`faq-${item.id}`}>
              <AccordionTrigger className="text-left font-semibold text-base hover:text-primary">
                {item.question}
              </AccordionTrigger>
              <AccordionContent>
                <div className="prose dark:prose-invert max-w-none text-muted-foreground">
                  <RichText data={item.answer} />
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
