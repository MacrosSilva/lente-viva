"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { useOverHero } from "@/lib/use-over-hero";
import { useScrolled } from "@/lib/use-scrolled";
import { LogoMark } from "./logo-mark";
import { ThemeToggle } from "./theme-toggle";

const NAV_LINKS = [
  { href: "/", label: "Início" },
  { href: "/trabalhos", label: "Trabalhos" },
  { href: "/sobre", label: "Sobre" },
] as const;

export function Navbar() {
  const scrolled = useScrolled(40);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const overHero = useOverHero(pathname === "/");

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const solid = (scrolled && !overHero) || menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid
          ? "border-b border-line bg-paper/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:h-20 sm:px-8">
        <Link
          href="/"
          className={`flex items-center gap-2.5 text-sm font-semibold tracking-tight transition-colors duration-500 ${
            solid ? "text-ink" : "text-white"
          }`}
        >
          <LogoMark className="h-6 w-6" />
          <span className="font-mono text-[13px] uppercase tracking-[0.14em]">Lente Viva</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 text-[13px] font-medium tracking-wide transition-colors duration-500 ${
                  solid ? "text-ink-soft hover:text-ink" : "text-white/80 hover:text-white"
                } ${active ? (solid ? "!text-ink" : "!text-white") : ""}`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-current transition-all duration-300 ${
                    active ? "w-full" : "w-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle tone={solid ? "auto" : "light"} />
          <Link
            href="/contato"
            className={`hidden items-center gap-1.5 rounded-full border px-4 py-2 text-[13px] font-medium transition-all duration-300 hover:gap-2.5 sm:flex ${
              solid
                ? "border-ink text-ink hover:bg-ink hover:text-paper"
                : "border-white/60 text-white hover:bg-white hover:text-ink"
            }`}
          >
            Fale comigo
            <span aria-hidden="true">→</span>
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            className={`flex h-9 w-9 flex-col items-center justify-center gap-[5px] md:hidden ${
              solid ? "text-ink" : "text-white"
            }`}
          >
            <span
              className={`h-px w-5 bg-current transition-transform duration-300 ${
                menuOpen ? "translate-y-[3px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-5 bg-current transition-all duration-300 ${
                menuOpen ? "-translate-y-[3px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 top-16 z-40 flex flex-col bg-paper transition-all duration-300 sm:top-20 md:hidden ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex flex-1 flex-col justify-center gap-1 px-8">
          {[...NAV_LINKS, { href: "/contato", label: "Contato" } as const].map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className="border-b border-line py-5 text-3xl font-medium tracking-tight text-ink"
              style={{
                transitionDelay: `${i * 40}ms`,
                transform: menuOpen ? "translateY(0)" : "translateY(12px)",
                opacity: menuOpen ? 1 : 0,
                transition: "opacity 0.4s ease, transform 0.4s ease",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="px-8 pb-8 font-mono text-xs uppercase tracking-[0.14em] text-ink-soft">
          São Paulo, Brasil
        </p>
      </div>
    </header>
  );
}
