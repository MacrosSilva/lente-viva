import Link from "next/link";

import { getProject } from "@/lib/data";
import { Photo } from "./photo";

// A strip cut from the contact sheet: a few frames side by side, each marked
// with the hour of its light and linked to its series.
export function ContactStrip({ slugs, heading }: { slugs: string[]; heading: string }) {
  const frames = slugs.map((slug) => getProject(slug)!).filter(Boolean);
  return (
    <section aria-labelledby="tira" className="pb-[clamp(80px,10vw,160px)]">
      <div className="wrap">
        <h2 id="tira" className="rise font-display mb-10 text-[length:var(--step-head)]">
          {heading}
        </h2>
        <ul className="grid grid-cols-2 gap-3 bg-ink p-3 lg:grid-cols-4">
          {frames.map((p, i) => (
            <li key={p.slug} className="rise" style={{ ["--i" as string]: i }}>
              <Link href={`/trabalhos/${p.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-paper-2">
                  <Photo
                    id={p.cover.id}
                    alt={p.cover.alt}
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <p className="mt-2 text-[length:var(--step-small)] text-bg">
                  {p.hour}, {p.title}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
