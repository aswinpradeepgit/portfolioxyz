// Runs after `vite build`. GitHub Pages has no SPA fallback, so a direct visit to
// /blog/some-post would 404. This writes a real dist/blog/.../index.html for every
// route (same app shell, with the right <title>, description and share tags), plus
// a 404.html fallback for anything else.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { posts } from "../src/data/blogs.js";

const SITE = "https://aswinpradeep.xyz";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const shell = readFileSync(join(dist, "index.html"), "utf8");

const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

function page({ path, title, description, image }) {
  const url = `${SITE}${path}`;
  let html = shell
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${esc(description)}`)
    .replace(/(<link rel="canonical" href=")[^"]*/, `$1${url}`)
    .replace(/(<meta property="og:url" content=")[^"]*/, `$1${url}`)
    .replace(/(<meta property="og:type" content=")[^"]*/, `$1${path.startsWith("/blog/") ? "article" : "website"}`);
  for (const key of ['property="og:title"', 'name="twitter:title"']) {
    html = html.replace(new RegExp(`(<meta ${key} content=")[^"]*`), `$1${esc(title)}`);
  }
  for (const key of ['property="og:description"', 'name="twitter:description"']) {
    html = html.replace(new RegExp(`(<meta ${key} content=")[^"]*`), `$1${esc(description)}`);
  }
  if (image) {
    for (const key of ['property="og:image"', 'name="twitter:image"']) {
      html = html.replace(new RegExp(`(<meta ${key} content=")[^"]*`), `$1${SITE}${image}`);
    }
    html = html.replace(/\s*<meta property="og:image:(width|height)" content="[^"]*" \/>/g, "");
  }
  const file = join(dist, path, "index.html");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  return path;
}

const written = [
  page({
    path: "/blog",
    title: "Logbook · Aswin Pradeep",
    description: "Notes from the journey: what Aswin Pradeep is building, what broke, and what he learned along the way.",
  }),
  ...posts.map((p) =>
    page({
      path: `/blog/${p.slug}`,
      title: `${p.title} · Aswin Pradeep`,
      description: p.excerpt,
      image: p.ogImage || (/\.(png|jpe?g)$/i.test(p.cover) ? p.cover : undefined),
    })
  ),
];
writeFileSync(join(dist, "404.html"), shell);

console.log(`prerender: wrote ${written.join(", ")} + 404.html`);
