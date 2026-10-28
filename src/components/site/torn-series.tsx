"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import type { Project } from "@/lib/data";
import { Photo } from "./photo";

type Series = Pick<Project, "slug" | "title" | "hour" | "year" | "cover" | "images"> & { discipline: string; display: string };

// Each series crosses a pinned stage split at the middle: two photographs of
// the same series, its name set across the seam. The halves travel in
// opposite directions, so the name tears apart and only lines up when the
// series sits in the middle of the screen.
export function TornSeries({ series, heading }: { series: Series[]; heading: string }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const blocks = Array.from(root.querySelectorAll<HTMLElement>("[data-series]"));
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      for (const block of blocks) {
        const r = block.getBoundingClientRect();
        if (r.bottom < -vh || r.top > 2 * vh) continue;
        // 0 when the block enters at the bottom, 1 when it leaves at the top
        const p = (vh - r.top) / (r.height + vh);
        const t = Math.max(-1, Math.min(1, (p - 0.5) * 2));
        block.style.setProperty("--t", t.toFixed(4));
        // the name dissolves as it tears apart, so the next series never slides over a legible name
        block.style.setProperty("--o", Math.max(0, Math.min(1, 1 - (Math.abs(t) - 0.45) / 0.3)).toFixed(3));
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const pane = "absolute top-[-20svh] h-[140svh] w-1/2 overflow-hidden will-change-transform";
  const half = "absolute top-1/2 w-1/2 overflow-hidden py-[0.2em] will-change-transform";

  return (
    <div ref={rootRef} className="relative bg-ink">
      <div className="pointer-events-none sticky top-0 z-20 h-0">
        <h2 className="px-[var(--margin)] pt-6 text-[length:var(--step-lead)] font-semibold text-bg sm:px-8 sm:pt-8">
          {heading}
        </h2>
      </div>

      {series.map((s) => {
        const detail = s.images[1] ?? s.cover;
        return (
          <article key={s.slug} data-series className="relative h-[150svh]" style={{ ["--t" as string]: 0 }}>
            <div className="sticky top-0 h-svh overflow-hidden">
              <div className={`${pane} left-0`} style={{ transform: "translate3d(0, calc(var(--t) * -20svh), 0)" }}>
                <Photo id={s.cover.id} alt={s.cover.alt} sizes="50vw" className="object-cover" />
                <div className="absolute inset-0 bg-black/30" />
              </div>
              <div className={`${pane} right-0`} style={{ transform: "translate3d(0, calc(var(--t) * 20svh), 0)" }}>
                <Photo id={detail.id} alt={detail.alt} sizes="50vw" className="object-cover" />
                <div className="absolute inset-0 bg-black/30" />
              </div>

              {/* the name, torn: each half of the screen holds its own half of the name */}
              <h3 className="sr-only">{s.title}</h3>
              <div aria-hidden="true" className="font-display text-[length:var(--step-display)] text-bg" style={{ opacity: "var(--o, 1)" }}>
                <span
                  className={`${half} left-0`}
                  style={{ transform: "translate3d(0, calc(-50% + var(--t) * -24svh), 0)" }}
                >
                  <span className="block w-[200%] px-4 text-center">{s.display}</span>
                </span>
                <span
                  className={`${half} right-0`}
                  style={{ transform: "translate3d(0, calc(-50% + var(--t) * 24svh), 0)" }}
                >
                  <span data-text={s.display} className="-ml-[100%] block w-[200%] px-4 text-center before:content-[attr(data-text)]" />
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-[14svh] flex flex-col items-center gap-2 px-4 text-center text-[length:var(--step-body)] text-bg">
                <p>
                  {s.discipline}, {s.year}, luz das {s.hour}
                </p>
                <Link
                  href={`/trabalhos/${s.slug}`}
                  className="inline-flex h-11 items-center bg-bg px-5 font-semibold text-ink transition-[transform,background-color] hover:bg-surface active:scale-[0.97]"
                >
                  Ver a série
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
