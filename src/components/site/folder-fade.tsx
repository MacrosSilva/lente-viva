"use client";

import { useEffect } from "react";

// As the next folder slides over one that is stuck, the covered folder's
// contents fade out, leaving only its tab and strip showing on the pile.
export function FolderFade() {
  useEffect(() => {
    const folders = Array.from(document.querySelectorAll<HTMLElement>("[data-folder]"));
    const bodies = folders.map((f) => f.querySelector<HTMLElement>("[data-folder-body]"));
    const wide = window.matchMedia("(min-width: 1024px)");
    let frame = 0;

    const update = () => {
      frame = 0;
      folders.forEach((folder, i) => {
        const body = bodies[i];
        if (!body) return;
        const next = folders[i + 1];
        if (!wide.matches || !next) {
          body.style.opacity = "";
          body.style.visibility = "";
          return;
        }
        // distance between this folder's strip and the next folder's top edge
        const gap = next.getBoundingClientRect().top - folder.getBoundingClientRect().top - 110;
        const open = Math.min(1, Math.max(0, gap / 260));
        body.style.opacity = String(open);
        body.style.visibility = open === 0 ? "hidden" : "";
      });
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

  return null;
}
