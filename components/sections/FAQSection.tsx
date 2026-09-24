"use client";

import { useState } from "react";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { FAQS } from "@/lib/content";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section>
      <SectionHeading eyebrow="QUESTIONS" heading="Frequently asked questions." />
      <div className="mt-10 flex flex-col divide-y divide-[var(--color-border)] border-t border-b border-[var(--color-border)]">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={faq.question}>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 py-5 text-left min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-blue)]"
              >
                <span className="text-body font-semibold">{faq.question}</span>
                <span
                  className={`shrink-0 text-[var(--color-text-secondary)] transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>
              {isOpen && (
                <p className="text-body pb-5 text-[var(--color-text-secondary)]">
                  {faq.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </Section>
  );
}
