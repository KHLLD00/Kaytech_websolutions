import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { SERVICE_DETAILS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services — Kaytech Web Solutions",
  description:
    "Website design and development, business websites, e-commerce, and custom web solutions for businesses in Nigeria and beyond.",
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  return (
    <main>
      <Section className="pt-8 md:pt-12">
        <SectionHeading
          eyebrow="WHAT WE DO"
          heading="Digital solutions built around your business."
          level="h1"
        />
      </Section>

      <Section className="pt-0">
        <div className="flex flex-col divide-y divide-[var(--color-border)] border-t border-[var(--color-border)]">
          {SERVICE_DETAILS.map((service) => (
            <div
              key={service.number}
              className="grid grid-cols-1 gap-6 py-10 md:grid-cols-[100px_1fr_1fr]"
            >
              <span className="text-h2 text-[var(--color-accent-blue)]">
                {service.number}
              </span>
              <div>
                <h3 className="text-h3">{service.title}</h3>
                <p className="text-body mt-2 text-[var(--color-text-secondary)]">
                  {service.description}
                </p>
              </div>
              <ul className="flex flex-col gap-2">
                {service.included.map((item) => (
                  <li key={item} className="text-body flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent-blue)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="rounded-container border border-[var(--color-border)] bg-[var(--color-surface)] px-8 py-14 text-center">
          <h2 className="text-h1 mx-auto max-w-[520px]">
            Not sure which service fits?
          </h2>
          <p className="text-body mx-auto mt-4 max-w-[420px] text-[var(--color-text-secondary)]">
            Tell us about your business and we&rsquo;ll recommend the right approach.
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/quote">Get a Free Quote</Button>
          </div>
        </div>
      </Section>
    </main>
  );
}
