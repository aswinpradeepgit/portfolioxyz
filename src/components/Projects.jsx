import { useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import Section, { SectionHeader } from "./Section";
import { projects } from "../data/content";
import { useDesktop, useFinePointer, useReducedMotionPref } from "../hooks/useMedia";

const TITLE = "Things I'm building";
const EYEBROW = "Projects · Boarding";

function BoardingPass({ project, index, tilt }) {
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const flight = `AP ${201 + index}`;

  const onMove = (e) => {
    if (!tilt) return;
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 10);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 10);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.article
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      data-cursor=""
      className="group relative flex h-full w-full overflow-hidden rounded-2xl border border-line bg-surface
                 shadow-[0_20px_50px_-30px_rgb(0_0_0/0.45)] transition-[border-color,box-shadow] duration-300
                 hover:border-accent/50 hover:shadow-[0_30px_60px_-30px_rgb(var(--accent)/0.45)]"
    >
      {/* Main ticket */}
      <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-7">
        <div className="mb-5 flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          <span>Boarding pass</span>
          <span className="rounded-full bg-accent-soft px-2.5 py-1 font-medium tracking-[0.1em] text-accent">
            {project.status}
          </span>
        </div>

        <div aria-hidden="true" className="mb-5 flex items-center gap-3 font-display text-2xl font-extrabold sm:text-4xl">
          <span>COK</span>
          <span className="relative h-px flex-1 border-t border-dashed border-line">
            <span className="absolute inset-0 transition-transform duration-700 ease-out group-hover:translate-x-[calc(100%-18px)]">
            <svg
              width="18"
              height="12"
              viewBox="0 0 24 16"
              className="absolute -top-[7px] left-0 text-accent"
            >
              <path fill="currentColor" d="M23 8c0-.8-.7-1.4-1.6-1.4H15L9.6 0H7.4l2.8 6.6H4.6L2.8 4.2H1l1.2 3.8L1 11.8h1.8l1.8-2.4h5.6L7.4 16h2.2L15 9.4h6.4c.9 0 1.6-.6 1.6-1.4z" />
            </svg>
            </span>
          </span>
          <span className="text-accent">{project.code}</span>
        </div>

        <h3 className="mb-2 text-xl font-bold sm:text-2xl">{project.title}</h3>
        <p className="mb-6 flex-1 leading-relaxed text-muted">{project.description}</p>

        <dl className="mb-5 grid grid-cols-3 gap-3 border-t border-dashed border-line pt-4 font-mono text-[10px] uppercase tracking-[0.15em]">
          <div>
            <dt className="text-muted">Flight</dt>
            <dd className="mt-1 text-xs text-fg">{flight}</dd>
          </div>
          <div>
            <dt className="text-muted">Gate</dt>
            <dd className="mt-1 text-xs text-fg">{String(index + 1).padStart(2, "0")}</dd>
          </div>
          <div>
            <dt className="text-muted">Seat</dt>
            <dd className="mt-1 text-xs text-fg">1A</dd>
          </div>
        </dl>

        <ul className="flex flex-wrap gap-2" aria-label="Tags">
          {project.tags.map((tag) => (
            <li key={tag} className="tag group-hover:border-accent/30">{tag}</li>
          ))}
        </ul>
      </div>

      {/* Perforation with notches */}
      <div aria-hidden="true" className="perforation relative w-3 shrink-0">
        <span className="absolute -top-3 left-1/2 h-6 w-6 -translate-x-1/2 rounded-full border border-line bg-bg" />
        <span className="absolute -bottom-3 left-1/2 h-6 w-6 -translate-x-1/2 rounded-full border border-line bg-bg" />
      </div>

      {/* Stub */}
      <div
        aria-hidden="true"
        className="flex w-14 shrink-0 flex-col items-center justify-between py-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted
                   transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:rotate-[4deg] sm:w-28"
      >
        <span className="hidden sm:block">{flight}</span>
        <span className="font-display text-2xl font-extrabold tracking-normal text-fg [writing-mode:vertical-rl] sm:text-3xl">
          {project.code}
        </span>
        <span className="barcode h-10 w-8 text-fg/80 sm:w-16" />
      </div>
    </motion.article>
  );
}

function PinnedProjects() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [distance, setDistance] = useState(0);
  const fine = useFinePointer();

  useLayoutEffect(() => {
    const measure = () => {
      if (trackRef.current) setDistance(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section
      id="projects"
      ref={sectionRef}
      data-waypoint="03"
      aria-labelledby="projects-title"
      style={{ height: `calc(100vh + ${distance}px)` }}
      className="relative"
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-16">
        <div className="container-page">
          <SectionHeader id="projects" index="03" eyebrow={EYEBROW} title={TITLE} />
        </div>

        <motion.ul
          ref={trackRef}
          style={{ x }}
          className="flex w-max gap-6 pl-[max(1.25rem,calc((100vw-1100px)/2+2rem))] pr-[8vw]"
        >
          {projects.map((p, i) => (
            <li key={p.title} className="w-[min(560px,80vw)]">
              <BoardingPass project={p} index={i} tilt={fine} />
            </li>
          ))}
          <li className="flex w-[300px] flex-col justify-center gap-4 pl-4">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Next departure</p>
            <p className="font-display text-3xl font-bold leading-tight">Your team, maybe?</p>
            <a href="#contact" className="btn-primary self-start" data-cursor="Hello">
              Let's talk <span aria-hidden="true">→</span>
            </a>
          </li>
        </motion.ul>

        <div aria-hidden="true" className="container-page mt-10 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          <span>Scroll to taxi</span>
          <div className="h-px flex-1 bg-line">
            <motion.div style={{ scaleX: bar }} className="h-px origin-left bg-accent" />
          </div>
          <span>{String(projects.length).padStart(2, "0")} passes</span>
        </div>
      </div>
    </section>
  );
}

export default function Projects() {
  const desktop = useDesktop();
  const reduced = useReducedMotionPref();

  if (desktop && !reduced) return <PinnedProjects />;

  // Mobile: native swipe row. Reduced motion on desktop: plain grid.
  return (
    <Section id="projects" index="03" eyebrow={EYEBROW} title={TITLE}>
      <ul
        className={
          desktop
            ? "grid gap-6 lg:grid-cols-2"
            : "-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none]"
        }
      >
        {projects.map((p, i) => (
          <li key={p.title} className={desktop ? "" : "w-[86vw] max-w-[440px] shrink-0 snap-center"}>
            <BoardingPass project={p} index={i} tilt={false} />
          </li>
        ))}
      </ul>
      {!desktop && (
        <p aria-hidden="true" className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          Swipe for more passes →
        </p>
      )}
    </Section>
  );
}
