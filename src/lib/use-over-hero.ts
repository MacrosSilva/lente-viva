"use client";

import { useEffect, useState } from "react";

// True while the lens-scroll hero (`#hero-lens-scroll`) still covers the top of
// the viewport. The navbar uses it to stay transparent (white text) over the
// dark hero for its whole scroll span, then go solid once real content starts.
export function useOverHero(enabled: boolean): boolean {
  const [over, setOver] = useState(enabled);

  useEffect(() => {
    if (!enabled) {
      setOver(false);
      return;
    }
    let ticking = false;
    const check = () => {
      ticking = false;
      const el = document.getElementById("hero-lens-scroll");
      if (!el) {
        setOver(false);
        return;
      }
      // Bottom still past the navbar band => the hero owns the backdrop.
      setOver(el.getBoundingClientRect().bottom > 80);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [enabled]);

  return over;
}
