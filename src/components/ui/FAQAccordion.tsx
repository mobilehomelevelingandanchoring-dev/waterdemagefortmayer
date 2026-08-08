"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQAccordionProps {
  items: FAQItem[];
  className?: string;
}

export function FAQAccordion({ items, className }: FAQAccordionProps) {
  return (
    <Accordion.Root
      type="single"
      collapsible
      className={cn("w-full divide-y divide-gray-200", className)}
    >
      {items.map((item, index) => (
        <Accordion.Item
          key={index}
          value={`item-${index}`}
          className="group"
        >
          <Accordion.Header asChild>
            <h3>
              <Accordion.Trigger
                className={cn(
                  "flex w-full items-center justify-between gap-4",
                  "py-5 px-1 text-left",
                  "font-bold text-[#0f3460] text-base md:text-lg",
                  "transition-colors duration-150",
                  "hover:text-[#e94560]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0f3460] focus-visible:ring-offset-2 rounded",
                  "group-data-[state=open]:text-[#e94560]",
                )}
                aria-label={item.question}
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-[#0f3460]",
                    "transition-transform duration-300 ease-in-out",
                    "group-data-[state=open]:rotate-180 group-data-[state=open]:text-[#e94560]",
                  )}
                  aria-hidden="true"
                />
              </Accordion.Trigger>
            </h3>
          </Accordion.Header>

          <Accordion.Content
            className={cn(
              "overflow-hidden",
              "data-[state=open]:animate-accordion-down",
              "data-[state=closed]:animate-accordion-up",
            )}
          >
            <div
              className={cn(
                "pb-5 px-1 pt-1",
                "text-gray-600 leading-relaxed text-sm md:text-base",
                "rounded-b-md",
                "bg-gray-50 -mx-1 px-2 mb-1",
              )}
            >
              {item.answer}
            </div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
