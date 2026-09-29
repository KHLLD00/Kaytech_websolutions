import Button from "@/components/ui/Button";
import type { ProjectTechnology } from "@/lib/project-types";

type ProjectCardData = {
  name: string; slug?: string | null; description: string; category?: string | null;
  tags?: string[] | null; screenshot?: string | null; fallback_image?: string | null;
  live_url?: string | null; technologies?: ProjectTechnology[] | null;
};

function TechLogo({ tech }: { tech: ProjectTechnology }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-1.5 text-xs font-medium text-[var(--color-text-secondary)]">
      <img src={tech.logo} alt="" aria-hidden="true" className="h-4 w-4 object-contain" loading="lazy" />
      {tech.name}
    </span>
  );
}

export default function ProjectCard({ project }: { project: ProjectCardData }) {
  const screenshot = project.screenshot || project.fallback_image;
  const slug = project.slug || encodeURIComponent(project.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-"));
  return (
    <article className="group">
      <div className="overflow-hidden rounded-card border border-[var(--color-border)] bg-[var(--color-surface)] transition-transform duration-300 group-hover:-translate-y-1">
        <div className="relative aspect-[16/10] overflow-hidden bg-[var(--color-background)]">
          {screenshot ? <img src={screenshot} alt={`${project.name} website screenshot`} className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.025]" loading="lazy" /> : <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#2563EB] to-[#7C3AED] p-8 text-center"><div><p className="text-lg font-semibold text-white">{project.name}</p><p className="mt-2 text-sm text-white/75">Project preview coming soon</p></div></div>}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/35 to-transparent" />
        </div>
        <div className="p-5 md:p-6">
          {project.category && <div className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--color-text-secondary)]">{project.category}</div>}
          <h3 className="text-h3 mt-2">{project.name}</h3>
          <p className="text-body mt-2 text-[var(--color-text-secondary)]">{project.description}</p>
          {project.technologies?.length ? <div className="mt-5 flex flex-wrap gap-2">{project.technologies.slice(0, 5).map((tech) => <TechLogo key={`${tech.name}-${tech.logo}`} tech={tech} />)}</div> : project.tags?.length ? <div className="mt-5 flex flex-wrap gap-2">{project.tags.map((tag) => <span key={tag} className="rounded-full border border-[var(--color-border)] px-3 py-1.5 text-xs text-[var(--color-text-secondary)]">{tag}</span>)}</div> : null}
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href={`/projects/${slug}`}>View Case Study</Button>
            {project.live_url && <Button href={project.live_url} variant="secondary" target="_blank" rel="noreferrer">Live Preview ↗</Button>}
          </div>
        </div>
      </div>
    </article>
  );
}