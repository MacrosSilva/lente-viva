import Link from "next/link";

// A single quiet line after the page has made its invitation.
export function Footer() {
  return (
    <footer className="bg-bg px-[var(--margin)] pb-[30px] pt-[16svh] text-[length:var(--step-small)] sm:px-8">
      <div className="grid gap-2 sm:grid-cols-[1fr_auto_1fr] sm:items-baseline sm:gap-6">
        <p className="text-muted">Lente Viva, fotografia em São Paulo</p>
        <nav aria-label="Rodapé" className="flex flex-wrap gap-x-6 gap-y-1">
          <Link href="/trabalhos" className="underline-offset-4 hover:underline">Trabalhos</Link>
          <Link href="/sobre" className="underline-offset-4 hover:underline">Sobre</Link>
          <Link href="/contato" className="underline-offset-4 hover:underline">Contato</Link>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">Instagram</a>
        </nav>
        <p className="text-muted sm:justify-self-end">© {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
