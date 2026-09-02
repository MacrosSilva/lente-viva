"use client";

import { useState } from "react";

import type { ProjectImage } from "@/lib/data";
import { Lightbox } from "./lightbox";
import { Photo } from "./photo";
import { Reveal } from "./reveal";

export function GalleryGrid({ images }: { images: ProjectImage[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {images.map((image, i) => (
          <Reveal key={image.id} delay={i * 60} className={i === 0 ? "col-span-2 row-span-2" : ""}>
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              className="group block w-full overflow-hidden bg-paper-soft"
              aria-label={`Ampliar foto: ${image.alt}`}
            >
              <div className={`relative overflow-hidden ${i === 0 ? "aspect-[4/3]" : "aspect-square"}`}>
                <Photo
                  id={image.id}
                  alt={image.alt}
                  sizes={i === 0 ? "(min-width: 640px) 66vw, 100vw" : "(min-width: 1024px) 33vw, 50vw"}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-500 group-hover:bg-black/20">
                  <span className="flex h-9 w-9 scale-75 items-center justify-center rounded-full bg-white/90 text-ink opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <circle cx="10" cy="10" r="6.5" />
                      <path strokeLinecap="round" d="m20 20-4.6-4.6M10 7.3v5.4M7.3 10h5.4" />
                    </svg>
                  </span>
                </div>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox
          images={images}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onIndexChange={setOpenIndex}
        />
      )}
    </>
  );
}
