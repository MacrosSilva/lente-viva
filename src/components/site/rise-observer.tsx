"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Plays the staggered entrance of every `.rise` element once, as its section
// enters. The page is complete without it: content only hides after this has
// armed the document, and anything already on screen is marked in at once.
export function RiseObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".rise:not(.is-in)"));
    if (!("IntersectionObserver" in window) || nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    for (const node of nodes) {
      if (node.getBoundingClientRect().top < window.innerHeight * 0.92) node.classList.add("is-in");
      else observer.observe(node);
    }
    root.classList.add("is-armed");

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
