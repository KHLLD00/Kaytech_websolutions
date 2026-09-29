"use client";

import type { ProjectTechnology } from "@/lib/project-types";
import { TECHNOLOGY_OPTIONS } from "@/lib/technologies";


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
