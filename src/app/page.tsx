import Image from "next/image";
import Link from "next/link";

import { ActiveList, type Service } from "@/components/site/active-list";
import { HourStage, NowLine } from "@/components/site/hour-stage";
import { TornSeries } from "@/components/site/torn-series";
import { getCategory, getProject, unsplashUrl } from "@/lib/data";

const LIGHT_SLUGS = ["serra-da-bocaina", "colecao-verao", "luz-natural", "festival-de-inverno"];
const lights = LIGHT_SLUGS.map((slug) => getProject(slug)!);

const SERIES_SLUGS = ["serra-da-bocaina", "casamento-ana-e-pedro", "colecao-verao", "preto-e-branco", "litoral-selvagem"];
const series = SERIES_SLUGS.map((slug) => {
  const p = getProject(slug)!;
  const short: Record<string, string> = { "casamento-ana-e-pedro": "Ana & Pedro" };
  return { ...p, discipline: getCategory(p.category)?.name ?? "", display: short[slug] ?? p.title };
});

const SERVICES: Service[] = [
  {
    name: "Retrato em luz disponível",
    meta: "1h30",
    description: "Uma sessão marcada para a hora em que a luz do lugar favorece o seu rosto. Sem flash, sem rebatedor, em casa, no trabalho ou na rua.",
    photo: { id: "1500648767791-00dcc994a43e", alt: "Retrato em luz suave contra a janela" },
  },
  {
    name: "Casamento",
    meta: "Até 12 horas",
    description: "Do café da manhã à última música, com duas câmeras e quase nenhuma pose. A entrega conta o dia na ordem em que aconteceu.",
    photo: { id: "1519741497674-611481863552", alt: "Noivos durante a cerimônia ao ar livre" },
  },
  {
    name: "Evento e festival",
    meta: "Por noite",
    description: "Palco, fosso e plateia. Luz em movimento, quase sempre contra o público, editada para sair no dia seguinte.",
    photo: { id: "1470229538611-16ba8c7ffbd7", alt: "Show ao ar livre com luzes coloridas" },
  },
  {
    name: "Editorial de moda",
    meta: "Entrega em 48h",
    description: "Direção de luz pensada junto com a direção de arte. Estúdio, externa ou as duas no mesmo dia.",
    photo: { id: "1515886657613-9f3515b0c78f", alt: "Retrato editorial em luz dura" },
  },
  {
    name: "Paisagem sob encomenda",
    meta: "3 a 7 dias",
    description: "Séries de lugar para hotéis, livros e paredes. Vou antes, espero a luz certa e volto quantas manhãs forem precisas.",
    photo: { id: "1506905925346-21bda4d32df4", alt: "Montanhas cobertas de névoa ao amanhecer" },
  },
  {
    name: "Retrato de estúdio",
    meta: "2 horas",
    description: "Uma única luz lateral dura, fundo neutro, preto e branco ou cor. Para quem quer volume e textura em vez de suavidade.",
    photo: { id: "1531123897727-8f129e1688ce", alt: "Retrato masculino em preto e branco" },
  },
];

