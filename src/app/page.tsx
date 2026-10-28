import Image from "next/image";
import Link from "next/link";

import { CouponForm } from "@/components/site/coupon-form";
import { FolderFade } from "@/components/site/folder-fade";
import { HourPicker } from "@/components/site/hour-picker";
import { Photo } from "@/components/site/photo";
import { type Spine, SpineDeck } from "@/components/site/spine-deck";
import { getCategory, getProject, projects, unsplashUrl } from "@/lib/data";

const LIGHT_SLUGS = ["serra-da-bocaina", "colecao-verao", "luz-natural", "festival-de-inverno"];
const lights = LIGHT_SLUGS.map((slug) => getProject(slug)!);

const FOLDER_SLUGS = [
  "serra-da-bocaina",
  "casamento-ana-e-pedro",
  "colecao-verao",
  "preto-e-branco",
  "litoral-selvagem",
  "luz-natural",
];
const folders = FOLDER_SLUGS.map((slug) => getProject(slug)!);

// Band colour, tab colour and ink for each folder in turn.
const FOLDER_TONES = [
  { band: "var(--field-2)", tab: "var(--field-3)", ink: "var(--ink)" },
  { band: "var(--field-3)", tab: "var(--field-4)", ink: "var(--ink)", tabInk: "var(--field-4-ink)" },
  { band: "var(--paper)", tab: "var(--field-1)", ink: "var(--ink)" },
  { band: "var(--field-1)", tab: "var(--paper)", ink: "var(--ink)" },
  { band: "var(--field-4)", tab: "var(--field-2)", ink: "var(--field-4-ink)" },
  { band: "var(--paper-2)", tab: "var(--field-3)", ink: "var(--ink)" },
];

const SPECIALTIES: Spine[] = [
  {
    title: "Retratos em luz disponível",
    excerpt:
      "Uma sessão marcada para a hora em que a luz do lugar favorece o seu rosto, sem flash e sem rebatedor. Em casa, no trabalho ou na rua.",
    meta: "Sessões de 1h30",
    href: "/trabalhos",
    linkLabel: "Ver retratos",
    photo: { id: "1500648767791-00dcc994a43e", alt: "Retrato em luz suave contra a janela" },
  },
  {
    title: "Casamentos e eventos inteiros",
    excerpt:
      "Do café da manhã à última música, com duas câmeras e quase nenhuma pose. A entrega conta o dia na ordem em que ele aconteceu.",
    meta: "Até 12 horas de cobertura",
    href: "/trabalhos/casamento-ana-e-pedro",
    linkLabel: "Ver um casamento",
    photo: { id: "1465495976277-4387d4b0b4c6", alt: "Convidados durante a recepção" },
  },
  {
    title: "Editorial para marcas",
    excerpt:
      "Moda e produto com direção de luz pensada junto com a direção de arte. Estúdio, externa ou as duas no mesmo dia.",
    meta: "Entrega em 48 horas",
    href: "/trabalhos/colecao-verao",
    linkLabel: "Ver um editorial",
    photo: { id: "1515886657613-9f3515b0c78f", alt: "Retrato editorial em luz dura" },
  },
  {
    title: "Paisagem sob encomenda",
    excerpt:
      "Séries de lugar para hotéis, livros e paredes. Vou antes, espero a luz certa e volto quantas manhãs forem precisas.",
    meta: "Projetos de 3 a 7 dias",
    href: "/trabalhos/serra-da-bocaina",
    linkLabel: "Ver uma paisagem",
    photo: { id: "1470071459604-3b5ec3a7fe05", alt: "Cordilheira ao entardecer" },
  },
];

const HERO_STRIP = ["serra-da-bocaina", "colecao-verao", "luz-natural"].map((s) => getProject(s)!);

