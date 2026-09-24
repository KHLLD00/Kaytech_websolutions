import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { ADDON } from "@/lib/content";

export default function AddOnsSection() {
  return (
    <Section>
      <SectionHeading eyebrow="NEED MORE?" heading="Add what your business needs." />
      <div className="kaytech-stagger mt-10 flex flex-col gap-4 sm:flex-row">
        <div className="kaytech-card-hover flex flex-1 items-center justify-between rounded-card border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
          <span className="text-body font-semibold">{ADDON.name}</span>
          <span className="text-body text-[var(--color-accent-blue)]">
            +₦{ADDON.priceNGN.toLocaleString("en-NG")}
          </span>
        </div>
        <div className="kaytech-card-hover flex flex-1 items-center rounded-card border border-[var(--color-border)] p-6">
          <p className="text-body text-[var(--color-text-secondary)]">
            Other custom requirements are discussed based on project scope.
          </p>
        </div>
      </div>
    </Section>
  );
}
