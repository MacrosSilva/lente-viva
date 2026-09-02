import Link from "next/link";

import { categories } from "@/lib/data";
import { LogoMark } from "./logo-mark";

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 text-ink">
              <LogoMark className="h-6 w-6" />
              <span className="font-mono text-[13px] uppercase tracking-[0.14em]">
                Lente Viva
              </span>
            </div>
            <p className="mt-4 max-w-[38ch] text-sm leading-relaxed text-ink-soft">
              Fotografia de retrato, paisagem, eventos e editorial, feita com luz disponível
              sempre que possível.
            </p>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-soft">
              Trabalhos
            </p>
            <ul className="mt-4 space-y-3">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href="/trabalhos"
                    className="text-sm text-ink transition-opacity hover:opacity-60"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-soft">
              Contato
            </p>
            <ul className="mt-4 space-y-3 text-sm text-ink">
              <li>
                <a href="mailto:contato@lenteviva.com.br" className="hover:opacity-60">
                  contato@lenteviva.com.br
                </a>
              </li>
              <li>
                <a href="tel:+5511999990000" className="hover:opacity-60">
                  +55 11 99999-0000
                </a>
              </li>
              <li className="text-ink-soft">São Paulo, Brasil</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 text-xs text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Lente Viva. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="https://instagram.com" className="hover:text-ink" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href="https://behance.net" className="hover:text-ink" target="_blank" rel="noreferrer">
              Behance
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
