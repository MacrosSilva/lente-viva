"use client";

import { useMemo, useState } from "react";

import { categories, projects } from "@/lib/data";
import { ProjectCard } from "./project-card";

const ALL = "todos";

export function TrabalhosGallery() {
  const [active, setActive] = useState<string>(ALL);

  const visible = useMemo(
    () => (active === ALL ? projects : projects.filter((p) => p.category === active)),
    [active],
  );

  const filters = [{ slug: ALL, name: "Todos" }, ...categories];

  return (
    <>
      <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoria">
        {filters.map((f) => {
          const on = active === f.slug;
          return (
            <button
              key={f.slug}
              type="button"
              aria-pressed={on}
              onClick={() => setActive(f.slug)}
              className={`h-11 flex-shrink-0 px-5 text-[length:var(--step-small)] font-medium transition-[background-color,color,transform] active:scale-[0.97] ${
                on ? "bg-ink text-paper" : "bg-surface text-ink hover:bg-paper"
              }`}
            >
              {f.name}
            </button>
          );
        })}
      </div>

      <ul className="mt-12 grid gap-x-3 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project, i) => (
          <li key={project.slug} className="pf-reveal" style={{ animationDelay: `${Math.min(i, 6) * 60}ms` }}>
            <ProjectCard project={project} priority={i < 3} />
          </li>
        ))}
      </ul>
    </>
  );
}
