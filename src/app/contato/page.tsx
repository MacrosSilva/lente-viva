import type { Metadata } from "next";

import { ContactForm } from "@/components/site/contact-form";
import { ContactStrip } from "@/components/site/contact-strip";
import { PaperHero } from "@/components/site/paper-hero";

export const metadata: Metadata = {
  title: "Contato · Lente Viva",
  description: "Fale sobre seu projeto de fotografia.",
};

const INFO = [
  {
    label: "Email",
    value: (
      <a href="mailto:contato@lenteviva.com.br" className="underline underline-offset-4 hover:opacity-70">
        contato@lenteviva.com.br
      </a>
    ),
  },
  {
    label: "Telefone",
    value: (
      <a href="tel:+5511999990000" className="underline underline-offset-4 hover:opacity-70">
        +55 11 99999-0000
      </a>
    ),
  },
  { label: "Atendimento", value: "São Paulo e viagens sob consulta" },
  { label: "Prazo de resposta", value: "Até dois dias úteis" },
];

export default function ContatoPage() {
  return (
    <main>
      <PaperHero
        photo={{ id: "1519085360753-af0119f7cbe7", alt: "Perfil iluminado pelo entardecer" }}
        title="Contato"
        lead="Conte a data, o lugar e a ideia. Eu respondo com a hora de luz que escolheria."
      />

      <section aria-labelledby="pedido" className="py-[clamp(80px,10vw,160px)]">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="pedido" className="rise font-display text-[length:var(--step-head)]">
              Fale comigo
            </h2>
            <dl className="rise mt-10 space-y-6" style={{ ["--i" as string]: 1 }}>
              {INFO.map((item) => (
                <div key={item.label}>
                  <dt className="text-[length:var(--step-small)] text-muted">{item.label}</dt>
                  <dd className="mt-1">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rise bg-field-2 p-6 sm:p-10 lg:col-span-6 lg:col-start-7" style={{ ["--i" as string]: 2 }}>
            <ContactForm />
          </div>
        </div>
      </section>
      <ContactStrip slugs={["luz-natural", "casamento-ana-e-pedro", "colecao-verao", "serra-da-bocaina"]} heading="Uma hora para cada pedido" />
    </main>
  );
}
