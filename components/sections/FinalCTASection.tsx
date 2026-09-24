import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";

export default function FinalCTASection() {
  return (
    <Section>
      <div className="rounded-container border border-[var(--color-border)] bg-[var(--color-surface)] px-8 py-16 text-center">
        <h2 className="text-h1 mx-auto max-w-[560px]">
          Ready for a website that works as hard as you do?
        </h2>
        <p className="text-body mx-auto mt-4 max-w-[480px] text-[var(--color-text-secondary)]">
          Tell us about your business and we&rsquo;ll put together a clear,
          straightforward quote.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/quote">Get a Free Quote</Button>
          <Button href="/projects" variant="secondary">
            View Our Projects
          </Button>
        </div>
      </div>
    </Section>
  );
}
