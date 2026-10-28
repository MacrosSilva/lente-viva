import type { Metadata } from "next";

import { PaperHero } from "@/components/site/paper-hero";
import { TrabalhosGallery } from "@/components/site/trabalhos-gallery";
import { projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Trabalhos · Lente Viva",
  description: "Galeria de projetos de retrato, paisagem, eventos e editorial.",
};

export default function TrabalhosPage() {
  return (
    <main>
      <PaperHero
        photo={{ id: "1470071459604-3b5ec3a7fe05", alt: "Cordilheira ao entardecer" }}
        title="Trabalhos"
        lead={`${projects.length} séries de retrato, paisagem, eventos e editorial, cada uma marcada pela hora da sua luz.`}
      />

      <section aria-labelledby="folha" className="py-[clamp(80px,10vw,160px)]">
        <div className="wrap">
          <h2 id="folha" className="rise font-display text-[length:var(--step-head)]">
            A folha de contato
          </h2>
          <TrabalhosGallery />
        </div>
      </section>
    </main>
  );
}
