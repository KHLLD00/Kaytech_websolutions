import { createClient } from "@/lib/supabase/server";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

type Testimonial = { id: string; client_name: string; company: string; role: string | null; content: string; rating: number; photo_url: string | null; project?: { name: string } | null; };

export default async function TestimonialsSection() {
  const supabase = await createClient();
  const { data } = await supabase.from("testimonials").select("id,client_name,company,role,content,rating,photo_url,projects(name)").eq("status", "published").order("featured", { ascending: false }).order("created_at", { ascending: false });
  const testimonials = (data ?? []) as unknown as Testimonial[];
  if (!testimonials.length) return null;
  return (
    <Section id="testimonials">
      <SectionHeading eyebrow="CLIENT FEEDBACK" heading="What clients say about working with Kaytech." />
      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((item) => (
          <article key={item.id} className="kaytech-card-hover rounded-card border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
            <div className="flex items-center justify-between gap-4">
              <div className="text-sm tracking-[0.18em] text-[var(--color-accent-blue)]" aria-label={item.rating + " out of 5 stars"}>{"★".repeat(Math.max(0, Math.min(5, item.rating)))}</div>
              {item.photo_url ? <img src={item.photo_url} alt="" className="h-10 w-10 rounded-full object-cover" /> : null}
            </div>
            <blockquote className="text-body mt-5 text-[var(--color-text-secondary)]">“{item.content}”</blockquote>
            <div className="mt-6"><p className="font-semibold">{item.client_name}</p><p className="text-support text-[var(--color-text-secondary)]">{[item.role, item.company].filter(Boolean).join(", ")}</p>{item.project?.name ? <p className="mt-2 text-xs text-[var(--color-text-secondary)]">Project: {item.project.name}</p> : null}</div>
          </article>
        ))}
      </div>
    </Section>
  );
}