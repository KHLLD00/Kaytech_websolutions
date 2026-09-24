import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { ABOUT_CONTENT } from "@/lib/content";

export const metadata: Metadata = {
  title: "About — Kaytech Web Solutions",
  description:
    "Kaytech Web Solutions is run by a Nigerian designer and developer who builds websites end to end, for clients in Nigeria and internationally.",
};

export default function AboutPage() {
  return (
    <main>
      <Section className="pt-8 md:pt-12">
        <SectionHeading
          eyebrow={ABOUT_CONTENT.eyebrow}
          heading={ABOUT_CONTENT.heading}
          description={ABOUT_CONTENT.intro}
          level="h1"
        />
        <div className="mt-10 flex max-w-[680px] flex-col gap-5">
          {ABOUT_CONTENT.paragraphs.map((p) => (
            <p key={p} className="text-body text-[var(--color-text-secondary)]">
              {p}
            </p>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {ABOUT_CONTENT.values.map((value) => (
            <div key={value.title}>
              <h3 className="text-h3">{value.title}</h3>
              <p className="text-body mt-2 text-[var(--color-text-secondary)]">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="rounded-container border border-[var(--color-border)] bg-[var(--color-surface)] px-8 py-14 text-center">
          <h2 className="text-h1 mx-auto max-w-[520px]">
            Have a project in mind?
          </h2>
          <div className="mt-8 flex justify-center">
            <Button href="/quote">Get a Free Quote</Button>
          </div>
        </div>
      </Section>
    </main>
  );
}
