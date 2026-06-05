import { copyFile, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const distDir = resolve(process.cwd(), "dist");
const sitemapIndexPath = resolve(distDir, "sitemap-index.xml");
const sitemapSinglePath = resolve(distDir, "sitemap-0.xml");
const sitemapCanonicalPath = resolve(distDir, "sitemap.xml");

const hasIndex = await readFile(sitemapIndexPath, "utf8").then(() => true).catch(() => false);
const hasSingle = await readFile(sitemapSinglePath, "utf8").then(() => true).catch(() => false);

if (hasSingle) {
  await copyFile(sitemapSinglePath, sitemapCanonicalPath);
}

if (hasIndex && hasSingle) {
  const robotsPath = resolve(distDir, "robots.txt");
  const robots = await readFile(robotsPath, "utf8");
  const normalized = robots.replace(/Sitemap:\s+.*$/m, "Sitemap: https://antoniopr.pages.dev/sitemap.xml");
  await writeFile(robotsPath, normalized);
}
