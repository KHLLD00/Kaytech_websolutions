import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/server";
import type { ProjectRecord } from "@/lib/project-types";

type Props = { params: Promise<{ slug: string }> };

async function getProject(slug: string): Promise<ProjectRecord | null> {
  const supabase = await createClient();
  const { data } = await supabase.from("projects").select("*").eq("slug", slug).eq("is_active", true).maybeSingle();
  return data as ProjectRecord | null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Project Not Found | Kaytech Web Solutions" };
  return {
    title: project.name + " — Case Study | Kaytech Web Solutions",
    description: project.overview || project.description,
    alternates: { canonical: "/projects/" + project.slug },
    openGraph: { title: project.name + " — Case Study", description: project.overview || project.description },
  };
}

function Technology({ name, logo, usage }: { name: string; logo: string; usage: string }) {
  return <div className="rounded-card border border-[var(--color-border)] bg-[var(--color-surface)] p-4"><div className="flex items-center gap-3"><img src={logo} alt="" className="h-8 w-8 object-contain" /><div><p className="font-semibold">{name}</p>{usage && <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{usage}</p>}</div></div></div>;
}

export default async function ProjectCaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const screenshot = project.screenshot || project.fallback_image;
  const role = project.role ?? [];
  const technologies = project.technologies ?? [];
  const features = project.features ?? [];
  const process = project.process ?? [];
  const tags = project.tags ?? [];

  return (
    <main>
      <Section className="pb-10 pt-8 md:pb-14 md:pt-16">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-accent-blue)]">{project.category}</p>
          <h1 className="text-display mt-4">{project.name}</h1>
          <p className="text-body mt-5 max-w-3xl text-[var(--color-text-secondary)]">{project.overview || project.description}</p>
          <div className="mt-7 flex flex-wrap gap-3">{project.live_url && <Button href={project.live_url} target="_blank" rel="noreferrer">Live Preview ↗</Button>}{project.github_url && <Button href={project.github_url} variant="secondary" target="_blank" rel="noreferrer">View GitHub ↗</Button>}</div>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 border-t border-[var(--color-border)] pt-6 text-sm">
            {project.year && <div><span className="text-[var(--color-text-secondary)]">Year</span><p className="mt-1 font-semibold">{project.year}</p></div>}
            {role.length > 0 && <div><span className="text-[var(--color-text-secondary)]">Role</span><p className="mt-1 font-semibold">{role.join(" · ")}</p></div>}
            {tags.length > 0 && <div><span className="text-[var(--color-text-secondary)]">Type</span><p className="mt-1 font-semibold">{tags.join(" · ")}</p></div>}
          </div>
        </div>
      </Section>

      {screenshot && <Section className="pt-0"><div className="overflow-hidden rounded-container border border-[var(--color-border)] bg-[var(--color-surface)]"><img src={screenshot} alt={project.name + " website"} className="w-full object-cover object-top" /></div></Section>}

      <Section className="pt-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div><p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-accent-blue)]">Overview</p><h2 className="text-h1 mt-3">The project</h2><p className="text-body mt-5 text-[var(--color-text-secondary)]">{project.overview || project.description}</p></div>
          <div className="rounded-card border border-[var(--color-border)] bg-[var(--color-surface)] p-6"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-accent-blue)]">Challenge</p><p className="text-body mt-4 text-[var(--color-text-secondary)]">{project.challenge || "Project challenge details will be added here."}</p></div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 md:grid-cols-2">
          <div><p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-accent-blue)]">Solution</p><h2 className="text-h1 mt-3">How it was approached</h2><p className="text-body mt-5 text-[var(--color-text-secondary)]">{project.solution || "Solution details will be added here."}</p></div>
          <div><p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-accent-blue)]">Features</p><ul className="mt-5 space-y-3">{features.length ? features.map((item) => <li key={item} className="rounded-ui border border-[var(--color-border)] p-4">{item}</li>) : <li className="text-[var(--color-text-secondary)]">Feature details will be added here.</li>}</ul></div>
        </div>
      </Section>

      {technologies.length > 0 && <Section><p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-accent-blue)]">Tech Stack</p><h2 className="text-h1 mt-3">Tools used to build it</h2><div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{technologies.map((tech) => <Technology key={tech.name + tech.logo} {...tech} />)}</div></Section>}

      {process.length > 0 && <Section><p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-accent-blue)]">Process</p><h2 className="text-h1 mt-3">From idea to launch</h2><div className="mt-8 grid gap-4 md:grid-cols-2">{process.map((step, index) => <div key={index + "-" + step} className="rounded-card border border-[var(--color-border)] p-6"><span className="text-sm font-semibold text-[var(--color-accent-blue)]">{String(index + 1).padStart(2, "0")}</span><p className="mt-3 text-body">{step}</p></div>)}</div></Section>}

      <Section><div className="rounded-container border border-[var(--color-border)] bg-[var(--color-surface)] p-7 md:p-10"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-accent-blue)]">Outcome</p><h2 className="text-h1 mt-3">The result</h2><p className="text-body mt-5 max-w-3xl text-[var(--color-text-secondary)]">{project.outcome || "Project outcome details will be added here."}</p></div></Section>

      <Section className="pt-0"><div className="flex flex-wrap items-center justify-between gap-5 border-t border-[var(--color-border)] pt-8"><Button href="/projects" variant="secondary">← Back to Projects</Button>{project.live_url && <Button href={project.live_url} target="_blank" rel="noreferrer">Visit Live Website ↗</Button>}</div></Section>
    </main>
  );
}