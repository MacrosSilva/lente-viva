import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { GalleryGrid } from "@/components/site/gallery-grid";
import { Photo } from "@/components/site/photo";
import { Reveal } from "@/components/site/reveal";
import { getAdjacentProjects, getCategory, getProject, projects } from "@/lib/data";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} · Lente Viva`,
    description: project.summary,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const category = getCategory(project.category);
  const { prev, next } = getAdjacentProjects(project.slug);

  return (
    <main>
      <section className="relative flex h-[70vh] min-h-[440px] items-end overflow-hidden bg-ink">
        <Photo
          id={project.cover.id}
          alt={project.cover.alt}
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/30" />
        <div className="relative mx-auto w-full max-w-6xl px-5 pb-14 pt-32 sm:px-8">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-white/75">
              {category?.name}
            </p>
            <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tighter text-white md:text-5xl">
              {project.title}
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-16">
          <Reveal>
            <div className="space-y-4">
              {project.description.map((paragraph, i) => (
                <p key={i} className="max-w-[65ch] text-base leading-relaxed text-ink-soft">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={100}>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-5 border-t border-line pt-6 text-sm lg:grid-cols-1 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <div>
                <dt className="font-mono text-xs uppercase tracking-[0.1em] text-ink-soft">Ano</dt>
                <dd className="mt-1 text-ink">{project.year}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-[0.1em] text-ink-soft">
                  Local
                </dt>
                <dd className="mt-1 text-ink">{project.location}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-[0.1em] text-ink-soft">
                  Cliente
                </dt>
                <dd className="mt-1 text-ink">{project.client}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-[0.1em] text-ink-soft">
                  Equipamento
                </dt>
                <dd className="mt-1 text-ink">{project.camera}</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <GalleryGrid images={project.images} />
        </div>
      </section>

      <section className="border-t border-line px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {prev ? (
            <Link
              href={`/trabalhos/${prev.slug}`}
              className="group flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-ink"
            >
              <span aria-hidden="true" className="transition-transform group-hover:-translate-x-1">
                ←
              </span>
              <span>
                <span className="block text-xs text-ink-soft">Anterior</span>
                {prev.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/trabalhos/${next.slug}`}
              className="group flex items-center gap-2 text-right text-sm text-ink-soft transition-colors hover:text-ink"
            >
              <span>
                <span className="block text-xs text-ink-soft">Próximo</span>
                {next.title}
              </span>
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          ) : (
            <span />
          )}
        </div>
      </section>
    </main>
  );
}
