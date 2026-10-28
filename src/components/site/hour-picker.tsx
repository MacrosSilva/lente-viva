"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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

// The live thing: four hours of light, one photograph per hour. On load it
// reads the hour in São Paulo and opens on the light closest to it.
export function HourPicker({ lights }: { lights: Light[] }) {
  const [active, setActive] = useState(0);
  const [now, setNow] = useState<string | null>(null);

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
    // Reading the clock has to wait for the browser; the server has no visitor hour.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActive(best);
    setNow(`${h}h${m}`);
  }, [lights]);

  const current = lights[active];

  return (
    <div>
      <div
        role="group"
        aria-label="Escolha uma hora de luz"
        className="grid grid-cols-2 gap-x-6 gap-y-8 md:flex md:justify-between"
      >
        {lights.map((l, i) => {
          const on = i === active;
          return (
            <button
              key={l.slug}
              type="button"
              aria-pressed={on}
              onClick={() => setActive(i)}
              className={`group text-left transition-opacity duration-300 md:last:text-right ${on ? "opacity-100" : "opacity-55 hover:opacity-90"}`}
            >
              <span
                className={`font-display block text-[length:var(--step-head)] transition-transform duration-300 group-active:scale-[0.97] ${
                  on ? "underline decoration-[3px] underline-offset-[10px]" : ""
                }`}
              >
                {l.hour}
              </span>
              <span className="mt-3 block max-w-[22ch] text-[length:var(--step-small)] md:group-last:ml-auto">{l.light}</span>
            </button>
          );
        })}
      </div>

      <p className="mt-10 min-h-[1.6em] text-[length:var(--step-body)]" aria-live="polite">
        {now ? (
          <>
            Agora são {now} em São Paulo. A luz mais perto desta hora é a de{" "}
            <strong className="font-medium">{lights[active].hour}</strong>.
          </>
        ) : null}
      </p>

      <div className="mt-8 grid items-end gap-6 md:grid-cols-12">
        <div className="md:col-span-5 md:col-start-1">
          <p className="font-display text-[length:var(--step-lead)] italic">{current.title}</p>
          <p className="mt-2 max-w-[34ch]">
            Feita às {current.hour}. {current.light}.
          </p>
          <Link
            href={`/trabalhos/${current.slug}`}
            className="mt-5 inline-flex h-11 items-center bg-ink px-5 text-[length:var(--step-small)] font-medium text-paper transition-[transform,background-color] hover:bg-accent active:scale-[0.97]"
          >
            Ver a série
          </Link>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden bg-paper-2 md:col-span-7 md:col-start-6">
          {lights.map((l, i) => (
            <div
              key={l.slug}
              className={`absolute inset-0 transition-opacity duration-700 ${i === active ? "opacity-100" : "opacity-0"}`}
              aria-hidden={i !== active}
            >
              <Photo
                id={l.cover.id}
                alt={l.cover.alt}
                sizes="(min-width: 768px) 58vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
