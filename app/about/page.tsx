import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { ABOUT_CONTENT } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About Kaytech Web Solutions | Nigerian Web Design Studio",
  description: "Learn about Kaytech Web Solutions, a Nigerian web design and development studio building modern websites for businesses in Abuja, across Nigeria and beyond.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main>
      <Section className="pt-8 md:pt-12">
        <SectionHeading
          eyebrow={ABOUT_CONTENT.eyebrow}
          heading="A Nigerian web design studio focused on useful, professional websites."
          description={ABOUT_CONTENT.intro}
          level="h1"
        />
        <div className="mt-10 flex max-w-[680px] flex-col gap-5">
          {ABOUT_CONTENT.paragraphs.map((p) => (
            <p key={p} className="text-body text-[var(--color-text-secondary)]">{p}</p>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {ABOUT_CONTENT.values.map((value) => (
            <div key={value.title}>
              <h2 className="text-h3">{value.title}</h2>
              <p className="text-body mt-2 text-[var(--color-text-secondary)]">{value.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="rounded-container border border-[var(--color-border)] bg-[var(--color-surface)] px-8 py-14 text-center">
          <h2 className="text-h1 mx-auto max-w-[520px]">Need a website for your business?</h2>
          <p className="text-body mx-auto mt-4 max-w-[520px] text-[var(--color-text-secondary)]">
            Explore the website services or request a quote for your project.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/services">Explore Web Design Services</Button>
            <Button href="/quote" variant="secondary">Get a Free Quote</Button>
          </div>
        </div>
      </Section>
    </main>
  );
}
