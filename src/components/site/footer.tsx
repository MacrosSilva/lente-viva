import Image from "next/image";
import Link from "next/link";

import { unsplashUrl } from "@/lib/data";

// The back of the card: a postcard panel waiting under the page, uncovered as
// the content above slides off it (the wrapper in layout.tsx sits on top).
export function Footer() {
  return (
    <footer className="curtain relative bottom-0 z-0 lg:sticky bg-field-4 pb-[var(--margin)] pt-24 sm:pt-32">
      <div className="wrap">
        <div data-curtain-card className="relative mx-auto transition-[opacity,transform] duration-700 [transition-timing-function:var(--ease-out)] max-w-[1180px] bg-paper text-ink">
          {/* scallops along the top edge of the card */}
          <div aria-hidden="true" className="absolute inset-x-0 -top-[14px] flex h-[14px] items-start overflow-hidden">
            {Array.from({ length: 12 }, (_, i) => (
              <span key={i} className="aspect-square flex-1 rounded-full bg-paper" />
            ))}
          </div>

          <div className="grid gap-12 p-7 sm:p-12 lg:grid-cols-2 lg:gap-16 lg:p-16">
            <div>
              <h2 className="font-display text-[length:var(--step-head)] italic">Até a próxima luz</h2>
              <p className="mt-6 max-w-[38ch]">
                Escrevo de São Paulo, entre uma sessão e outra. Se a sua ideia tem um lugar e uma
                hora, ela já tem metade da fotografia. Me conte o resto.
              </p>
            </div>

            <div className="flex items-start justify-between gap-6">
              <address className="not-italic">
                <ul className="space-y-3 text-[length:var(--step-body)]">
                  <li>
                    <a className="transition-opacity hover:opacity-60" href="mailto:contato@lenteviva.com.br">
                      contato@lenteviva.com.br
                    </a>
                  </li>
                  <li>
                    <a className="transition-opacity hover:opacity-60" href="tel:+5511999990000">
                      +55 11 99999-0000
                    </a>
                  </li>
                  <li>
                    <Link className="transition-opacity hover:opacity-60" href="/contato">
                      São Paulo, Brasil
                    </Link>
                  </li>
                  <li>
                    <a
                      className="transition-opacity hover:opacity-60"
                      href="https://instagram.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Instagram
                    </a>
                  </li>
                </ul>
              </address>

              <div className="w-16 shrink-0 rotate-3 transition-transform duration-500 hover:rotate-0 bg-paper-2 p-1.5 sm:w-[88px]">
                <div className="relative aspect-[3/4]">
                  <Image
                    src={unsplashUrl("1447752875215-b2761acb3c5d", 200)}
                    alt="Selo: uma fotografia do portfólio"
                    fill
                    sizes="88px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          <p className="px-7 pb-6 text-center text-[length:var(--step-small)] text-muted sm:px-12">
            © {new Date().getFullYear()} Lente Viva. Vídeo do topo: “Timelapse of Clouds over
            Bellevue Canyon”, Extemporalist, CC0, via Wikimedia Commons.
          </p>
        </div>
      </div>
    </footer>
  );
}
