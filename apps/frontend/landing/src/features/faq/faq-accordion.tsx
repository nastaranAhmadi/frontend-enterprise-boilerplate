'use client';

import { Accordion } from '@enterprise/ui';

export type FaqAccordionItem = {
  id: string;
  question: string;
  answer: string;
};

type FaqAccordionProps = {
  items: readonly FaqAccordionItem[];
};

/** Single-column FAQ list — questions lead; chrome stays quiet. */
export const FaqAccordion = ({ items }: FaqAccordionProps) => (
  <Accordion.Group className="rounded-none border-x-0 bg-transparent shadow-none">
    {items.map((item) => (
      <Accordion key={item.id} headingAs="h2">
        <Accordion.Summary className="py-lg text-lg font-medium text-foreground md:py-xl md:text-xl">
          {item.question}
        </Accordion.Summary>
        <Accordion.Details className="pb-lg text-base leading-relaxed text-muted-foreground md:pb-xl">
          {item.answer}
        </Accordion.Details>
      </Accordion>
    ))}
  </Accordion.Group>
);
