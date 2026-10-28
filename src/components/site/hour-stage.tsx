"use client";

import { type ReactNode, useEffect, useState } from "react";

import type { Project } from "@/lib/data";
import { Photo } from "./photo";

type Light = Pick<Project, "slug" | "title" | "hour" | "light" | "cover">;

function minutesOf(hour: string) {
  const [h, m] = hour.split("h").map(Number);
  return h * 60 + (m || 0);
}

// Distance around the clock, so 23h is close to 05h40 as well as to 21h.
function clockDistance(a: number, b: number) {
  const d = Math.abs(a - b);
  return Math.min(d, 1440 - d);
}

const HOLD_MS = 6000;

// The opening split: the reading sheet on the left, and on the right one
// photograph that stays put while the column scrolls. It opens on the series
// shot nearest to the current hour in São Paulo, then lets the day pass,
// crossfading through the other hours; the bar under it picks an hour by hand.
export function HourStage({ lights, children }: { lights: Light[]; children: ReactNode }) {
  const [active, setActive] = useState(0);
  const [now, setNow] = useState<string | null>(null);
  const [held, setHeld] = useState(false);

  useEffect(() => {
    const parts = new Intl.DateTimeFormat("pt-BR", {
      timeZone: "America/Sao_Paulo",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).formatToParts(new Date());
    const h = parts.find((p) => p.type === "hour")?.value ?? "00";
    const m = parts.find((p) => p.type === "minute")?.value ?? "00";
    const current = Number(h) * 60 + Number(m);
    let best = 0;
    lights.forEach((l, i) => {
      if (clockDistance(minutesOf(l.hour), current) < clockDistance(minutesOf(lights[best].hour), current)) best = i;
    });
    // The visitor's hour only exists in the browser.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActive(best);
    setNow(`${h}h${m}`);
  }, [lights]);

  // Let the day pass: a slow crossfade to the next hour, paused when the tab
  // is hidden, after the visitor picks an hour, or under reduced motion.
  useEffect(() => {
    if (held || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") setActive((i) => (i + 1) % lights.length);
    }, HOLD_MS);
    return () => window.clearInterval(id);
  }, [held, lights.length]);

  const current = lights[active];

  return (
    <div className="grid gap-[var(--margin)] p-[var(--margin)] lg:grid-cols-2">
      <div className="relative z-10 order-2 lg:order-1">{children}</div>

      <div className="order-1 lg:order-2">
        <figure className="sticky top-[var(--margin)] h-[32svh] overflow-hidden bg-surface lg:h-[calc(100svh-2*var(--margin))]">
          {lights.map((l, i) => (
            <div
              key={l.slug}
              aria-hidden={i !== active}
              className="absolute inset-0 transition-opacity duration-[1600ms] ease-in-out"
              style={{ opacity: i === active ? 1 : 0 }}
            >
              <Photo
                id={l.cover.id}
                alt={l.cover.alt}
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority={i === 0}
                className="object-cover [animation:drift_18s_ease-in-out_infinite_alternate]"
              />
            </div>
          ))}

          <figcaption className="absolute inset-x-0 bottom-0 flex min-h-14 flex-wrap items-center justify-between gap-x-6 gap-y-1 bg-bg px-4 py-2 text-[length:var(--step-small)] sm:px-5">
            <div role="group" aria-label="Escolha uma hora de luz" className="flex gap-1">
              {lights.map((l, i) => {
                const on = i === active;
                return (
                  <button
                    key={l.slug}
                    type="button"
                    aria-pressed={on}
                    onClick={() => {
                      setHeld(true);
                      setActive(i);
                    }}
                    className={`h-11 px-2.5 tabular-nums transition-[background-color,color,transform] active:scale-[0.96] sm:px-3 ${
                      on ? "bg-ink text-bg" : "text-ink hover:bg-surface"
                    }`}
                  >
                    {l.hour}
                  </button>
                );
              })}
            </div>
            <p aria-live="polite" className="font-semibold">
              {current.title}
            </p>
          </figcaption>
        </figure>
        {now ? (
          <p className="sr-only" aria-live="polite">
            Agora são {now} em São Paulo; a foto mostra a luz das {current.hour}.
          </p>
        ) : null}
      </div>
    </div>
  );
}

export function NowLine({ lights }: { lights: Light[] }) {
  const [text, setText] = useState<string | null>(null);
  useEffect(() => {
    const parts = new Intl.DateTimeFormat("pt-BR", {
      timeZone: "America/Sao_Paulo",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).formatToParts(new Date());
    const h = parts.find((p) => p.type === "hour")?.value ?? "00";
    const m = parts.find((p) => p.type === "minute")?.value ?? "00";
    const current = Number(h) * 60 + Number(m);
    let best = lights[0];
    for (const l of lights) {
      if (clockDistance(minutesOf(l.hour), current) < clockDistance(minutesOf(best.hour), current)) best = l;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setText(`Agora são ${h}h${m} em São Paulo. A foto ao lado abre na luz mais próxima: ${best.hour}, ${best.title}.`);
  }, [lights]);
  return <p className="min-h-[3.2em] text-[length:var(--step-small)] text-muted">{text}</p>;
}
