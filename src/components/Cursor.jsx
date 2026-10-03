import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useFinePointer, useReducedMotionPref } from "../hooks/useMedia";

const INTERACTIVE = "a, button, [data-cursor]";

function CursorInner() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 300, damping: 28, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 300, damping: 28, mass: 0.6 });
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);
  const [down, setDown] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("has-cursor");

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const over = (e) => {
      const el = e.target.closest(INTERACTIVE);
      setHover(Boolean(el));
      setLabel(el?.dataset.cursor || "");
    };
    const leave = () => setVisible(false);
    const press = () => setDown(true);
    const release = () => setDown(false);

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over);
    document.documentElement.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", press);
    window.addEventListener("pointerup", release);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
    };
  }, [x, y]);

  const ringScale = label ? 2.2 : hover ? 1.5 : 1;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100]" style={{ opacity: visible ? 1 : 0 }}>
      <motion.div style={{ x: ringX, y: ringY }} className="absolute left-0 top-0">
        <motion.div
          animate={{ scale: down ? ringScale * 0.85 : ringScale }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className={`absolute -ml-4 -mt-4 h-8 w-8 rounded-full border transition-colors duration-200 ${
            hover ? "border-accent bg-accent/10" : "border-fg/40"
          }`}
        />
        {label && (
          <span className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[10px] font-medium uppercase tracking-widest text-accent">
            {label}
          </span>
        )}
      </motion.div>
      <motion.div
        style={{ x, y }}
        className="absolute left-0 top-0 -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-accent"
      />
    </div>
  );
}

// Only on mouse/trackpad devices, never for reduced motion or touch.
export default function Cursor() {
  const fine = useFinePointer();
  const reduced = useReducedMotionPref();
  return fine && !reduced ? <CursorInner /> : null;
}