export default function Home() {
  return (
    <main>
      {/* Hero: the card, cropped by the bottom of the screen, over a moving sky */}
      <section className="relative h-[calc(100svh-72px)] min-h-[600px] overflow-hidden bg-field-1 sm:h-[calc(100svh-84px)]">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-90 [filter:saturate(0.5)] motion-reduce:hidden"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/media/nuvens-poster.jpg"
          aria-hidden="true"
        >
          <source src="/media/nuvens.webm" type="video/webm" />
        </video>
        <Image
          src="/media/nuvens-poster.jpg"
          alt=""
          fill
          sizes="100vw"
          className="hidden object-cover opacity-90 [filter:saturate(0.5)] motion-reduce:block"
        />

        <div className="wrap relative h-full">
          <div className="die-cut pf-reveal relative mx-auto mt-6 w-full bg-paper px-6 pb-16 pt-12 text-center sm:mt-[clamp(32px,7vh,96px)] sm:w-[min(50%,700px)] sm:min-w-[520px] sm:px-14 sm:pt-14">
            <h1 className="font-display text-[length:var(--step-display)] italic">
              <span className="block sm:-translate-x-[14%]">Lente</span>
              <span className="block sm:translate-x-[16%]">Viva</span>
            </h1>
            <p className="mx-auto mt-9 max-w-[34ch] text-[length:var(--step-lead)] leading-[1.35]">
              Fotografia de retrato, paisagem, eventos e editorial, feita na hora em que a luz pede.
            </p>
            <p className="mt-7 flex flex-col items-center justify-center gap-x-4 gap-y-1 sm:flex-row text-[length:var(--step-small)]">
              <span>São Paulo e onde a luz estiver</span>
              <span aria-hidden="true" className="hidden h-2.5 w-2.5 rotate-45 bg-ink sm:inline-block" />
              <span>Sessões com hora marcada</span>
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/trabalhos"
                className="inline-flex h-11 items-center bg-ink px-6 text-[length:var(--step-small)] font-medium text-paper transition-[transform,background-color] hover:bg-accent active:scale-[0.97]"
              >
                Ver os trabalhos
              </Link>
            </div>

            {/* the contact strip continues below the fold, frames marked by hour */}
            <ul className="mt-12 grid grid-cols-3 gap-2.5">
              {HERO_STRIP.map((p) => (
                <li key={p.slug}>
                  <div className="relative aspect-[4/5] overflow-hidden bg-paper-2">
                    <Photo id={p.cover.id} alt={p.cover.alt} sizes="(min-width: 640px) 220px, 30vw" priority className="object-cover" />
                  </div>
                  <p className="mt-2 text-left text-[length:var(--step-small)]">{p.hour}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Intro: the hours of light, and the live picker */}
      <section aria-labelledby="horas" className="bg-bg pb-[120px] pt-[140px]">
        <div className="wrap">
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <h2 id="horas" className="rise font-display text-[length:var(--step-head)] md:col-span-7">
              Cada série tem hora
            </h2>
            <p className="rise max-w-[34ch] md:col-span-4 md:col-start-9" style={{ ["--i" as string]: 1 }}>
              Não fotografo um lugar em qualquer momento. Escolho uma janela curta de luz antes da
              primeira foto e volto a ela até a série estar pronta.
            </p>
          </div>
          <div className="rise mt-[clamp(64px,8vw,120px)]" style={{ ["--i" as string]: 2 }}>
            <HourPicker lights={lights} />
          </div>
        </div>
      </section>

      {/* Work: the series filed as folders */}
      <section aria-labelledby="series" className="bg-bg pb-[160px]">
        <div className="wrap">
          <h2 id="series" className="rise font-display mb-12 text-[length:var(--step-head)]">
            Seis séries abertas
          </h2>
        </div>
        <div className="wrap">
          {folders.map((p, i) => {
            const tone = FOLDER_TONES[i];
            const category = getCategory(p.category);
            return (
              <article
                key={p.slug}
                data-folder
                className="relative pt-[44px] lg:sticky lg:top-[var(--t)]"
                style={{ ["--t" as string]: `${i * 58}px` }}
              >
                <div
                  className="absolute left-0 top-0 flex h-[44px] max-w-[92%] items-center px-7"
                  style={{
                    background: tone.tab,
                    color: tone.tabInk ?? "var(--ink)",
                    clipPath: "polygon(0 100%, 14px 0, calc(100% - 14px) 0, 100% 100%)",
                  }}
                >
                  <h3 className="font-display truncate whitespace-nowrap text-[length:var(--step-lead)] leading-none">{p.title}</h3>
                </div>
                <div
                  className="px-5 pb-10 pt-4 sm:px-8 lg:min-h-[78svh] lg:pb-14"
                  style={{ background: tone.band, color: tone.ink }}
                >
                  <p className="rise text-[length:var(--step-small)] lg:text-right">
                    {category?.name}, {p.hour}
                  </p>
                  <div data-folder-body className="mt-6 grid gap-8 transition-opacity lg:mt-8 lg:grid-cols-12">
                  <div className="rise relative aspect-[4/3] overflow-hidden lg:col-span-7 lg:aspect-[16/10]" style={{ ["--i" as string]: 1 }}>
                    <Photo id={p.cover.id} alt={p.cover.alt} sizes="(min-width: 1024px) 56vw, 100vw" className="object-cover transition-transform duration-[1200ms] hover:scale-[1.03]" />
                  </div>
                  <div className="rise lg:col-span-4 lg:col-start-9" style={{ ["--i" as string]: 2 }}>
                    <p className="font-display text-[length:var(--step-lead)] italic">{p.light}</p>
                    <p className="mt-5">{p.description.slice(0, 2).join(" ")}</p>
                    <p className="mt-5 text-[length:var(--step-small)]">
                      {p.location}, {p.year}
                    </p>
                    <Link
                      href={`/trabalhos/${p.slug}`}
                      className="mt-7 inline-flex h-11 items-center px-5 text-[length:var(--step-small)] font-medium transition-transform active:scale-[0.97]"
                      style={{ background: tone.ink, color: tone.band }}
                    >
                      Abrir a série
                    </Link>
                  </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <FolderFade />
        <div className="wrap mt-10">
          <Link href="/trabalhos" className="rise inline-block text-[length:var(--step-body)] font-medium underline underline-offset-4 hover:opacity-60">
            Ver as {projects.length} séries
          </Link>
        </div>
      </section>

      {/* List: the specialties as a deck folding into spines */}
      <section aria-labelledby="como" className="bg-bg pb-[140px] lg:pb-0">
        <div className="wrap">
          <SpineDeck
            items={SPECIALTIES}
            heading={
              <h2 id="como" className="font-display text-[length:var(--step-head)]">
                Quatro jeitos de trabalhar
              </h2>
            }
          />
        </div>
      </section>

      {/* About: the letter on a sheet, with a tear-off strip */}
      <section aria-labelledby="carta" className="bg-field-3 py-[160px]">
        <div className="wrap">
          <div className="mx-auto max-w-[640px]">
            <div className="rise bg-paper p-6 sm:p-[60px]">
              <div className="flex items-center gap-4">
                <div className="relative h-11 w-11 overflow-hidden rounded-full bg-paper-2">
                  <Image src={unsplashUrl("1552058544-f2b08422138a", 120)} alt="O fotógrafo em locação" fill sizes="44px" className="object-cover" />
                </div>
                <h2 id="carta" className="font-display text-[length:var(--step-lead)] italic">
                  Uma carta curta
                </h2>
              </div>
              <div className="rise mt-7 space-y-[1.55em] leading-[1.55]" style={{ ["--i" as string]: 1 }}>
                <p>Comecei fotografando a cidade onde cresci, sempre no mesmo horário, porque era a hora em que eu saía do trabalho. Sem perceber, aprendi a luz das cinco e meia antes de aprender a câmera.</p>
                <p>Dez anos depois, trabalho entre retrato, paisagem, casamento e editorial, mas o método é o mesmo: antes de combinar o lugar, combinamos a hora.</p>
                <p>Prefiro luz disponível a equipamento pesado, e um bom silêncio de observação a muita direção. Você não vai passar a sessão posando.</p>
                <p>Se você tem uma data, um lugar ou só uma ideia, me escreva. Eu respondo com a hora que escolheria e por quê.</p>
              </div>
              <p className="rise mt-9 text-[length:var(--step-lead)] italic" style={{ ["--i" as string]: 2 }}>Lente Viva</p>
              <p className="text-[length:var(--step-small)] text-muted">Fotografia, São Paulo</p>
            </div>
            <div className="bg-paper">
              <span aria-hidden="true" className="perf-x block" style={{ ["--dot" as string]: "var(--field-3)" }} />
              <div className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-[60px]">
                <a href="mailto:contato@lenteviva.com.br" className="text-[length:var(--step-body)] font-medium underline underline-offset-4 hover:opacity-60">
                  contato@lenteviva.com.br
                </a>
                <Link href="/sobre" className="hover:opacity-60">
                  A trajetória completa
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact: the coupon */}
      <section aria-labelledby="contato-titulo" className="bg-bg py-[140px]">
        <div className="wrap">
          <div className="rise mx-auto max-w-[1180px]">
            <CouponForm />
          </div>
        </div>
      </section>
    </main>
  );
}
