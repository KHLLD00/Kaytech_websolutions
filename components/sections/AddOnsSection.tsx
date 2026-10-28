import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

export default function AddOnsSection() {
  return (
    <Section>
      <SectionHeading eyebrow="NEED MORE?" heading="Need something different?" />
      <div className="kaytech-stagger mt-10 flex flex-col gap-4 sm:flex-row">
        <div className="kaytech-card-hover flex flex-1 items-center rounded-card border border-[var(--color-border)] p-6">
          <p className="text-body text-[var(--color-text-secondary)]">
            Custom design requirements are discussed and quoted based on project scope.
          </p>
        </div>
      </div>
    </Section>
  );
}
