import type { ReactNode } from "react";

import { Photo } from "./photo";

type PaperHeroProps = {
  photo: { id: string; alt: string };
  title: string;
  lead: ReactNode;
  meta?: ReactNode;
};

// Inner-page opening: the same die-cut paper card as the home page, set on a
// photograph from the work instead of the sky.
export function PaperHero({ photo, title, lead, meta }: PaperHeroProps) {
  return (
    <section className="relative overflow-hidden bg-field-1 pb-[clamp(56px,8vw,120px)] pt-[clamp(120px,22vw,300px)]">
      <div className="absolute inset-0">
        <Photo id={photo.id} alt={photo.alt} sizes="100vw" priority className="object-cover [animation:drift_24s_ease-in-out_infinite_alternate]" />
      </div>
      <div className="wrap relative">
        <div className="die-cut pf-reveal max-w-[760px] bg-paper px-6 py-10 sm:px-14 sm:py-14">
          <h1 className="font-display text-[length:var(--step-display)] italic">{title}</h1>
          <p className="mt-7 max-w-[40ch] text-[length:var(--step-lead)] leading-[1.35]">{lead}</p>
          {meta ? <div className="mt-6 text-[length:var(--step-small)]">{meta}</div> : null}
        </div>
      </div>
    </section>
  );
}
