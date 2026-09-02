"use client";

import { useMemo, useState } from "react";

import { categories, projects } from "@/lib/data";
import { ProjectCard } from "./project-card";
import { Reveal } from "./reveal";

const ALL = "todos";

export function TrabalhosGallery() {
  const [active, setActive] = useState<string>(ALL);

  const visible = useMemo(
    () => (active === ALL ? projects : projects.filter((p) => p.category === active)),
    [active],
  );

  return (
    <>
      <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-2" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={active === ALL}
          onClick={() => setActive(ALL)}
          className={`flex-shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
            active === ALL
              ? "border-ink bg-ink text-paper"
              : "border-line text-ink-soft hover:border-line-strong hover:text-ink"
          }`}
        >
          Todos
        </button>
        {categories.map((category) => (
          <button
            key={category.slug}
            type="button"
            role="tab"
            aria-selected={active === category.slug}
            onClick={() => setActive(category.slug)}
            className={`flex-shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              active === category.slug
                ? "border-ink bg-ink text-paper"
                : "border-line text-ink-soft hover:border-line-strong hover:text-ink"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project, i) => (
          <Reveal key={project.slug} delay={Math.min(i, 6) * 50}>
            <ProjectCard project={project} priority={i < 3} />
          </Reveal>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="py-16 text-center text-sm text-ink-soft">
          Nenhum projeto nesta categoria ainda.
        </p>
      )}
    </>
  );
}
