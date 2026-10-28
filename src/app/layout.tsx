import type { Metadata, Viewport } from "next";
import { Literata, Rokkitt } from "next/font/google";

import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";
import { getSiteUrl } from "@/lib/site-url";
import { RiseObserver } from "@/components/site/rise-observer";
import "./globals.css";

const rokkitt = Rokkitt({
  subsets: ["latin"],
  weight: ["800"],
  variable: "--font-rokkitt",
  display: "swap",
});

const literata = Literata({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-literata",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Lente Viva · Fotografia",
    template: "%s",
  },
  description: "Portfólio de fotografia de retrato, paisagem, eventos e editorial.",
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Lente Viva · Fotografia",
    description: "Portfólio de fotografia de retrato, paisagem, eventos e editorial.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  themeColor: "#ecebe7",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${rokkitt.variable} ${literata.variable}`}>
      <body>
        <div className="bg-bg">
          <Navbar />
          {children}
        </div>
        <Footer />
        <RiseObserver />
      </body>
    </html>
  );
}
