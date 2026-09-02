import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-paper px-4 text-center">
      <p className="font-mono text-sm uppercase tracking-[0.14em] text-ink-soft">404</p>
      <h1 className="text-3xl font-medium tracking-tight text-ink">Página não encontrada</h1>
      <p className="max-w-[40ch] text-sm text-ink-soft">
        A página que você procura não existe ou foi movida.
      </p>
      <Link
        href="/"
        className="mt-3 rounded-full border border-ink px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-paper"
      >
        Voltar ao início
      </Link>
    </div>
  );
}
