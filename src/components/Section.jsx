import { motion } from "framer-motion";
import RevealText from "./RevealText";

export function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Section header styled like a gate sign: number + label, then a big revealed heading.
export function SectionHeader({ id, index, eyebrow, title }) {
  return (
    <div className="mb-12">
      <Reveal>
        <p className="eyebrow mb-4 flex items-center gap-3">
          <span className="grid h-6 min-w-6 place-items-center rounded bg-accent px-1.5 text-[10px] text-on-accent">
            {index}
          </span>
          {eyebrow}
          <span className="h-px flex-1 bg-gradient-to-r from-accent/40 to-transparent" />
        </p>
      </Reveal>
      <RevealText
        as="h2"
        id={`${id}-title`}
        text={title}
        className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.02]"
      />
    </div>
  );
}

export default function Section({ id, index, eyebrow, title, children, className = "" }) {
  return (
    <section id={id} data-waypoint={index} aria-labelledby={`${id}-title`} className={`py-20 sm:py-28 ${className}`}>
      <div className="container-page">
        <SectionHeader id={id} index={index} eyebrow={eyebrow} title={title} />
        {children}
      </div>
    </section>
  );
}
