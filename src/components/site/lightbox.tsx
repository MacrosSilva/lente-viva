"use client";

import { useEffect, useRef } from "react";

import type { ProjectImage } from "@/lib/data";
import { unsplashUrl } from "@/lib/data";

type LightboxProps = {
  images: ProjectImage[];
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

const SWIPE_THRESHOLD_PX = 48;

export function Lightbox({ images, index, onClose, onIndexChange }: LightboxProps) {
  const touchStartX = useRef<number | null>(null);
  const total = images.length;
  const current = images[index];

  const goPrev = () => onIndexChange((index - 1 + total) % total);
  const goNext = () => onIndexChange((index + 1) % total);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, total]);

  if (!current) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Galeria em tela cheia"
      className="fixed inset-0 z-[100] flex flex-col bg-black/96"
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const delta = e.changedTouches[0].clientX - touchStartX.current;
        if (delta > SWIPE_THRESHOLD_PX) goPrev();
        else if (delta < -SWIPE_THRESHOLD_PX) goNext();
        touchStartX.current = null;
      }}
    >
      <div className="flex items-center justify-between px-4 py-4 sm:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-white/70">
          {index + 1} / {total}
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar galeria"
          className="flex h-10 w-10 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path strokeLinecap="round" d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-2 pb-6 sm:px-6">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Foto anterior"
          className="absolute left-1 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white sm:left-4"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 5 8 12l7 7" />
          </svg>
        </button>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={current.id}
          src={unsplashUrl(current.id, 1600)}
          alt={current.alt}
          className="max-h-full max-w-full object-contain"
          loading="eager"
          decoding="async"
        />

        <button
          type="button"
          onClick={goNext}
          aria-label="Próxima foto"
          className="absolute right-1 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white sm:right-4"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m9 5 7 7-7 7" />
          </svg>
        </button>
      </div>

      <p className="px-4 pb-6 text-center text-sm text-white/60 sm:px-8">{current.alt}</p>

      <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 pb-5 sm:px-8">
        {images.map((image, i) => (
          <button
            key={image.id}
            type="button"
            onClick={() => onIndexChange(i)}
            aria-label={`Ir para foto ${i + 1}`}
            aria-current={i === index}
            className={`h-12 w-16 flex-shrink-0 overflow-hidden rounded transition-opacity ${
              i === index ? "opacity-100 ring-1 ring-white" : "opacity-40 hover:opacity-70"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={unsplashUrl(image.id, 128)}
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
