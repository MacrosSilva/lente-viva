import Link from "next/link";

import type { Project } from "@/lib/data";
import { getCategory } from "@/lib/data";
import { Photo } from "./photo";

export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  const category = getCategory(project.category);

  return (
    <Link
      href={`/trabalhos/${project.slug}`}
      className="group relative block overflow-hidden bg-paper-soft"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Photo
          id={project.cover.id}
          alt={project.cover.alt}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute inset-x-0 bottom-0 translate-y-3 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/80">
            {category?.name} · {project.year}
          </p>
          <p className="mt-1 text-sm text-white">{project.location}</p>
        </div>
      </div>
      <div className="flex items-baseline justify-between gap-3 py-4">
        <h3 className="text-lg font-medium tracking-tight text-ink">{project.title}</h3>
        <span className="font-mono text-xs uppercase tracking-[0.1em] text-ink-soft">
          {project.year}
        </span>
      </div>
    </Link>
  );
}
