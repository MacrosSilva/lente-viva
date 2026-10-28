import type { Metadata } from "next";
import Link from "next/link";

import { ContactStrip } from "@/components/site/contact-strip";
import { PaperHero } from "@/components/site/paper-hero";
import { Photo } from "@/components/site/photo";

export const metadata: Metadata = {
  title: "Sobre · Lente Viva",
  description: "Trajetória, processo e equipamento de trabalho.",
};

const TIMELINE = [
  { year: "2015", text: "Primeiras encomendas fotografando eventos de amigos e família." },
  { year: "2018", text: "Dedicação em tempo integral, com foco em retrato e paisagem." },
  { year: "2021", text: "Primeira exposição individual, reunindo a série Preto e Branco." },
  { year: "2024", text: "Início dos trabalhos editoriais para marcas e publicações independentes." },
];

const KIT = [
  "Câmera de corpo inteiro (full-frame)",
  "Lentes 24-70mm f/2.8 e 70-200mm f/2.8",
  "Lentes fixas 35mm, 50mm e 85mm",
  "Flash portátil e refletores para eventos",
];

export default function SobrePage() {
  return (
    <main>
      <PaperHero
        photo={{ id: "1524504388940-b1c1722653e1", alt: "Retrato próximo com sombra suave" }}
        title="Sobre"
        lead="Fotógrafo em São Paulo há dez anos, entre retrato, paisagem, eventos e editorial de moda."
      />

      <section aria-labelledby="metodo" className="py-[clamp(80px,10vw,160px)]">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="rise relative aspect-[4/5] overflow-hidden bg-paper-2 lg:col-span-5">
            <Photo
              id="1541823709867-1b206113eafd"
              alt="Retrato em ambiente externo"
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <h2 id="metodo" className="rise font-display text-[length:var(--step-head)]">
              Primeiro a hora
            </h2>
            <p className="rise mt-8 max-w-[52ch] text-[length:var(--step-lead)] leading-[1.4]" style={{ ["--i" as string]: 1 }}>
              Prefiro luz disponível a equipamento pesado, e um bom silêncio de observação a muita
              direção.
            </p>
            <p className="rise mt-6 max-w-[60ch]" style={{ ["--i" as string]: 2 }}>
              Cada projeto começa com uma conversa sobre o que realmente importa registrar, antes de
              qualquer câmera sair da bolsa. Depois, escolhemos juntos a hora: o fim de tarde para
              um retrato, o amanhecer para um lugar, o meio-dia quando a sombra dura conta a
              história.
            </p>
            <Link
              href="/contato"
              className="rise mt-10 inline-flex h-11 items-center bg-ink px-6 text-[length:var(--step-small)] font-medium text-paper transition-[background-color,transform] hover:bg-accent active:scale-[0.97]"
              style={{ ["--i" as string]: 3 }}
            >
              Reservar uma sessão
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="trajetoria" className="bg-field-2 py-[clamp(80px,10vw,160px)]">
        <div className="wrap">
          <h2 id="trajetoria" className="rise font-display text-[length:var(--step-head)]">
            Dez anos em quatro datas
          </h2>
          <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {TIMELINE.map((item, i) => (
              <li key={item.year} className="rise" style={{ ["--i" as string]: i + 1 }}>
                <p className="font-display text-[length:var(--step-head)]">{item.year}</p>
                <p className="mt-3 max-w-[30ch]">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="equipamento" className="py-[clamp(80px,10vw,160px)]">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <h2 id="equipamento" className="rise font-display text-[length:var(--step-head)] lg:col-span-5">
            Na bolsa
          </h2>
          <ul className="rise grid gap-2 lg:col-span-7" style={{ ["--i" as string]: 1 }}>
            {KIT.map((item) => (
              <li key={item} className="bg-paper px-6 py-5">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <ContactStrip slugs={["preto-e-branco", "retrato-urbano", "amanhecer-no-cerrado", "litoral-selvagem"]} heading="Quatro horas de trabalho" />
    </main>
  );
}
