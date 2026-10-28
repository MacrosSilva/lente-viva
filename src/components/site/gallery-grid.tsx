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
              className="group block w-full overflow-hidden bg-paper-2"
              aria-label={`Ampliar foto: ${image.alt}`}
            >
              <div className={`relative overflow-hidden ${i === 0 ? "aspect-[4/3]" : "aspect-square"}`}>
                <Photo
                  id={image.id}
                  alt={image.alt}
                  sizes={i === 0 ? "(min-width: 640px) 66vw, 100vw" : "(min-width: 1024px) 33vw, 50vw"}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />
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
