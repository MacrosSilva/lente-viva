"use client";

import Link from "next/link";

import { Photo } from "./photo";
import { type ReactNode, useEffect, useRef, useState } from "react";

export type Spine = {
  title: string;
  excerpt: string;
  meta: string;
  href: string;
  linkLabel: string;
  photo: { id: string; alt: string };
};

const TONES = ["#b7c8be", "#a7bbae", "#c6d4cb", "#9fb3a6"];
const SLIVER = 120;

// Specialties as a deck of cards: on a wide screen the stage pins and each
// step of scroll slides the next card in, folding the earlier ones into
// spines at the left. Phones (and no-script) get the plain stack.
export function SpineDeck({ items, heading }: { items: Spine[]; heading: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const [card, setCard] = useState(760);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const measure = () => setCard(Math.max(560, stage.clientWidth - (items.length - 1) * SLIVER));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(stage);
    return () => ro.disconnect();
  }, [items.length]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = wrap.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      if (travel <= 0) return;
      const progress = Math.min(1, Math.max(0, -rect.top / travel));
      setActive(Math.min(items.length - 1, Math.floor(progress * items.length)));
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
  }, [items.length]);

  const goTo = (i: number) => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const travel = wrap.offsetHeight - window.innerHeight;
    const top = wrap.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + (travel * (i + 0.5)) / items.length, behavior: "smooth" });
  };

  return (
    <>
      {/* Phone: plain stack */}
      <div className="rise lg:hidden">{heading}</div>
      <ul className="mt-10 grid gap-3 lg:hidden">
        {items.map((item, i) => (
          <li key={item.title} className="rise p-6" style={{ background: TONES[i % TONES.length] }}>
            <h3 className="font-display text-[length:var(--step-lead)] leading-[1.1]">{item.title}</h3>
            <p className="mt-3">{item.excerpt}</p>
            <div className="mt-6 flex items-baseline justify-between gap-4">
              <span>{item.meta}</span>
              <Link href={item.href} className="font-medium underline underline-offset-4">
                {item.linkLabel}
              </Link>
            </div>
          </li>
        ))}
      </ul>

      {/* Wide screen: pinned deck */}
      <div ref={wrapRef} className="relative hidden lg:block" style={{ height: "280svh" }}>
        <div className="sticky top-0 flex h-svh flex-col justify-center">
          <div className="rise mb-12">{heading}</div>
          <div ref={stageRef} className="relative h-[440px] overflow-hidden">
            {items.map((item, i) => {
              const folded = i < active;
              const shown = i <= active;
              const x = folded ? i * SLIVER : shown ? active * SLIVER : active * SLIVER + card + 80;
              return (
                <article
                  key={item.title}
                  className="absolute inset-y-0 left-0 flex flex-col p-8 transition-[transform,opacity] duration-700 [transition-timing-function:var(--ease-out)]"
                  style={{
                    width: card,
                    background: TONES[i % TONES.length],
                    transform: `translate3d(${x}px,0,0)`,
                    opacity: shown ? 1 : 0,
                    visibility: shown ? "visible" : "hidden",
                    zIndex: i,
                  }}
                >
                  {/* folded: the card is a spine, its title set up the edge like a book */}
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    tabIndex={folded ? undefined : -1}
                    aria-hidden={!folded}
                    className="absolute inset-y-0 left-0 flex w-[120px] items-end justify-center pb-8 transition-opacity duration-500 hover:opacity-70"
                    style={{ opacity: folded ? 1 : 0, visibility: folded ? "visible" : "hidden" }}
                  >
                    <span className="font-display text-[length:var(--step-lead)] [writing-mode:vertical-rl] rotate-180 whitespace-nowrap">
                      {item.title}
                    </span>
                  </button>
                  <div
                    className="grid h-full grid-cols-2 gap-10 transition-opacity duration-500"
                    style={{ opacity: folded ? 0 : 1, visibility: folded || !shown ? "hidden" : "visible" }}
                  >
                  <div className="flex flex-col">
                  <h3 className="font-display max-w-[16ch] text-[length:var(--step-lead)] leading-[1.1]">{item.title}</h3>
                  <p className="mt-4 max-w-[46ch]">{item.excerpt}</p>
                  <div className="mt-auto flex items-baseline justify-between gap-4">
                    <span>{item.meta}</span>
                    <Link
                      href={item.href}
                      tabIndex={i === active ? undefined : -1}
                      className="font-medium underline underline-offset-4 transition-opacity hover:opacity-60"
                    >
                      {item.linkLabel}
                    </Link>
                  </div>
                  </div>
                  <div className="relative overflow-hidden bg-paper-2">
                    <Photo id={item.photo.id} alt={item.photo.alt} sizes="40vw" className="object-cover" />
                  </div>
                  </div>
                </article>
              );
            })}
          </div>
          <p className="mt-12 text-[length:var(--step-body)]">
            {items.length} especialidades, nove séries publicadas.{" "}
            <Link href="/trabalhos" className="font-medium underline underline-offset-4 hover:opacity-60">
              Ver todos os trabalhos
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
