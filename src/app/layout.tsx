import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Jost } from "next/font/google";

import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";
import { getSiteUrl } from "@/lib/site-url";
import { CurtainReveal } from "@/components/site/curtain-reveal";
import { RiseObserver } from "@/components/site/rise-observer";
import "./globals.css";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["500"],
  style: ["normal", "italic"],
  variable: "--font-bodoni",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jost",
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
  themeColor: "#a6b3bc",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${bodoni.variable} ${jost.variable}`}>
      <body>
        <div data-curtain className="relative z-10 bg-bg">
          <Navbar />
          {children}
        </div>
        <Footer />
        <RiseObserver />
        <CurtainReveal />
      </body>
    </html>
  );
}
