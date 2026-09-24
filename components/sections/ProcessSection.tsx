import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { PROCESS_STEPS } from "@/lib/content";

export default function ProcessSection() {
  return (
    <Section>
      <SectionHeading eyebrow="HOW IT WORKS" heading="From idea to launch, made simple." />
      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
        {PROCESS_STEPS.map((step) => (
          <div key={step.number}>
            <span className="text-h2 text-[var(--color-accent-blue)]">{step.number}</span>
            <h3 className="text-h3 mt-2">{step.title}</h3>
            <p className="text-body mt-2 text-[var(--color-text-secondary)]">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
