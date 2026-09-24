import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { SERVICES } from "@/lib/content";

export default function ServicesSection() {
  return (
    <Section id="services">
      <SectionHeading
        eyebrow="WHAT WE DO"
        heading="Digital solutions built around your business."
      />
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {SERVICES.map((service) => (
          <div
            key={service.number}
            className="rounded-card border border-[var(--color-border)] bg-[var(--color-surface)] p-6"
          >
            <span className="text-support font-semibold text-[var(--color-text-secondary)]">
              {service.number}
            </span>
            <h3 className="text-h3 mt-3">{service.title}</h3>
            <p className="text-body mt-2 text-[var(--color-text-secondary)]">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
