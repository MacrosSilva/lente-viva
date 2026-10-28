import Link from "next/link";

import type { Project } from "@/lib/data";
import { getCategory } from "@/lib/data";
import { Photo } from "./photo";

// One frame of the contact sheet: the cover, then its hour, title and category.
export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  const category = getCategory(project.category);

  return (
    <Link href={`/trabalhos/${project.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-paper-2">
        <Photo
          id={project.cover.id}
          alt={project.cover.alt}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <p className="mt-4 text-[length:var(--step-small)]">
        {project.hour}, {category?.name}, {project.year}
      </p>
      <h3 className="font-display mt-1 text-[length:var(--step-lead)] transition-opacity group-hover:opacity-70">
        {project.title}
      </h3>
    </Link>
  );
}
