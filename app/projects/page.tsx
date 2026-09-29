import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/server";
import { PROJECTS } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import ProjectCard from "@/components/projects/ProjectCard";

export const metadata = buildMetadata({
  title: "Website Design Portfolio in Nigeria | Kaytech Web Solutions",
  description: "Explore selected website design and development work from Kaytech Web Solutions, including business websites, e-commerce and custom web experiences.",
  path: "/projects",
});

export default async function ProjectsPage() {
  const s = await createClient();
  const { data } = await s.from("projects").select("*").eq("is_active", true).order("display_order");

  const rows = data?.length
    ? data
    : PROJECTS.map((p, i) => ({
        id: String(i),
        name: p.title,
        description: p.description,
        category: "Website Design & Development",
        tags: p.tags.split(" · "),
        live_url: "",
        fallback_image: "",
        screenshot: "",
        slug: "",
        technologies: [],
      }));

  return (
    <main>
      <Section className="pt-8 md:pt-12">
        <SectionHeading
          eyebrow="SELECTED WORK"
          heading="Website design and development portfolio."
          description="Browse selected website concepts and projects. Each project can grow into a detailed case study as more work is published."
          level="h1"
        />
      </Section>

      <Section className="pt-0">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          {rows.map((project: any) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="rounded-container border border-[var(--color-border)] bg-[var(--color-surface)] px-8 py-14 text-center">
          <h2 className="text-h1 mx-auto max-w-[520px]">Want a website for your business?</h2>
          <div className="mt-8 flex justify-center"><Button href="/quote">Request a Website Quote</Button></div>
        </div>
      </Section>
    </main>
  );
}
