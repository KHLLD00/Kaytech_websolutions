import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/server";

export default async function HeroSection() {
  const s = await createClient();
  const { data } = await s.from("site_content").select("content_key,value").eq("section", "hero");
  const c = Object.fromEntries((data ?? []).map((x) => [x.content_key, x.value]));
  const desktopImage = c.desktop_image;
  const mobileImage = c.mobile_image;

  return (
    <section className="pt-8 pb-16 md:pt-16 md:pb-24">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-8">
          <div>
            <p className="text-support font-semibold tracking-wide text-[var(--color-accent-blue)]">{c.eyebrow || "WEB DESIGN & DEVELOPMENT"}</p>
            <h1 className="text-hero mt-4">{c.heading || "Websites built to move your business forward."}</h1>
            <p className="text-body mt-6 max-w-[480px] text-[var(--color-text-secondary)]">{c.description || "We design and build modern, high-performing websites that help businesses look credible, connect with their audience, and grow online."}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={c.primary_cta_link || "/quote"}>{c.primary_cta_text || "Get a Free Quote"}</Button>
              <Button href={c.secondary_cta_link || "/projects"} variant="secondary">{c.secondary_cta_text || "View Our Projects"}</Button>
            </div>
            <p className="text-support mt-6 text-[var(--color-text-secondary)]">{c.supporting_text || "From idea to launch — we handle the digital side."}</p>
          </div>
          <div className="order-first md:order-last">
            {desktopImage || mobileImage ? (
              <div className="mx-auto w-full max-w-[520px]">
                {mobileImage && <img src={mobileImage} alt="Kaytech Web Solutions" className="block aspect-[4/3] w-full rounded-card object-cover md:hidden" />}
                {desktopImage && <img src={desktopImage} alt="Kaytech Web Solutions" className={mobileImage ? "hidden md:block" : "block"} />
                }
              </div>
            ) : (
              <div className="mx-auto aspect-[4/3] w-full max-w-[520px] rounded-card border border-[var(--color-border)] bg-gradient-to-br from-[#2563EB]/20 via-[var(--color-surface)] to-[#7C3AED]/20" />
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}