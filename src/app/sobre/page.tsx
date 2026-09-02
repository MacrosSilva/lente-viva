import type { Metadata } from "next";
import Link from "next/link";

import { Photo } from "@/components/site/photo";
import { Reveal } from "@/components/site/reveal";

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
      <section className="relative flex h-[56vh] min-h-[420px] items-end overflow-hidden bg-ink">
        <Photo
          id="1524504388940-b1c1722653e1"
          alt="Retrato do fotógrafo em locação"
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />
        <div className="relative mx-auto w-full max-w-6xl px-5 pb-14 pt-32 sm:px-8">
          <Reveal>
            <h1 className="text-4xl font-semibold tracking-tighter text-white md:text-5xl">
              Sobre
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-20">
          <Reveal className="relative aspect-[4/5] overflow-hidden bg-paper-soft lg:sticky lg:top-28 lg:self-start">
            <Photo
              id="1541823709867-1b206113eafd"
              alt="Retrato em estúdio"
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </Reveal>

          <div>
            <Reveal>
              <p className="max-w-[60ch] text-xl leading-relaxed tracking-tight text-ink md:text-2xl">
                Sou fotógrafo baseado em São Paulo, com dez anos de trabalho entre retrato,
                paisagem, cobertura de eventos e editorial de moda.
              </p>
              <p className="mt-5 max-w-[65ch] text-base leading-relaxed text-ink-soft">
                Prefiro luz disponível a equipamento pesado, e um bom silêncio de observação a
                muita direção. Cada projeto começa com uma conversa sobre o que realmente
                importa registrar, antes de qualquer câmera sair da bolsa.
              </p>
            </Reveal>

            <Reveal delay={100} className="mt-12">
              <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-ink-soft">
                Trajetória
              </h2>
              <ol className="mt-5 space-y-6 border-l border-line pl-6">
                {TIMELINE.map((item) => (
                  <li key={item.year} className="relative">
                    <span className="absolute -left-[29px] top-1.5 h-2 w-2 rounded-full bg-ink" />
                    <p className="font-mono text-xs uppercase tracking-[0.1em] text-ink-soft">
                      {item.year}
                    </p>
                    <p className="mt-1 max-w-[55ch] text-sm leading-relaxed text-ink">
                      {item.text}
                    </p>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={160} className="mt-12">
              <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-ink-soft">
                Equipamento
              </h2>
              <ul className="mt-5 divide-y divide-line border-t border-line">
                {KIT.map((item) => (
                  <li key={item} className="py-3 text-sm text-ink">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={220} className="mt-12">
              <Link
                href="/contato"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
              >
                Fale comigo
                <span aria-hidden="true">→</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
