import { motion } from "framer-motion";

const tones = {
  amber: "text-amber-700 dark:text-amber-300",
  emerald: "text-emerald-700 dark:text-emerald-300",
  indigo: "text-indigo-700 dark:text-indigo-300",
  rose: "text-rose-700 dark:text-rose-300",
};

// Passport-style ink stamp that "thumps" down when it scrolls into view.
export default function Stamp({ label, sub, tone = "amber", rotate = -8, delay = 0, className = "" }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 1.8, rotate: rotate - 18 }}
      whileInView={{ opacity: 0.92, scale: 1, rotate }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ type: "spring", stiffness: 520, damping: 20, delay }}
      className={`inline-flex select-none flex-col items-center rounded-lg border-2 border-current px-3 py-1.5
                  font-mono uppercase leading-tight outline outline-1 outline-offset-2 outline-current ${tones[tone]} ${className}`}
    >
      <span className="text-[10px] font-medium tracking-[0.18em]">{label}</span>
      {sub && <span className="text-[8px] tracking-[0.2em] opacity-80">{sub}</span>}
    </motion.span>
  );
}
