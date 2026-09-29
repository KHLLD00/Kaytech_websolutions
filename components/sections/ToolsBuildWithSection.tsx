import { TECHNOLOGY_OPTIONS } from "@/components/admin/TechnologyPicker";

const tools = TECHNOLOGY_OPTIONS.filter((tool) =>
  ["Next.js", "React", "TypeScript", "JavaScript", "Tailwind CSS", "Supabase", "PostgreSQL", "Figma", "Node.js", "Framer Motion", "Vercel", "GitHub"].includes(tool.name)
);

export default function ToolsBuildWithSection() {
  const items = [...tools, ...tools];

  return (
    <section className="overflow-hidden border-y border-[var(--color-border)] py-14 sm:py-16" aria-label="Tools I Build With">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-[var(--color-accent-blue)]">TOOLS I BUILD WITH</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">Modern tools. Thoughtful execution.</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-[var(--color-text-secondary)]">A flexible stack for designing, building, launching and maintaining modern websites.</p>
        </div>
      </div>
      <div className="relative mt-8 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[var(--color-bg)] to-transparent sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[var(--color-bg)] to-transparent sm:w-28" />
        <div className="tools-marquee flex w-max gap-4 pr-4 hover:[animation-play-state:paused]">
          {items.map((tool, index) => (
            <div key={tool.name + index} className="flex min-w-[150px] items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4 shadow-sm transition-transform duration-300 hover:-translate-y-1 sm:min-w-[175px]">
              <img src={tool.logo} alt="" aria-hidden="true" className="h-7 w-7 object-contain" loading="lazy" />
              <div><p className="text-sm font-semibold">{tool.name}</p><p className="mt-0.5 text-[11px] text-[var(--color-text-secondary)]">{tool.usage}</p></div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@keyframes tools-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } } .tools-marquee { animation: tools-marquee 32s linear infinite; } @media (prefers-reduced-motion: reduce) { .tools-marquee { animation: none; } }`}</style>
    </section>
  );
}
