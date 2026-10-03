# aswinpradeep.xyz

Personal portfolio and logbook (blog) for Aswin Pradeep. React + Vite + Tailwind, Framer Motion for animation, Lenis for smooth scrolling.

## Run it

```bash
npm install
npm run dev       # local dev server
npm run build     # production build into dist/ (also prerenders blog pages)
npm run deploy    # build + publish dist/ to the gh-pages branch
```

## Where things live

| What | File |
|---|---|
| All site copy (hero, about, experience, projects, skills) | `src/data/content.js` |
| Blog posts | `src/data/blogs.js` |
| Blog images | `public/blog/` |
| Colours / theme tokens | `src/index.css` (`:root` and `.dark`) |

## Adding a blog post

1. Put any images in `public/blog/<post-slug>/` (PNG, JPG or SVG).
2. Add an entry at the **top** of the `posts` array in `src/data/blogs.js`:

   ```js
   {
     slug: "my-new-post",              // URL: /blog/my-new-post
     title: "My new post",
     excerpt: "One or two sentences shown on the logbook page and in link previews.",
     date: "2026-11-01",               // YYYY-MM-DD
     readTime: "5 min read",
     cover: "/blog/my-new-post/cover.png",
     coverAlt: "What the cover shows",
     ogImage: "/blog/my-new-post/cover.png", // optional; PNG/JPG for link previews
     tags: ["Tag", "Another tag"],
     content: `Write the post in Markdown here.`,
   },
   ```

3. `npm run build` to check it, then `npm run deploy`.

**Markdown that works in `content`:** `## headings`, paragraphs, `- lists`, `1. lists`, `> quotes`, `**bold**`, `*italic*`, `` `code` ``, code blocks, `[links](https://…)`, `---`, and images with captions: `![alt text](/blog/my-new-post/pic.png "Caption")`. If a post needs a backtick, escape it as `` \` `` inside the template string.

Each post automatically gets its own page with the right title and share preview (see `scripts/prerender.mjs`).
