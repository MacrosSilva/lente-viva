"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { Photo } from "@/components/site/photo";

// Total scroll length of the hero, in vh. The scene advances across this whole
// span while the stage stays pinned (`position: sticky`). Lower = the whole
// animation happens faster. Ported at the design's locked value (820).
const SCROLL_VH = 820;

// Z-loop period for the tunnel (rings + cards wrap around this distance).
const LOOP = 7200;

// Per-card starting depth + parallax offset + tilt, straight from the handoff.
const PHOTO_CFG = [
  { z: -600, x: -200, y: -90, rot: -8 },
  { z: -1800, x: 240, y: 80, rot: 6 },
  { z: -3000, x: -170, y: 130, rot: 10 },
  { z: -4200, x: 200, y: -120, rot: -6 },
  { z: -5400, x: -250, y: 40, rot: 7 },
  { z: -6600, x: 160, y: 140, rot: -10 },
] as const;

// The six portfolio frames that travel through the lens tunnel. Card sizes
// match the design (260x340, 360x240, ...). Swap ids/copy here.
const TUNNEL_PHOTOS = [
  { id: "1544005313-94ddf0286df2", alt: "Retrato feminino em luz dourada", w: 260, h: 340 },
  { id: "1506905925346-21bda4d32df4", alt: "Montanhas cobertas de névoa ao amanhecer", w: 360, h: 240 },
  { id: "1531123897727-8f129e1688ce", alt: "Retrato masculino em preto e branco", w: 280, h: 280 },
  { id: "1509631179647-0177331693ae", alt: "Retrato urbano em luz de rua", w: 340, h: 230 },
  { id: "1472214103451-9374bd1c798e", alt: "Costão rochoso e mar ao entardecer", w: 250, h: 330 },
  { id: "1483985988355-763728e1935b", alt: "Modelo em editorial de moda de verão", w: 360, h: 225 },
] as const;

const FOCUS_RING_GRADIENT =
  "conic-gradient(from 0deg, rgba(255,255,255,0) 0deg, rgba(255,255,255,.16) 16deg, " +
  "rgba(255,255,255,0) 34deg, rgba(255,255,255,0) 90deg, rgba(255,255,255,.13) 106deg, " +
  "rgba(255,255,255,0) 124deg, rgba(255,255,255,0) 180deg, rgba(255,255,255,.16) 196deg, " +
  "rgba(255,255,255,0) 214deg, rgba(255,255,255,0) 270deg, rgba(255,255,255,.13) 286deg, " +
  "rgba(255,255,255,0) 304deg)";
const FOCUS_RING_MASK =
  "radial-gradient(circle, transparent 62%, #000 66%, #000 88%, transparent 92%)";

