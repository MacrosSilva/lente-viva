import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Outfit } from "next/font/google";

import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";
import { SmoothScroll } from "@/components/site/smooth-scroll";
import { getSiteUrl } from "@/lib/site-url";
import { THEME_BOOTSTRAP_SCRIPT } from "@/lib/use-theme";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
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
  themeColor: "#121110",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // No className on <html> on purpose: the blocking bootstrap script below
    // sets `.dark` on the real DOM before first paint. If React also asserted
    // a class here, hydration would fight the script's correction and cause a
    // flash. suppressHydrationWarning covers the attribute React doesn't own.
    <html lang="pt-BR" suppressHydrationWarning className={`${outfit.variable} ${ibmPlexMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP_SCRIPT }} />
      </head>
      <body className="bg-paper text-ink">
        <SmoothScroll>
          <Navbar />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
