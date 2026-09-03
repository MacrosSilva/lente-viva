"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState } from "react";

// Site-wide smooth scroll. Lenis animates the real window scroll position, so
// everything that reads `scrollY` / `getBoundingClientRect()` (the navbar, the
// lens hero) keeps working — it just receives the eased position. Native scroll
// is kept on touch devices and whenever the user asks for reduced motion.
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <ReactLenis
      root
      options={{
        // ~1s glide to target; lerp/duration are mutually exclusive in Lenis.
        lerp: reduced ? 1 : 0.095,
        smoothWheel: !reduced,
        wheelMultiplier: 1,
        touchMultiplier: 1.4,
      }}
    >
      {children}
    </ReactLenis>
  );
}
