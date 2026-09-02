// Resolves the site's own public URL from Vercel's env vars so robots.txt /
// sitemap.xml / metadataBase never hardcode a domain. Falls back to
// localhost for local dev.
export function getSiteUrl(): string {
  const host =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000");
  return host.replace(/\/$/, "");
}
