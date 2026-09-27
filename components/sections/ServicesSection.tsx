import Link from "next/link";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { createClient } from "@/lib/supabase/server";
import { SERVICES } from "@/lib/content";

const SERVICE_LINKS: Record<string, string> = {
  "Website Design & Development": "/services/website-design-development",
  "Business Websites": "/services/business-websites",
  "E-commerce": "/services/ecommerce",
  "Custom Web Solutions": "/services/custom-web-development",
};

export default async function ServicesSection() {
  const s = await createClient();
  const { data } = await s.from("services").select("*").eq("is_active", true).order("display_order");
  const rows = data?.length ? data : SERVICES.map((x, i) => ({ ...x, id: String(i) }));

  return (
    <Section id="services">
      <SectionHeading
        eyebrow="WHAT WE DO"
        heading="Website design and development for Nigerian businesses."
        description="Explore focused services for business websites, e-commerce stores and custom web development."
      />
      <div className="kaytech-stagger mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {rows.map((x: any) => {
          const href = SERVICE_LINKS[x.title] ?? "/services";
          return (
            <div key={x.id ?? x.number} className="kaytech-card-hover rounded-card border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
              <span className="text-support font-semibold text-[var(--color-text-secondary)]">{x.number}</span>
              <h3 className="text-h3 mt-3">{x.title}</h3>
              <p className="text-body mt-2 text-[var(--color-text-secondary)]">{x.short_description ?? x.description}</p>
              <Link
                href={href}
                className="mt-5 inline-flex text-body font-semibold text-[var(--color-accent-blue)] hover:underline"
              >
                Explore this service →
              </Link>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