export default function Home() {
  return (
    <main>
      {/* Split: reading sheet beside the photograph of the current hour */}
      <HourStage lights={lights}>
        <div className="flex flex-col bg-surface px-5 pb-14 pt-4 sm:px-12 sm:pt-6 lg:min-h-[calc(100svh-2*var(--margin))]">
          <nav aria-label="Principal" className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 text-[length:var(--step-small)]">
            <div className="flex gap-5">
              <Link href="/trabalhos" className="py-2 underline-offset-4 hover:underline">Trabalhos</Link>
              <Link href="/sobre" className="hidden py-2 underline-offset-4 hover:underline sm:inline">Sobre</Link>
            </div>
            <Link href="/" aria-current="page" className="font-display text-[length:var(--step-lead)] leading-none">
              Lente Viva
            </Link>
            <Link href="/contato" className="justify-self-end py-2 underline-offset-4 hover:underline">
              Contato
            </Link>
          </nav>

          <div className="my-auto pt-8 text-center sm:pt-16">
            <h1 className="pf-reveal font-display text-[length:var(--step-head)]">
              <span className="block">Fotografia</span>
              <span className="block whitespace-nowrap">na hora certa</span>
            </h1>
            <p className="pf-reveal mx-auto mt-6 max-w-[40ch] sm:mt-8 text-[length:var(--step-lead)] leading-[1.4]" style={{ animationDelay: "120ms" }}>
              Retrato, paisagem, eventos e editorial em São Paulo. Cada série é feita numa única
              hora de luz, escolhida antes da primeira foto.
            </p>
            <div className="pf-reveal mt-8 flex justify-center sm:mt-10" style={{ animationDelay: "220ms" }}>
              <Link
                href="/contato"
                className="inline-flex h-12 items-center bg-ink px-7 font-semibold text-bg transition-[transform,background-color] hover:bg-[#2b350b] active:scale-[0.97]"
              >
                Reservar uma sessão
              </Link>
            </div>
          </div>

          <div className="mx-auto mt-14 max-w-[40ch] text-center">
            <NowLine lights={lights} />
          </div>
        </div>

        {/* Intro: the narrow column beside the photograph */}
        <section aria-labelledby="metodo" className="px-6 pb-40 pt-24 sm:px-12">
          <div className="max-w-[340px]">
            <h2 id="metodo" className="rise font-display text-[length:var(--step-lead)]">Uma hora por série</h2>
            <div className="rise mt-10 space-y-[1.5em] leading-[1.5]" style={{ ["--i" as string]: 1 }}>
              <p className="font-semibold">
                Antes de combinar o lugar, combino a hora. É ela que decide a fotografia.
              </p>
              <p className="text-muted">
                A Serra da Bocaina foi feita em quatro amanheceres seguidos, sempre às 05h40, quando a
                névoa ainda não tinha passado a serra.
              </p>
              <p className="text-muted">
                Luz Natural levou seis semanas, sempre entre 17h e 18h30, sem flash nem rebatedor. A
                Coleção Verão foi feita ao meio-dia de propósito, para a sombra dura contar a roupa.
              </p>
              <p className="text-muted">
                Ao lado, a foto abre na luz mais perto da hora em que você chegou e depois deixa o dia
                passar. Toque numa hora para parar nela.{" "}
                <Link href="/trabalhos" className="text-ink underline underline-offset-4 hover:opacity-70">
                  Ver as nove séries
                </Link>
              </p>
            </div>
          </div>
        </section>
      </HourStage>

      {/* Work: names torn at the seam (breaks the split, full width) */}
      <section aria-label="Séries selecionadas">
        <TornSeries series={series} heading="Séries selecionadas" />
      </section>

      {/* List: what can be booked, beside a pinned photograph */}
      <section aria-labelledby="servicos" className="wrap py-[clamp(96px,12vw,200px)]">
        <ActiveList services={SERVICES} heading="O que fotografo" />
      </section>

      {/* About: a short letter */}
      <section aria-labelledby="carta" className="bg-surface py-[clamp(120px,12vw,200px)]">
        <div className="mx-auto max-w-[520px] px-6">
          <div className="rise flex items-center gap-4">
            <div className="relative h-11 w-11 overflow-hidden rounded-full bg-bg">
              <Image src={unsplashUrl("1552058544-f2b08422138a", 120)} alt="O fotógrafo em locação" fill sizes="44px" className="object-cover" />
            </div>
            <h2 id="carta" className="text-[length:var(--step-lead)] font-semibold italic">Quem fotografa</h2>
          </div>
          <div className="rise mt-7 space-y-[1.55em] leading-[1.55]" style={{ ["--i" as string]: 1 }}>
            <p>
              Comecei fotografando a cidade onde cresci, sempre no mesmo horário, porque era a hora em
              que eu saía do trabalho. Sem perceber, aprendi a luz das cinco e meia antes de aprender
              a câmera.
            </p>
            <p>
              Dez anos depois trabalho entre retrato, paisagem, casamento e editorial, mas o método é o
              mesmo: <mark className="bg-[#d8dcc4] px-1 text-ink">antes do lugar, a hora</mark>.
            </p>
            <p>
              Prefiro luz disponível a equipamento pesado, e um bom silêncio de observação a muita
              direção. Você não vai passar a sessão posando.
            </p>
            <p>
              Se você tem uma data, um lugar ou só uma ideia, me escreva. Eu respondo com a hora que
              escolheria e por quê.
            </p>
          </div>
          <p className="rise mt-9 text-[length:var(--step-lead)] italic" style={{ ["--i" as string]: 2 }}>Lente Viva</p>
          <p className="text-[length:var(--step-small)] text-muted">Fotografia, São Paulo</p>
        </div>
      </section>

      {/* Contact: the address as display type, on the inverse */}
      <section aria-labelledby="escreva" className="flex flex-col justify-between gap-24 bg-ink lg:min-h-[64svh] px-[var(--margin)] py-12 text-bg sm:px-8">
        <h2 id="escreva" className="rise max-w-[28ch] text-[length:var(--step-lead)] leading-[1.35]">
          Escreva com a data, o lugar e a ideia. Respondo em até dois dias úteis.
        </h2>
        <div>
          <a
            href="mailto:contato@lenteviva.com.br?subject=Pedido%20de%20sess%C3%A3o"
            className="rise block font-display text-[length:var(--step-head)] leading-[0.95] normal-case lg:text-[length:var(--step-display)] transition-colors hover:text-[#c9cfb0]"
          >
            <span className="block">contato@</span>
            <span className="block">lenteviva.com.br</span>
          </a>
          <div className="mt-12 flex flex-col gap-3 text-[length:var(--step-small)] sm:flex-row sm:justify-between">
            <p>
              <a href="tel:+5511999990000" className="underline-offset-4 hover:underline">+55 11 99999-0000</a>, São Paulo
            </p>
            <p className="flex gap-6">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">Instagram</a>
              <Link href="/contato" className="underline-offset-4 hover:underline">Formulário de contato</Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
