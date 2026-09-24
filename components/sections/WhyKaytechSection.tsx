import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { WHY_KAYTECH } from "@/lib/content";

export default function WhyKaytechSection() {
  return (
    <Section>
      <SectionHeading
        eyebrow="WHY KAYTECH"
        heading="Professional websites, built around what your business needs."
      />
      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
        {WHY_KAYTECH.map((item) => (
          <div key={item.title}>
            <h3 className="text-h3">{item.title}</h3>
            <p className="text-body mt-2 text-[var(--color-text-secondary)]">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
