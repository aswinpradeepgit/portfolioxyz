import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { profile, nowBuilding, destinations } from "../data/content";
import { useReducedMotionPref } from "../hooks/useMedia";
import RevealText from "./RevealText";
import SplitFlap from "./SplitFlap";
import DepartureBoard from "./DepartureBoard";
import Magnetic from "./Magnetic";
import Ticker from "./Ticker";

const DEST_LENGTH = Math.max(...destinations.map((d) => d.length));

function useCycle(length, ms) {
  const reduced = useReducedMotionPref();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setI((n) => (n + 1) % length), ms);
    return () => clearInterval(id);
  }, [length, ms, reduced]);
  return reduced ? 0 : i;
}

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
});

export default function Hero() {
  const dest = useCycle(destinations.length, 4200);

  return (
    <section aria-labelledby="hero-title" className="relative">
      <div className="container-page grid items-center gap-12 pb-16 pt-14 sm:pb-24 sm:pt-20 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <motion.p {...fadeUp(0)} className="eyebrow mb-6 flex items-center gap-3">
            <span>Gate AP</span>
            <span className="h-px w-8 bg-accent/50" />
            <span>{profile.years} · Kochi</span>
          </motion.p>

          <RevealText
            as="h1"
            id="hero-title"
            text={profile.name}
            inView={false}
            delay={0.1}
            stagger={0.12}
            className="mb-6 text-[clamp(3rem,9vw,6.5rem)] font-extrabold leading-[0.92]"
          />

          <motion.div {...fadeUp(0.35)} className="mb-7">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-muted">
              Backend engineer · next destination
            </p>
            <SplitFlap
              text={destinations[dest]}
              length={DEST_LENGTH}
              cellClass="h-6 w-[13px] text-[11px] sm:h-9 sm:w-[20px] sm:text-[16px]"
            />
          </motion.div>

          <motion.p {...fadeUp(0.45)} className="mb-8 max-w-xl text-lg leading-relaxed text-muted">
            {profile.intro}
          </motion.p>

          <motion.div {...fadeUp(0.55)} className="flex flex-wrap items-center gap-3">
            <Magnetic>
              <a href="#projects" className="btn-primary" data-cursor="Board">
                View projects
                <span aria-hidden="true">→</span>
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contact" className="btn-ghost">
                Get in touch
              </a>
            </Magnetic>
          </motion.div>
        </div>

        <motion.div {...fadeUp(0.3)} className="space-y-4">
          <DepartureBoard />
          <a
            href="#projects"
            className="group flex items-center gap-3 rounded-xl border border-line bg-surface/70 px-4 py-3 text-sm backdrop-blur-sm transition-colors hover:border-accent/60"
          >
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
              {nowBuilding.label}:
            </span>
            <span className="font-medium">{nowBuilding.title}</span>
            <span className="hidden truncate text-muted sm:inline">· gamified expense tracker</span>
            <span aria-hidden="true" className="ml-auto text-accent transition-transform group-hover:translate-x-1">→</span>
          </a>
        </motion.div>
      </div>

      <Ticker />
    </section>
  );
}
