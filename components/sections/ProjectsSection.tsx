import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { PROJECTS } from "@/lib/content";

const gradients = [
  "from-[#2563EB] to-[#7C3AED]",
  "from-[#7C3AED] to-[#06B6D4]",
  "from-[#06B6D4] to-[#2563EB]",
  "from-[#2563EB] to-[#06B6D4]",
];

export default function ProjectsSection() {
  return (
    <Section id="projects">
      <SectionHeading
        eyebrow="SELECTED WORK"
        heading="Good ideas deserve good execution."
      />
      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
        {PROJECTS.map((project, i) => (
          <div key={project.title} className="group">
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
            <Button href="/projects" variant="secondary" className="mt-4">
              View Project
            </Button>
          </div>
        ))}
      </div>
    </Section>
  );
}
