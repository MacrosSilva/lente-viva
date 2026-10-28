"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";


const NAV_LINKS = [
  { href: "/trabalhos", label: "Trabalhos" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
] as const;

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

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

  // The home page carries its own top row inside the opening sheet.
  if (pathname === "/") return null;

  return (
    <header className="relative z-50 bg-bg">
      <div className="wrap grid h-[72px] grid-cols-[1fr_auto_1fr] items-center gap-4 sm:h-[84px]">
        <Link
          href="/"
          className="flex items-center gap-2.5 justify-self-start text-ink transition-opacity hover:opacity-70"
        >
                    <span className="font-display text-[1.75rem] leading-none">Lente Viva</span>
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`relative py-1 text-[length:var(--step-small)] text-ink transition-opacity hover:opacity-60 ${
                  active ? "underline decoration-2 underline-offset-[6px]" : ""
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="col-start-3 flex items-center justify-self-end gap-3">
          <Link
            href="/contato"
            className="hidden h-11 items-center bg-ink px-5 text-[length:var(--step-small)] font-semibold text-bg transition-[transform,background-color] duration-300 hover:bg-[#2b350b] active:scale-[0.97] sm:inline-flex"
          >
            Reservar uma sessão
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            aria-controls="menu-movel"
            className="flex h-11 w-11 flex-col items-center justify-center gap-[6px] bg-ink text-bg md:hidden"
          >
            <span
              className={`h-[2px] w-5 bg-current transition-transform duration-300 ${
                menuOpen ? "translate-y-[4px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-[2px] w-5 bg-current transition-transform duration-300 ${
                menuOpen ? "-translate-y-[4px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <div
        id="menu-movel"
        className={`fixed inset-0 z-[60] flex flex-col bg-bg transition-opacity duration-300 md:hidden ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="flex h-[72px] items-center justify-end px-4">
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            tabIndex={menuOpen ? undefined : -1}
            className="h-11 bg-ink px-5 text-[length:var(--step-body)] text-bg"
          >
            Fechar
          </button>
        </div>
        <nav aria-label="Menu" className="flex flex-1 flex-col justify-center gap-2 px-6">
          {[{ href: "/", label: "Início" } as const, ...NAV_LINKS].map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              tabIndex={menuOpen ? undefined : -1}
              onClick={() => setMenuOpen(false)}
              className="font-display py-3 text-[length:var(--step-head)] text-ink"
              style={{
                transitionDelay: `${i * 50}ms`,
                transform: menuOpen ? "translateY(0)" : "translateY(14px)",
                opacity: menuOpen ? 1 : 0,
                transition: "opacity 0.4s ease, transform 0.4s ease",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="px-6 pb-8 text-[length:var(--step-body)] text-muted">São Paulo, Brasil</p>
      </div>
    </header>
  );
}
