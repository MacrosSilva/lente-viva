import Link from "next/link";

import { HeroLensScroll } from "@/components/site/hero-lens-scroll";
import { Photo } from "@/components/site/photo";
import { ProjectCard } from "@/components/site/project-card";
import { Reveal } from "@/components/site/reveal";
import { categories, projects } from "@/lib/data";

const FEATURED_SLUGS = [
  "luz-natural",
  "serra-da-bocaina",
  "casamento-ana-e-pedro",
  "colecao-verao",
  "litoral-selvagem",
  "preto-e-branco",
];

const featured = FEATURED_SLUGS.map((slug) => projects.find((p) => p.slug === slug)!).filter(
  Boolean,
);

const categoryCoverByCategory: Record<string, (typeof projects)[number]> = Object.fromEntries(
  categories.map((c) => [c.slug, projects.find((p) => p.category === c.slug)!]),
);

export default function Home() {
  return (
    <main>
      {/* Hero — scroll-triggered lens dive into the portfolio */}
      <HeroLensScroll />

      {/* Statement */}
      <section className="mx-auto max-w-3xl px-5 py-24 text-center sm:px-8 sm:py-32">
        <Reveal>
          <p className="text-2xl font-medium leading-snug tracking-tight text-ink md:text-3xl">
            Cada projeto começa com uma pergunta simples: o que essa luz, nesse lugar, com essas
            pessoas, está prestes a revelar.
          </p>
        </Reveal>
      </section>

      {/* Categories */}
      <section className="border-t border-line px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-soft">
              Especialidades
            </p>
            <h2 className="mt-3 max-w-lg text-3xl font-medium tracking-tight text-ink md:text-4xl">
              Quatro formas de contar uma história em imagem.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category, i) => {
              const cover = categoryCoverByCategory[category.slug];
              return (
                <Reveal key={category.slug} delay={i * 80}>
                  <Link href="/trabalhos" className="group block">
                    <div className="relative aspect-[3/4] overflow-hidden bg-paper-soft">
                      <Photo
                        id={cover.cover.id}
                        alt={cover.cover.alt}
                        sizes="(min-width: 1024px) 25vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                      />
                      <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/0" />
                    </div>
                    <h3 className="mt-4 text-lg font-medium tracking-tight text-ink">
                      {category.name}
                    </h3>
                    <p className="mt-1 text-sm text-ink-soft">{category.tagline}</p>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured works */}
      <section className="border-t border-line px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="max-w-lg text-3xl font-medium tracking-tight text-ink md:text-4xl">
                Trabalhos selecionados
              </h2>
              <Link
                href="/trabalhos"
                className="text-sm font-medium text-ink underline underline-offset-4 hover:opacity-70"
              >
                Ver todos os trabalhos
              </Link>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((project, i) => (
              <Reveal key={project.slug} delay={i * 60}>
                <ProjectCard project={project} priority={i < 3} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* About teaser */}
      <section className="border-t border-line px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal className="relative aspect-[4/5] overflow-hidden bg-paper-soft">
            <Photo
              id="1552058544-f2b08422138a"
              alt="Fotógrafo em locação externa"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </Reveal>
          <Reveal delay={100}>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-soft">
              Sobre
            </p>
            <h2 className="mt-3 text-3xl font-medium tracking-tight text-ink md:text-4xl">
              Dez anos documentando pessoas e lugares.
            </h2>
            <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-ink-soft">
              Comecei fotografando a cidade onde cresci e nunca parei. Hoje trabalho entre
              retratos, paisagens e eventos, sempre priorizando luz disponível e um olhar
              discreto.
            </p>
            <Link
              href="/sobre"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink underline underline-offset-4 hover:opacity-70"
            >
              Conhecer a trajetória
            </Link>
          </Reveal>
        </div>
      </section>

      {/* CTA band */}
      <section className="border-t border-line bg-ink px-5 py-24 text-center sm:px-8 sm:py-32">
        <Reveal>
          <h2 className="mx-auto max-w-xl text-3xl font-medium tracking-tight text-paper md:text-4xl">
            Tem um projeto em mente?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-paper/70">
            Conte a data, o lugar e a ideia. Eu respondo com disponibilidade e um orçamento.
          </p>
          <Link
            href="/contato"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-paper px-7 py-3.5 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
          >
            Fale comigo
            <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
