import { useEffect } from "react";
import { motion } from "framer-motion";
import { posts, formatDate } from "../data/blogs";
import Link from "../components/Link";
import Stamp from "../components/Stamp";
import Footer from "../components/Footer";

const logNo = (i) => `LOG ${String(posts.length - i).padStart(3, "0")}`;

function Entry({ post, index }) {
  const featured = index === 0;
  return (
    <motion.li
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
      className="relative grid gap-6 md:grid-cols-[9rem_1fr] md:gap-10"
    >
      {/* Timeline gutter: log number, date, a dot on the ruled margin line */}
      <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted md:pt-3 md:text-right">
        <p className="text-accent">{logNo(index)}</p>
        <p className="mt-1">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </p>
        <p className="mt-1">{post.readTime}</p>
        <span aria-hidden="true" className="absolute -left-[5px] top-4 hidden h-2.5 w-2.5 rounded-full border-2 border-accent bg-bg md:left-[calc(9rem+1.25rem-5px)] md:block" />
      </div>

      <Link
        to={`/blog/${post.slug}`}
        data-cursor="Read"
        className={`group grid gap-6 rounded-2xl border border-line bg-surface/80 p-5 shadow-[0_20px_40px_-30px_rgb(0_0_0/0.4)] backdrop-blur-sm transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-accent/50 sm:p-6 ${
          featured ? "lg:grid-cols-[1.1fr_1fr] lg:items-center" : "sm:grid-cols-[14rem_1fr] sm:items-center"
        }`}
      >
        {/* Postcard-style cover */}
        <div className="relative rotate-[-1.5deg] rounded-sm bg-white p-2 pb-6 shadow-md transition-transform duration-500 group-hover:rotate-0 dark:bg-[#f3eee3]">
          <img
            src={post.cover}
            alt={post.coverAlt}
            loading={featured ? "eager" : "lazy"}
            className="aspect-[16/9] w-full rounded-[2px] object-cover"
          />
          {featured && (
            <Stamp label="Latest entry" tone="amber" rotate={8} className="absolute -right-3 -top-4 bg-surface/90" />
          )}
        </div>

        <div>
          <h2 className={`mb-3 font-serif font-semibold leading-tight tracking-tight text-fg ${featured ? "text-3xl sm:text-4xl" : "text-2xl"}`}>
            {post.title}
          </h2>
          <p className="mb-5 font-serif text-lg leading-relaxed text-muted">{post.excerpt}</p>
          <div className="flex flex-wrap items-center gap-2">
            {post.tags.slice(0, 3).map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
            <span className="ml-auto font-mono text-xs uppercase tracking-[0.16em] text-accent">
              Read entry <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </span>
          </div>
        </div>
      </Link>
    </motion.li>
  );
}

export default function BlogList() {
  useEffect(() => {
    document.title = "Logbook · Aswin Pradeep";
  }, []);

  return (
    <>
      <main id="main" className="logbook relative">
        <div className="container-page pb-24 pt-16 sm:pt-24">
          <header className="relative mb-16 max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="eyebrow mb-5 flex items-center gap-3"
            >
              Logbook <span className="h-px w-8 bg-accent/50" /> Field notes
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="mb-5 font-serif text-[clamp(2.75rem,7vw,5rem)] font-normal italic leading-[0.95] tracking-tight"
            >
              Notes from the journey.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-xl font-serif text-xl leading-relaxed text-muted"
            >
              What I'm building, what broke, and what I learned along the way.
            </motion.p>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              {posts.length} {posts.length === 1 ? "entry" : "entries"} · newest first
            </p>
          </header>

          <ol className="relative space-y-12 md:before:absolute md:before:bottom-0 md:before:left-[calc(9rem+1.25rem)] md:before:top-0 md:before:w-px md:before:bg-gradient-to-b md:before:from-accent/50 md:before:via-line md:before:to-transparent">
            {posts.map((post, i) => (
              <Entry key={post.slug} post={post} index={i} />
            ))}
          </ol>
        </div>
      </main>
      <Footer />
    </>
  );
}
