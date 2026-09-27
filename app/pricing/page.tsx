import PricingSection from "@/components/sections/PricingSection";
import AddOnsSection from "@/components/sections/AddOnsSection";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Website Design Pricing in Nigeria | Kaytech Web Solutions",
  description: "View Kaytech Web Solutions website packages and pricing for businesses looking for a professional online presence in Nigeria.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <main>
      <Section className="pt-8 md:pt-12">
        <div className="mx-auto max-w-[760px] text-center">
          <p className="text-support font-semibold tracking-wide text-[var(--color-accent-blue)]">WEBSITE PRICING</p>
          <h1 className="text-h1 mt-3">Website design and development pricing in Nigeria.</h1>
          <p className="text-body mt-4 text-[var(--color-text-secondary)]">
            Choose a package based on the type of website and functionality your business needs.
          </p>
        </div>
      </Section>
      <PricingSection />
      <AddOnsSection />
      <Section className="pt-0">
        <div className="text-center">
          <h2 className="text-h2">Need something outside these packages?</h2>
          <p className="text-body mx-auto mt-3 max-w-[560px] text-[var(--color-text-secondary)]">
            Custom website requirements can be discussed and scoped separately.
          </p>
          <div className="mt-6 flex justify-center"><Button href="/quote">Request a Quote</Button></div>
        </div>
      </Section>
    </main>
  );
}
