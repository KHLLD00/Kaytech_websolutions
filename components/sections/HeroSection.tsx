import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/server";

export default async function HeroSection() {
  const s = await createClient();
  const { data } = await s
    .from("site_content")
    .select("content_key,value")
    .eq("section", "hero");

  const c = Object.fromEntries((data ?? []).map((x) => [x.content_key, x.value]));

  return (
    <section className="kaytech-hero relative isolate overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 z-0">
        <div className="kaytech-hero-mesh absolute inset-0" />
        <div className="kaytech-hero-grid absolute inset-0" />
        <div className="kaytech-hero-glow kaytech-hero-glow-blue absolute left-[18%] top-[18%]" />
        <div className="kaytech-hero-glow kaytech-hero-glow-violet absolute right-[12%] top-[48%]" />
        <div className="kaytech-hero-glow kaytech-hero-glow-cyan absolute bottom-[4%] left-1/2" />
        <div className="kaytech-hero-sheen absolute inset-0" />
      </div>

      <Container>
        <div className="relative z-10 flex min-h-[calc(100vh-6rem)] items-center justify-center py-20 sm:py-24 lg:min-h-[78vh] lg:py-28">
          <div className="mx-auto w-full max-w-[920px] text-center">
            <p className="text-support font-semibold tracking-[0.16em] text-[var(--color-accent-blue)]">
              {c.eyebrow || "WEB DESIGN & DEVELOPMENT"}
            </p>

            <h1 className="text-hero mx-auto mt-5 max-w-[900px] text-balance">
              {c.heading || "Modern websites for businesses in Nigeria."}
            </h1>

            <p className="text-body mx-auto mt-6 max-w-[680px] text-[var(--color-text-secondary)]">
              {c.description ||
                "Kaytech Web Solutions designs and develops modern, responsive websites for businesses in Nigeria and beyond, with a focus on clear design, strong user experience, and practical business goals."}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href={c.primary_cta_link || "/quote"}>
                {c.primary_cta_text || "Get a Free Quote"}
              </Button>
              <Button href={c.secondary_cta_link || "/projects"} variant="secondary">
                {c.secondary_cta_text || "View Our Projects"}
              </Button>
            </div>

            <p className="text-support mt-6 text-[var(--color-text-secondary)]">
              {c.supporting_text || "Web design and development from idea to launch."}
            </p>

            <div aria-hidden="true" className="kaytech-hero-mark mx-auto mt-10 h-px w-24" />
          </div>
        </div>
      </Container>
    </section>
  );
}
