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
        <SectionHeading
          eyebrow="GET A FREE QUOTE"
          heading="Request a website design or development quote."
          description="Tell Kaytech about your business, website goals and required functionality so the right approach can be scoped for your project."
          level="h1"
        />
        <div className="mt-10 max-w-[640px]"><QuoteForm /></div>
      </Section>
    </main>
  );
}
