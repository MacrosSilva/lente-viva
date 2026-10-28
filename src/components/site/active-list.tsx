"use client";

import { useEffect, useRef, useState } from "react";

import { Photo } from "./photo";

export type Service = {
  name: string;
  meta: string;
  description: string;
  photo: { id: string; alt: string };
};

// What can be booked, as a list beside one pinned photograph. The row nearest
// the middle of the screen (or the one hovered, focused or tapped) is open,
// and the photograph crossfades to that kind of work.
export function ActiveList({ services, heading }: { services: Service[]; heading: string }) {
  const [active, setActive] = useState(0);
  const rows = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const mid = window.innerHeight * 0.5;
      let best = -1;
      let bestD = Infinity;
      rows.current.forEach((row, i) => {
        if (!row) return;
        const r = row.getBoundingClientRect();
        const d = Math.abs(r.top + 29 - mid);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      });
      if (best >= 0 && bestD < window.innerHeight * 0.35) setActive(best);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-6">
      <div className="order-2 lg:sticky lg:top-[12vh] lg:order-1 lg:col-span-5 lg:self-start">
        <div className="relative aspect-[4/3] overflow-hidden bg-surface lg:aspect-[4/5]">
          {services.map((s, i) => (
            <div
              key={s.name}
              aria-hidden={i !== active}
              className="absolute inset-0 transition-opacity duration-300"
              style={{ opacity: i === active ? 1 : 0 }}
            >
              <Photo id={s.photo.id} alt={s.photo.alt} sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </div>
          ))}
        </div>
      </div>

      <div className="contents lg:order-2 lg:col-span-6 lg:col-start-7 lg:block lg:pt-[12vh]">
        <h2 id="servicos" className="rise order-1 font-display text-[length:var(--step-head)]">
          {heading}
        </h2>
        <ul className="order-3 lg:mt-12">
          {services.map((s, i) => {
            const on = i === active;
            return (
              <li key={s.name} ref={(el) => void (rows.current[i] = el)}>
                <button
                  type="button"
                  aria-expanded={on}
                  aria-controls={`servico-${i}`}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="flex min-h-[58px] w-full items-baseline justify-between gap-6 py-3 text-left transition-transform active:scale-[0.99]"
                >
                  <span
                    className={`text-[length:var(--step-lead)] leading-tight transition-colors ${
                      on ? "font-semibold text-ink" : "text-muted"
                    }`}
                  >
                    {s.name}
                  </span>
                  <span className="shrink-0 text-[length:var(--step-small)] text-muted">{s.meta}</span>
                </button>
                <div
                  id={`servico-${i}`}
                  className="grid transition-[grid-template-rows] duration-500 [transition-timing-function:var(--ease-out)]"
                  style={{ gridTemplateRows: on ? "1fr" : "0fr" }}
                >
                  <p className={`overflow-hidden ${on ? "" : "invisible"}`}>
                    <span className="block max-w-[40ch] pb-6">{s.description}</span>
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
