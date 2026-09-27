import Link from "next/link";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

type ServiceLandingPageProps = {
  eyebrow: string;
  heading: string;
  intro: string;
  description: string;
  benefits: string[];
  bestFor: string[];
  related: { href: string; label: string }[];
};

export default function ServiceLandingPage({
  eyebrow,
  heading,
  intro,
  description,
  benefits,
  bestFor,
  related,
}: ServiceLandingPageProps) {
  return (
    <main>
      <Section className="pt-8 md:pt-12">
        <SectionHeading
          eyebrow={eyebrow}
          heading={heading}
          description={intro}
          level="h1"
        />
      </Section>

      <Section className="pt-0">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-h2">What this service includes</h2>
            <p className="text-body mt-4 text-[var(--color-text-secondary)]">{description}</p>
            <ul className="mt-6 flex flex-col gap-3">
              {benefits.map((benefit) => (
                <li key={benefit} className="text-body flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent-blue)]" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-card border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
            <h2 className="text-h2">Who it is for</h2>
            <ul className="mt-5 flex flex-col gap-3">
              {bestFor.map((item) => (
                <li key={item} className="text-body text-[var(--color-text-secondary)]">
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href="/quote">Request a Website Quote</Button>
            </div>
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <div className="rounded-container border border-[var(--color-border)] bg-[var(--color-surface)] px-8 py-12">
          <h2 className="text-h2">Explore related Kaytech services</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {related.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-ui border border-[var(--color-border)] px-4 py-3 text-body font-semibold hover:bg-[var(--color-bg)]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </Section>
    </main>
  );
}
