"use client";

import type { ProjectTechnology } from "@/lib/project-types";

export const TECHNOLOGY_OPTIONS: ProjectTechnology[] = [
  { name: "Next.js", logo: "https://cdn.simpleicons.org/nextdotjs", usage: "Framework" },
  { name: "React", logo: "https://cdn.simpleicons.org/react", usage: "UI library" },
  { name: "TypeScript", logo: "https://cdn.simpleicons.org/typescript", usage: "Language" },
  { name: "JavaScript", logo: "https://cdn.simpleicons.org/javascript", usage: "Language" },
  { name: "Tailwind CSS", logo: "https://cdn.simpleicons.org/tailwindcss", usage: "Styling" },
  { name: "HTML5", logo: "https://cdn.simpleicons.org/html5", usage: "Markup" },
  { name: "CSS3", logo: "https://cdn.simpleicons.org/css3", usage: "Styling" },
  { name: "Supabase", logo: "https://cdn.simpleicons.org/supabase", usage: "Backend / database" },
  { name: "PostgreSQL", logo: "https://cdn.simpleicons.org/postgresql", usage: "Database" },
  { name: "Figma", logo: "https://cdn.simpleicons.org/figma", usage: "UI/UX design" },
  { name: "GitHub", logo: "https://cdn.simpleicons.org/github", usage: "Code hosting" },
  { name: "Vercel", logo: "https://cdn.simpleicons.org/vercel", usage: "Deployment" },
  { name: "Netlify", logo: "https://cdn.simpleicons.org/netlify", usage: "Deployment" },
  { name: "Node.js", logo: "https://cdn.simpleicons.org/nodedotjs", usage: "Runtime" },
  { name: "Framer Motion", logo: "https://cdn.simpleicons.org/framer", usage: "Animation" },
  { name: "Stripe", logo: "https://cdn.simpleicons.org/stripe", usage: "Payments" },
];

type Props = {
  value: ProjectTechnology[];
  onChange: (value: ProjectTechnology[]) => void;
};

export default function TechnologyPicker({ value, onChange }: Props) {
  const selected = new Set((value ?? []).map((item) => item.name));

  const toggle = (tech: ProjectTechnology) => {
    if (selected.has(tech.name)) {
      onChange((value ?? []).filter((item) => item.name !== tech.name));
    } else {
      onChange([...(value ?? []), tech]);
    }
  };

  return (
    <div className="md:col-span-2">
      <div className="mb-3">
        <p className="text-sm font-medium">Technology stack</p>
        <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
          Tick the technologies used for this project. Their logos and details are saved automatically.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {TECHNOLOGY_OPTIONS.map((tech) => {
          const isSelected = selected.has(tech.name);
          return (
            <label
              key={tech.name}
              className={[
                "flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-colors",
                isSelected
                  ? "border-[var(--color-accent-blue)] bg-[var(--color-accent-blue)]/10"
                  : "border-[var(--color-border)] bg-[var(--color-bg)] hover:border-[var(--color-accent-blue)]/50",
              ].join(" ")}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggle(tech)}
                className="h-4 w-4 accent-[var(--color-accent-blue)]"
              />
              <img src={tech.logo} alt="" className="h-7 w-7 object-contain" />
              <span className="min-w-0">
                <span className="block text-sm font-medium">{tech.name}</span>
                <span className="block text-xs text-[var(--color-text-secondary)]">{tech.usage}</span>
              </span>
            </label>
          );
        })}
      </div>

      {!!value?.length && (
        <p className="mt-3 text-xs text-[var(--color-text-secondary)]">
          {value.length} {value.length === 1 ? "technology" : "technologies"} selected.
        </p>
      )}
    </div>
  );
}
