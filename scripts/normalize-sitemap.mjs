import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const distDir = resolve(process.cwd(), "dist");
const sitemapIndexPath = resolve(distDir, "sitemap-index.xml");
const sitemapCanonicalPath = resolve(distDir, "sitemap.xml");
const site = "https://antoniopr.pages.dev";
const canonicalRoutes = ["/es/", "/en/", "/ca/", "/cv/"];

const hasIndex = await readFile(sitemapIndexPath, "utf8").then(() => true).catch(() => false);

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${canonicalRoutes
  .map((route) => `  <url><loc>${site}${route}</loc></url>`)
  .join("\n")}\n</urlset>\n`;

await writeFile(sitemapCanonicalPath, sitemapXml);

if (hasIndex) {
  const robotsPath = resolve(distDir, "robots.txt");
  const robots = await readFile(robotsPath, "utf8");
  const normalized = robots.replace(/Sitemap:\s+.*$/m, "Sitemap: https://antoniopr.pages.dev/sitemap.xml");
  await writeFile(robotsPath, normalized);
}
