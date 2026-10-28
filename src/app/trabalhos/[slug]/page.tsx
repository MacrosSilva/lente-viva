import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { GalleryGrid } from "@/components/site/gallery-grid";
import { PaperHero } from "@/components/site/paper-hero";
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

  const facts = [
    { label: "Hora da luz", value: `${project.hour}, ${project.light.toLowerCase()}` },
    { label: "Local", value: project.location },
    { label: "Cliente", value: project.client },
    { label: "Equipamento", value: project.camera },
  ];

  return (
    <main>
      <PaperHero
        photo={project.cover}
        title={project.title}
        lead={project.summary}
        meta={
          <>
            {category?.name}, {project.year}
          </>
        }
      />

      <section aria-labelledby="sobre-serie" className="py-[clamp(80px,10vw,160px)]">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 id="sobre-serie" className="rise font-display text-[length:var(--step-head)]">
              Sobre a série
            </h2>
            <div className="rise mt-8 space-y-5" style={{ ["--i" as string]: 1 }}>
              {project.description.map((paragraph, i) => (
                <p key={i} className="max-w-[60ch]">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <dl
            className="rise grid content-start gap-x-8 gap-y-7 bg-paper p-7 sm:grid-cols-2 sm:p-10 lg:col-span-5 lg:col-start-8"
            style={{ ["--i" as string]: 2 }}
          >
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="text-[length:var(--step-small)] text-muted">{f.label}</dt>
                <dd className="mt-1">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="fotos" className="pb-[clamp(80px,10vw,160px)]">
        <div className="wrap">
          <h2 id="fotos" className="rise font-display mb-10 text-[length:var(--step-head)]">
            {project.images.length} fotografias
          </h2>
          <GalleryGrid images={project.images} />
        </div>
      </section>

      <nav aria-label="Outras séries" className="bg-field-2">
        <div className="wrap grid gap-6 py-14 sm:grid-cols-2">
          {prev ? (
            <Link href={`/trabalhos/${prev.slug}`} className="group block">
              <span className="block text-[length:var(--step-small)]">Série anterior, {prev.hour}</span>
              <span className="font-display mt-2 block text-[length:var(--step-lead)] transition-transform duration-300 group-hover:-translate-x-1">
                {prev.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/trabalhos/${next.slug}`} className="group block sm:text-right">
              <span className="block text-[length:var(--step-small)]">Próxima série, {next.hour}</span>
              <span className="font-display mt-2 block text-[length:var(--step-lead)] transition-transform duration-300 group-hover:translate-x-1">
                {next.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
        </div>
      </nav>
    </main>
  );
}
