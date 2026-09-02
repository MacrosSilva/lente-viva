import type { Metadata } from "next";

import { Photo } from "@/components/site/photo";
import { Reveal } from "@/components/site/reveal";
import { TrabalhosGallery } from "@/components/site/trabalhos-gallery";

export const metadata: Metadata = {
  title: "Trabalhos · Lente Viva",
  description: "Galeria de projetos de retrato, paisagem, eventos e editorial.",
};

export default function TrabalhosPage() {
  return (
    <main>
      <section className="relative flex h-[52vh] min-h-[380px] items-end overflow-hidden bg-ink">
        <Photo
          id="1470071459604-3b5ec3a7fe05"
          alt="Cordilheira ao entardecer"
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />
        <div className="relative mx-auto w-full max-w-6xl px-5 pb-14 pt-32 sm:px-8">
          <Reveal>
            <h1 className="text-4xl font-semibold tracking-tighter text-white md:text-5xl">
              Trabalhos
            </h1>
            <p className="mt-3 max-w-md text-base text-white/75">
              Uma seleção de projetos, organizados por categoria.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <TrabalhosGallery />
        </div>
      </section>
    </main>
  );
}
