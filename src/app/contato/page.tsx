import type { Metadata } from "next";

import { ContactForm } from "@/components/site/contact-form";
import { Photo } from "@/components/site/photo";
import { Reveal } from "@/components/site/reveal";

export const metadata: Metadata = {
  title: "Contato · Lente Viva",
  description: "Fale sobre seu projeto de fotografia.",
};

export default function ContatoPage() {
  return (
    <main>
      <section className="relative flex h-[42vh] min-h-[320px] items-end overflow-hidden bg-ink">
        <Photo
          id="1519085360753-af0119f7cbe7"
          alt="Retrato em luz suave"
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/35" />
        <div className="relative mx-auto w-full max-w-6xl px-5 pb-12 pt-28 sm:px-8">
          <Reveal>
            <h1 className="text-4xl font-semibold tracking-tighter text-white md:text-5xl">
              Contato
            </h1>
            <p className="mt-3 max-w-md text-base text-white/75">
              Conte a data, o lugar e a ideia do seu projeto.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-20">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-soft">
              Informações
            </p>
            <dl className="mt-5 space-y-6">
              <div>
                <dt className="text-sm text-ink-soft">Email</dt>
                <dd className="mt-1 text-base text-ink">
                  <a href="mailto:contato@lenteviva.com.br" className="hover:opacity-70">
                    contato@lenteviva.com.br
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-ink-soft">Telefone</dt>
                <dd className="mt-1 text-base text-ink">
                  <a href="tel:+5511999990000" className="hover:opacity-70">
                    +55 11 99999-0000
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-ink-soft">Atendimento</dt>
                <dd className="mt-1 text-base text-ink">São Paulo e viagens sob consulta</dd>
              </div>
              <div>
                <dt className="text-sm text-ink-soft">Prazo de resposta</dt>
                <dd className="mt-1 text-base text-ink">Até dois dias úteis</dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={100}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
