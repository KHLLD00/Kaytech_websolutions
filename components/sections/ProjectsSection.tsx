import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { createClient } from "@/lib/supabase/server";
import { PROJECTS } from "@/lib/content";
import ProjectCard from "@/components/projects/ProjectCard";

export default async function ProjectsSection() {
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
    <Section id="projects">
      <SectionHeading
        eyebrow="SELECTED WORK"
        heading="Websites designed and developed for real businesses."
        description="Explore selected work through focused case studies, with a direct link to each live website where available."
      />
      <div className="kaytech-stagger mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
        {rows.map((project: any) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
  );
}
