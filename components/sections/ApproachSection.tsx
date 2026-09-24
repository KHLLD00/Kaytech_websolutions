import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

export default function ApproachSection() {
  return (
    <Section>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
        <SectionHeading
          eyebrow="THE KAYTECH APPROACH"
          heading="We care about how your business shows up online."
        />
        <div>
          <p className="text-body text-[var(--color-text-secondary)]">
            A website shouldn&rsquo;t exist simply because a business is
            expected to have one. It should help people understand the
            business, trust it, navigate easily, and take action. Kaytech
            balances design, functionality, and purpose in every project.
          </p>
          <div className="mt-6">
            <Button href="/about" variant="secondary">
              Learn More About Kaytech
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
