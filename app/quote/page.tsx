import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import QuoteForm from "@/components/quote/QuoteForm";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Get a Website Development Quote in Nigeria | Kaytech",
  description: "Request a website design or development quote from Kaytech Web Solutions and tell us what your business needs.",
  path: "/quote",
});

export default function QuotePage() {
  return (
    <main>
      <Section className="pt-8 md:pt-12">
        <SectionHeading eyebrow="GET A FREE QUOTE" heading="Tell us about your project." description="Fill in a few details and we'll follow up with a clear quote for the right package." level="h1" />
        <div className="mt-10 max-w-[640px]"><QuoteForm /></div>
      </Section>
    </main>
  );
}
