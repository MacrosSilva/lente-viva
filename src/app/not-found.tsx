import Link from "next/link";

export default function NotFound() {
  return (
    <main className="wrap flex min-h-[70svh] items-center justify-center py-24">
      <div className="max-w-[620px] bg-paper px-8 py-14 text-center sm:px-14">
        <h1 className="font-display text-[length:var(--step-head)]">Página não encontrada</h1>
        <p className="mx-auto mt-5 max-w-[36ch]">
          Este quadro não está na folha de contato. Talvez tenha sido movido.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex h-11 items-center bg-ink px-6 text-[length:var(--step-small)] font-semibold text-bg transition-[background-color,transform] hover:bg-[#2b350b] active:scale-[0.97]"
        >
          Voltar ao início
        </Link>
      </div>
    </main>
  );
}
