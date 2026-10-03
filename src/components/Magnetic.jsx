import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useFinePointer, useReducedMotionPref } from "../hooks/useMedia";

// Pulls its child gently toward the cursor while hovered.
export default function Magnetic({ children, strength = 0.3 }) {
  const ref = useRef(null);
  const fine = useFinePointer();
  const reduced = useReducedMotionPref();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 15, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 15, mass: 0.4 });

  if (!fine || reduced) return children;

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x, y }}
      className="inline-block"
    >
      {children}
    </motion.span>
  );
}
