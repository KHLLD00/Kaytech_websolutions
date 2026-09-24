import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/server";

function DigitalHeroVisual() {
  return (
    <div className="kaytech-hero-visual relative mx-auto aspect-square w-full max-w-[520px] overflow-hidden rounded-[32px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_45%,rgba(79,124,255,.22),transparent_34%),radial-gradient(circle_at_72%_68%,rgba(155,108,255,.16),transparent_32%)]" />
      <div className="kaytech-grid absolute inset-0 opacity-50" />

      <div className="kaytech-orbit kaytech-orbit-one absolute left-1/2 top-1/2 h-[62%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-[38%] border border-[var(--color-accent-blue)]/30" />
      <div className="kaytech-orbit kaytech-orbit-two absolute left-1/2 top-1/2 h-[76%] w-[42%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-[var(--color-accent-violet)]/25" />
      <div className="kaytech-orbit kaytech-orbit-three absolute left-1/2 top-1/2 h-[42%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-[var(--color-accent-cyan)]/20" />

      <div className="kaytech-glow absolute left-1/2 top-1/2 h-[48%] w-[48%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-accent-blue)]/20 blur-3xl" />

      <div className="kaytech-core absolute left-1/2 top-1/2 h-[38%] w-[38%] -translate-x-1/2 -translate-y-1/2 rounded-[28%] border border-white/20 bg-gradient-to-br from-[var(--color-accent-blue)]/80 via-[var(--color-accent-violet)]/55 to-[var(--color-accent-cyan)]/50 shadow-[0_0_70px_rgba(79,124,255,.28)] backdrop-blur-xl">
        <div className="absolute inset-[12%] rounded-[24%] border border-white/20 bg-black/10" />
        <div className="absolute left-[28%] top-[28%] h-3 w-3 rounded-full bg-white/80 shadow-[0_0_20px_rgba(255,255,255,.8)]" />
        <div className="absolute bottom-[26%] right-[24%] h-2 w-2 rounded-full bg-[var(--color-accent-cyan)] shadow-[0_0_18px_rgba(34,211,238,.9)]" />
      </div>

      <span className="absolute left-[18%] top-[27%] h-2 w-2 rounded-full bg-[var(--color-accent-cyan)] shadow-[0_0_16px_rgba(34,211,238,.8)]" />
      <span className="absolute right-[17%] top-[34%] h-1.5 w-1.5 rounded-full bg-[var(--color-accent-violet)] shadow-[0_0_14px_rgba(155,108,255,.9)]" />
      <span className="absolute bottom-[23%] left-[24%] h-1.5 w-1.5 rounded-full bg-[var(--color-accent-blue)] shadow-[0_0_14px_rgba(79,124,255,.9)]" />
    </div>
  );
}

export default async function HeroSection() {
  const s = await createClient();
  const { data } = await s
    .from("site_content")
    .select("content_key,value")
    .eq("section", "hero");

  const c = Object.fromEntries((data ?? []).map((x) => [x.content_key, x.value]));

  return (
    <section className="pt-8 pb-16 md:pt-16 md:pb-24">
      <Container>
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-8">
          <div>
            <p className="text-support font-semibold tracking-wide text-[var(--color-accent-blue)]">
              {c.eyebrow || "WEB DESIGN & DEVELOPMENT"}
            </p>
            <h1 className="text-hero mt-4">
              {c.heading || "Websites built to move your business forward."}
            </h1>
            <p className="text-body mt-6 max-w-[480px] text-[var(--color-text-secondary)]">
              {c.description ||
                "We design and build modern, high-performing websites that help businesses look credible, connect with their audience, and grow online."}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={c.primary_cta_link || "/quote"}>
                {c.primary_cta_text || "Get a Free Quote"}
              </Button>
              <Button href={c.secondary_cta_link || "/projects"} variant="secondary">
                {c.secondary_cta_text || "View Our Projects"}
              </Button>
            </div>

            <p className="text-support mt-6 text-[var(--color-text-secondary)]">
              {c.supporting_text || "From idea to launch — we handle the digital side."}
            </p>
          </div>

          <div className="order-first md:order-last">
            <DigitalHeroVisual />
          </div>
        </div>
      </Container>
    </section>
  );
}
