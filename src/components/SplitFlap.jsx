import { useEffect, useState } from "react";
import { useReducedMotionPref } from "../hooks/useMedia";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@-";

// Airport split-flap text. Each tile shuffles through random characters before
// settling, left to right. Screen readers get the plain text instead.
export default function SplitFlap({ text, length, delay = 0, className = "", cellClass = "" }) {
  const reduced = useReducedMotionPref();
  const size = length ?? text.length;
  const target = text.toUpperCase().padEnd(size).slice(0, size);
  const [shown, setShown] = useState(() => " ".repeat(size));

  useEffect(() => {
    if (reduced) return;
    let step = 0;
    let interval;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        step += 1;
        let done = true;
        const next = [...target].map((ch, i) => {
          const settleAt = ch === " " ? 1 : 3 + Math.round(i * 0.9);
          if (step >= settleAt) return ch;
          done = false;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        });
        setShown(next.join(""));
        if (done) clearInterval(interval);
      }, 55);
    }, delay);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [target, reduced, delay]);

  const display = reduced ? target : shown;

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline-flex flex-wrap gap-[2px]">
        {[...display].map((ch, i) => (
          <span key={i} className={`flap ${cellClass}`}>
            <span key={ch}>{ch === " " ? " " : ch}</span>
          </span>
        ))}
      </span>
    </span>
  );
}
