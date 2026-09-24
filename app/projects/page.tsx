import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { PROJECTS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects — Kaytech Web Solutions",
  description: "A look at the kind of websites Kaytech builds.",
};

const gradients = [
  "from-[#2563EB] to-[#7C3AED]",
  "from-[#7C3AED] to-[#06B6D4]",
  "from-[#06B6D4] to-[#2563EB]",
  "from-[#2563EB] to-[#06B6D4]",
];

export default function ProjectsPage() {
  return (
    <main>
      <Section className="pt-8 md:pt-12">
        <SectionHeading
          eyebrow="SELECTED WORK"
          heading="Good ideas deserve good execution."
          level="h1"
        />
      </Section>

      <Section className="pt-0">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <div key={project.title}>
              <div
                className={`aspect-[16/10] rounded-card bg-gradient-to-br ${gradients[i % gradients.length]} opacity-90`}
                aria-hidden="true"
              />
              <h3 className="text-h3 mt-4">{project.title}</h3>
              <p className="text-support mt-1 text-[var(--color-text-secondary)]">
                {project.tags}
              </p>
              <p className="text-body mt-2 text-[var(--color-text-secondary)]">
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="rounded-container border border-[var(--color-border)] bg-[var(--color-surface)] px-8 py-14 text-center">
          <h2 className="text-h1 mx-auto max-w-[520px]">
            Want your business to be next?
          </h2>
          <div className="mt-8 flex justify-center">
            <Button href="/quote">Get a Free Quote</Button>
          </div>
        </div>
      </Section>
    </main>
  );
}
