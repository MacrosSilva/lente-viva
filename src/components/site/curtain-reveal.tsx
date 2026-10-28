"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// The footer waits under the page. Its card rises into place only as the page
// above slides off it, and stays hidden while it is fully covered.
export function CurtainReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const sheet = document.querySelector<HTMLElement>("[data-curtain]");
    const card = document.querySelector<HTMLElement>("[data-curtain-card]");
    if (!sheet || !card) return;
    // With reduced motion the footer simply follows the page (see globals.css).
    // Below 1024px the footer is in normal flow (too tall to wait under the page).
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const wide = window.matchMedia("(min-width: 1024px)");
    let frame = 0;

    const update = () => {
      frame = 0;
      if (!wide.matches) {
        card.style.opacity = "";
        card.style.transform = "";
        card.style.visibility = "";
        return;
      }
      const uncovered = window.innerHeight - sheet.getBoundingClientRect().bottom;
      // The card shows once the page has slid fully off it, so nothing of it is ever half under the page.
      const open = uncovered >= card.offsetHeight - 2;
      card.style.opacity = open ? "1" : "0";
      card.style.transform = open ? "translate3d(0,0,0)" : "translate3d(0,48px,0)";
      card.style.visibility = open ? "" : "hidden";
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
  }, [pathname]);

  return null;
}
