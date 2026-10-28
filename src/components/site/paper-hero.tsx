import type { ReactNode } from "react";

import { Photo } from "./photo";

type PaperHeroProps = {
  photo: { id: string; alt: string };
  title: string;
  lead: ReactNode;
  meta?: ReactNode;
};

// Inner-page opening, the same split as the home page: a reading sheet beside
// one photograph from the work.
export function PaperHero({ photo, title, lead, meta }: PaperHeroProps) {
  return (
    <section className="grid gap-[var(--margin)] px-[var(--margin)] lg:grid-cols-2">
      <div className="relative order-2 flex flex-col justify-end bg-surface px-6 py-12 sm:px-12 sm:py-16 lg:order-1 lg:min-h-[78svh]">
        <h1 className="pf-reveal font-display text-[clamp(3rem,1rem+5vw,6.5rem)]">{title}</h1>
        <p className="pf-reveal mt-8 max-w-[40ch] text-[length:var(--step-lead)] leading-[1.4]" style={{ animationDelay: "120ms" }}>
          {lead}
        </p>
        {meta ? <div className="pf-reveal mt-6 text-[length:var(--step-small)]">{meta}</div> : null}
      </div>
      <div className="relative order-1 h-[46svh] overflow-hidden bg-surface lg:order-2 lg:h-auto">
        <Photo id={photo.id} alt={photo.alt} sizes="(min-width: 1024px) 50vw, 100vw" priority className="object-cover [animation:drift_24s_ease-in-out_infinite_alternate]" />
      </div>
    </section>
  );
}
