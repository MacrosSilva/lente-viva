"use client";

import Image from "next/image";
import { useState } from "react";

import { unsplashUrl } from "@/lib/data";

type PhotoProps = {
  id: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

// A hotlinked source photo (fills its relatively-positioned parent) with a
// graceful fallback if the remote id ever 404s.
export function Photo({ id, alt, sizes, priority = false, className }: PhotoProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`bg-paper-soft ${className ?? ""}`}
        role="img"
        aria-label={alt}
      />
    );
  }

  return (
    <Image
      src={unsplashUrl(id, 1600)}
      alt={alt}
      fill
      sizes={sizes ?? "100vw"}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
