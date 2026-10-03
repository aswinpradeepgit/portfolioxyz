import { useEffect } from "react";
import { motion } from "framer-motion";
import { posts, formatDate } from "../data/blogs";
import { Markdown } from "../lib/markdown";
import Link from "../components/Link";
import Stamp from "../components/Stamp";
import Footer from "../components/Footer";

function NotFound() {
  return (
    <main id="main" className="container-page flex min-h-[70vh] flex-col items-start justify-center gap-4 py-24">
      <p className="eyebrow">Gate closed</p>
      <h1 className="font-serif text-5xl italic">This entry isn't in the logbook.</h1>
      <Link to="/blog" className="btn-ghost mt-4">← Back to the logbook</Link>
    </main>
  );
}

function OtherEntry({ post, label, align = "left" }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className={`group flex flex-col gap-2 rounded-2xl border border-dashed border-line p-5 transition-colors hover:border-accent/60 ${align === "right" ? "sm:items-end sm:text-right" : ""}`}
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{label}</span>
      <span className="font-serif text-xl font-semibold leading-snug group-hover:text-accent">{post.title}</span>
    </Link>
  );
}

export default function BlogPost({ slug }) {
  const index = posts.findIndex((p) => p.slug === slug);
  const post = posts[index];

  useEffect(() => {
    document.title = post ? `${post.title} · Aswin Pradeep` : "Not found · Aswin Pradeep";
  }, [post]);

  if (!post) return <NotFound />;

  const newer = posts[index - 1];
  const older = posts[index + 1];
  const logNo = `LOG ${String(posts.length - index).padStart(3, "0")}`;

  return (
    <>
      <main id="main" className="logbook relative">
        <article className="container-page pb-20 pt-12 sm:pt-16">
          <Link to="/blog" className="mb-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-muted hover:text-accent">
            <span aria-hidden="true">←</span> Logbook
          </Link>

          <header className="mx-auto mb-12 max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted"
            >
              <span className="text-accent">{logNo}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readTime}</span>
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
              className="mb-6 font-serif text-[clamp(2.25rem,5.5vw,3.75rem)] font-semibold leading-[1.05] tracking-tight"
            >
              {post.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6 font-serif text-xl italic leading-relaxed text-muted"
            >
              {post.excerpt}
            </motion.p>
            <ul className="flex flex-wrap gap-2" aria-label="Tags">
              {post.tags.map((t) => (
                <li key={t} className="tag">{t}</li>
              ))}
            </ul>
          </header>

          <motion.figure
            initial={{ opacity: 0, y: 30, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: -1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
            className="relative mx-auto mb-14 max-w-4xl rounded-sm bg-white p-3 pb-10 shadow-xl dark:bg-[#f3eee3]"
          >
            <img src={post.cover} alt={post.coverAlt} className="aspect-[16/8] w-full rounded-[2px] object-cover" />
            <Stamp label="Logbook" sub={formatDate(post.date)} tone="amber" rotate={-10} className="absolute -bottom-5 right-6 bg-[#fffdf8] dark:!text-amber-700" />
          </motion.figure>

          <div className="prose-log mx-auto max-w-[68ch]">
            <Markdown source={post.content} />
          </div>

          <footer className="mx-auto mt-16 max-w-3xl border-t border-dashed border-line pt-10">
            <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">End of entry · {logNo}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {older ? <OtherEntry post={older} label="← Earlier entry" /> : <span />}
              {newer && <OtherEntry post={newer} label="Later entry →" align="right" />}
            </div>
          </footer>
        </article>
      </main>
      <Footer />
    </>
  );
}
