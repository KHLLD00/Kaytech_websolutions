import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import QuoteForm from "@/components/quote/QuoteForm";

export const metadata: Metadata = {
  title: "Get a Free Quote — Kaytech Web Solutions",
  description: "Tell us about your project and get a clear, straightforward quote.",
};

export default function QuotePage() {
  return (
    <main>
      <Section className="pt-8 md:pt-12">
        <SectionHeading
          eyebrow="GET A FREE QUOTE"
          heading="Tell us about your project."
          description="Fill in a few details and we'll follow up with a clear quote for the right package."
          level="h1"
        />
        <div className="mt-10 max-w-[640px]">
          <QuoteForm />
        </div>
      </Section>
    </main>
  );
}