export function HeroLensScroll() {
  const wrap = useRef<HTMLDivElement>(null);
  const stars = useRef<HTMLDivElement>(null);
  const tunnel = useRef<HTMLDivElement>(null);
  const rings = useRef<HTMLDivElement>(null);
  const deck = useRef<HTMLDivElement>(null);
  const cam = useRef<HTMLDivElement>(null);
  const camDark = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const iris = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const hint = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const wrapEl = wrap.current;
    const ringsEl = rings.current;
    if (!wrapEl || !ringsEl) return;

    // 14 concentric tunnel rings, built in JS so the markup stays small.
    const ringEls: HTMLDivElement[] = [];
    for (let i = 0; i < 14; i++) {
      const d = document.createElement("div");
      d.style.cssText =
        "position:absolute;left:50%;top:50%;width:1400px;height:1400px;margin:-700px 0 0 -700px;" +
        "border-radius:50%;border:1px solid rgba(168,192,255,.34);" +
        "box-shadow:inset 0 0 110px rgba(110,140,235,.3);";
      ringsEl.appendChild(d);
      ringEls.push(d);
    }

    const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

    // Write every style straight to the DOM from one function of scroll
    // progress `p` (0..1). No React state in the loop.
    const render = (p: number) => {
      const seg = (a: number, b: number) => clamp01((p - a) / (b - a));
      const ease = (t: number) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const smooth = (t: number) => t * t * (3 - 2 * t);

      // Beat 1 — hand steadies, lens racks into focus, brief recoil, then dive.
      const focus = smooth(seg(0, 0.12));
      const twist = seg(0.02, 0.14);
      const recoil = smooth(seg(0.12, 0.22));
      const dive = smooth(seg(0.16, 0.62));

      const shake =
        Math.sin(focus * Math.PI * 3) * 0.5 + Math.sin(recoil * Math.PI) * -2.2;
      const camScale =
        1 +
        focus * 0.045 -
        Math.sin(recoil * Math.PI) * 0.022 +
        Math.pow(dive, 2.4) * 15;

      const c = cam.current;
      if (c) {
        c.style.transform =
          `translate3d(${shake.toFixed(3)}px,${(shake * 0.6).toFixed(3)}px,0) ` +
          `scale(${camScale.toFixed(4)})`;
        // Only the focus-rack blur runs as a CSS filter, and only while it is
        // actually non-zero — a full-screen animated filter (esp. one that
        // outlives beat 1) is the single most expensive thing on this page.
        const blur = (1 - focus) * 3.4;
        c.style.filter = blur > 0.04 ? `blur(${blur.toFixed(2)}px)` : "";
        c.style.opacity = (1 - smooth(seg(0.26, 0.52))).toFixed(3);
      }
      // Dive darkening: a compositor-friendly opacity fade of a flat panel,
      // instead of animating brightness/contrast/saturate on the image.
      if (camDark.current) camDark.current.style.opacity = (dive * 0.72).toFixed(3);

      // Overlaid copy lives on beat 1 only — gone before the dive.
      const copyOut = smooth(seg(0.04, 0.2));
      if (copy.current) {
        copy.current.style.opacity = (1 - copyOut).toFixed(3);
        copy.current.style.transform = `translate3d(0,${(-48 * copyOut).toFixed(1)}px,0)`;
      }
      if (hint.current) hint.current.style.opacity = (1 - smooth(seg(0.02, 0.1))).toFixed(3);

      // Focus ring — spins into alignment, fades as focus locks.
      const rg = ring.current;
      if (rg) {
        rg.style.opacity = (
          Math.min(focus * 2.4, 1) *
          (1 - smooth(seg(0.14, 0.3))) *
          0.9
        ).toFixed(3);
        rg.style.transform = `rotate(${(-34 + ease(twist) * 34).toFixed(1)}deg)`;
      }

      // Beat 2 — the iris punches through.
      const ir = iris.current;
      if (ir) {
        const irisO = Math.min(1, seg(0.2, 0.26)) * (1 - seg(0.54, 0.62));
        ir.style.opacity = irisO.toFixed(3);
        // Skip the geometry writes entirely while the iris is invisible
        // (~75% of the scroll).
        if (irisO > 0.001) {
          const irisT = 1 - Math.pow(1 - seg(0.24, 0.56), 1.8);
          const size = 1100 + irisT * 3400;
          ir.style.width = `${size.toFixed(2)}px`;
          ir.style.height = `${size.toFixed(2)}px`;
          ir.style.margin = `${(-size / 2).toFixed(2)}px 0 0 ${(-size / 2).toFixed(2)}px`;
        }
      }

      // Beat 3 — tunnel, starfield, travelling cards. Overlaps beat 2 on
      // purpose: nothing should read as a cut.
      const tunnelIn = smooth(seg(0.2, 0.42));
      if (tunnel.current) tunnel.current.style.opacity = tunnelIn.toFixed(3);
      if (stars.current) stars.current.style.opacity = (0.55 * tunnelIn).toFixed(3);

      const travel = seg(0.22, 1);
      const spin = travel * travel * 0.5 + travel * 0.5;
      const ringTravel = travel * 9000;

      ringEls.forEach((el, i) => {
        const z = ((i * 640 + ringTravel) % LOOP) - LOOP + 500;
        const near = clamp01((z + 6800) / 3400);
        const far = 1 - clamp01((z + 900) / 1400);
        el.style.transform =
          `translate3d(0,0,${z.toFixed(2)}px) rotate(${(i * 13 + spin * 40).toFixed(2)}deg)`;
        el.style.opacity = (near * far * 0.9).toFixed(3);
      });

      PHOTO_CFG.forEach((cfg, i) => {
        const el = cardRefs.current[i];
        if (!el) return;
        let z = (cfg.z + travel * 8600) % LOOP;
        if (z > 380) z -= LOOP;
        const fadeIn = clamp01((z + 6900) / 3400);
        const fadeOut = 1 - clamp01((z + 500) / 1500);
        el.style.transform =
          `translate3d(${cfg.x}px,${cfg.y}px,${z.toFixed(2)}px) ` +
          `rotate(${(cfg.rot + spin * cfg.rot * 0.35).toFixed(2)}deg)`;
        el.style.opacity = (fadeIn * fadeOut * (1 - seg(0.9, 1) * 0.2)).toFixed(3);
      });

      if (deck.current) deck.current.style.transform = `rotate(${(spin * -6).toFixed(3)}deg)`;
    };

    // Reduced motion: freeze mid-tunnel (cards visible) and never animate.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      render(0.75);
      if (copy.current) {
        copy.current.style.opacity = "0";
      }
      return () => ringEls.forEach((e) => e.remove());
    }

    // Light denoising follow, driven ONLY by a continuous rAF loop — never by
    // the scroll event itself. Site-wide smooth scroll (Lenis) already eases
    // the underlying scroll position, so this only needs to take the last
    // edge off; a large time-constant here would compound into visible lag.
    // The factor is normalised to elapsed time so 60Hz and 120Hz match.
    const TIME_CONSTANT_MS = 45;
    let sp: number | null = null;
    let last = -1;
    let frame = 0;
    let prevT = 0;

    const readRaw = () => {
      const rect = wrapEl.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const span = rect.height - vh;
      return clamp01(span > 0 ? -rect.top / span : 0);
    };

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      const dt = prevT ? Math.min(now - prevT, 64) : 16.7;
      prevT = now;

      const raw = readRaw();
      if (sp == null) sp = raw;
      const k = 1 - Math.exp(-dt / TIME_CONSTANT_MS);
      sp += (raw - sp) * k;
      if (Math.abs(raw - sp) < 0.0001) sp = raw;

      const p = sp;
      if (Math.abs(p - last) < 0.00006) return;
      last = p;
      render(p);
    };
    frame = requestAnimationFrame(tick);

    const onResize = () => {
      last = -1; // force a re-render at the new viewport size
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      ringEls.forEach((e) => e.remove());
    };
  }, []);

  return (
    <div
      ref={wrap}
      id="hero-lens-scroll"
      className="relative bg-[#05060a]"
      style={{ height: `${SCROLL_VH}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-[#05060a]">
        {/* Starfield */}
        <div
          ref={stars}
          className="hero-stars pointer-events-none absolute opacity-0"
          style={{ inset: "-40%" }}
        />

        {/* Tunnel: rings + card deck + vignette */}
        <div
          ref={tunnel}
          className="absolute inset-0 opacity-0"
          style={{ perspective: "1150px", perspectiveOrigin: "50% 50%" }}
        >
          <div
            ref={rings}
            className="absolute inset-0 [transform-style:preserve-3d] [will-change:transform]"
          />
          <div
            ref={deck}
            className="absolute inset-0 [transform-style:preserve-3d] [will-change:transform]"
          >
            {TUNNEL_PHOTOS.map((ph, i) => (
              <div
                key={ph.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="absolute left-1/2 top-1/2 overflow-hidden bg-[#0b0d12]"
                style={{
                  width: ph.w,
                  height: ph.h,
                  margin: `${-ph.h / 2}px 0 0 ${-ph.w / 2}px`,
                  boxShadow: "0 40px 120px rgba(0,0,0,.7)",
                }}
              >
                <Photo
                  id={ph.id}
                  alt={ph.alt}
                  sizes={`${ph.w}px`}
                  priority={i < 2}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(5,6,10,0) 40%, rgba(5,6,10,.28) 72%, rgba(5,6,10,.9) 100%)",
            }}
          />
        </div>

        {/* Camera layer */}
        <div
          ref={cam}
          className="absolute inset-0 [will-change:transform]"
          style={{ transformOrigin: "53% 52%" }}
        >
          <Image
            src="/hero/camera.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "53% 52%" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 53% 52%, rgba(0,0,0,0) 8%, rgba(4,5,9,.35) 45%, rgba(4,5,9,.9) 85%)",
            }}
          />
          {/* Dive darkening panel — opacity-driven, GPU-cheap */}
          <div
            ref={camDark}
            className="absolute inset-0 bg-[#05060a] opacity-0 [will-change:opacity]"
          />
        </div>

        {/* Focus ring — only the aro shows through the mask */}
        <div
          ref={ring}
          className="pointer-events-none absolute opacity-0"
          style={{
            left: "53%",
            top: "52%",
            width: "27vw",
            height: "27vw",
            margin: "-13.5vw 0 0 -13.5vw",
            borderRadius: "50%",
            background: FOCUS_RING_GRADIENT,
            maskImage: FOCUS_RING_MASK,
            WebkitMaskImage: FOCUS_RING_MASK,
          }}
        />

        {/* Iris — box-shadow blackout with a growing hole */}
        <div
          ref={iris}
          className="pointer-events-none absolute opacity-0"
          style={{
            left: "53%",
            top: "52%",
            width: 10,
            height: 10,
            margin: "-5px 0 0 -5px",
            borderRadius: "50%",
            boxShadow:
              "0 0 0 3000px #05060a, inset 0 0 30px 2px rgba(150,180,255,.35), 0 0 40px 2px rgba(120,150,255,.18)",
          }}
        />

        {/* Overlaid copy — beat 1 only */}
        <div
          ref={copy}
          className="absolute inset-x-0 bottom-0 z-10 mx-auto w-full max-w-6xl px-5 pb-20 sm:px-8 sm:pb-28"
        >
          <h1 className="max-w-2xl text-4xl font-semibold leading-[1.05] tracking-tighter text-white md:text-6xl">
            Fotografia que respeita a luz do momento.
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-white/80">
            Retratos, paisagens, eventos e editorial, sempre com atenção ao instante certo.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/trabalhos"
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Ver trabalhos
            </Link>
            <Link
              href="/contato"
              className="rounded-full border border-white/50 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white hover:bg-white/10"
            >
              Fale comigo
            </Link>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          ref={hint}
          className="pointer-events-none absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/50"
        >
          Role para entrar
          <span className="h-8 w-px bg-white/30" />
        </div>
      </div>
    </div>
  );
}
