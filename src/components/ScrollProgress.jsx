import { motion, useScroll, useSpring, useTransform } from "framer-motion";

// Thin "flight progress" bar under the nav: a dashed route with a plane flying along it.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const planeX = useTransform(progress, (p) => `calc(${p * 100}vw - ${p * 18}px)`);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-16 z-30 h-3">
      <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-line" />
      <motion.div
        style={{ scaleX: progress }}
        className="absolute inset-x-0 top-1/2 h-px origin-left bg-accent"
      />
      <motion.svg
        style={{ x: planeX }}
        width="18"
        height="12"
        viewBox="0 0 24 16"
        className="absolute top-0 text-accent"
      >
        <path
          fill="currentColor"
          d="M23 8c0-.8-.7-1.4-1.6-1.4H15L9.6 0H7.4l2.8 6.6H4.6L2.8 4.2H1l1.2 3.8L1 11.8h1.8l1.8-2.4h5.6L7.4 16h2.2L15 9.4h6.4c.9 0 1.6-.6 1.6-1.4z"
        />
      </motion.svg>
    </div>
  );
}
