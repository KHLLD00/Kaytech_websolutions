import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

export default function IntroSection() {
  return (
    <Section>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
        <SectionHeading
          eyebrow="A BETTER DIGITAL PRESENCE"
          heading="Your website should work as hard as your business."
        />
        <div>
          <p className="text-body text-[var(--color-text-secondary)]">
            A website is often the first interaction a potential customer has
            with your business. It should communicate credibility, clarity
            and trust from the first visit, and be easy enough to use that
            visitors actually take action.
          </p>
          <div className="mt-6">
            <Button href="/about" variant="secondary">
              Discover Kaytech
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
