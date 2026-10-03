import { useEffect } from "react";
import Lenis from "lenis";
import { useReducedMotionPref } from "../hooks/useMedia";

const NAV_OFFSET = -72;

// Lenis smooth scrolling + smooth in-page anchor links. Off for reduced motion.
export default function SmoothScroll() {
  const reduced = useReducedMotionPref();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
    let frame;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    const onClick = (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link || link.getAttribute("href") === "#main") return; // let the skip link work natively
      const id = link.getAttribute("href");
      const target = id === "#top" ? 0 : document.querySelector(id);
      if (target === null) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: NAV_OFFSET, duration: 1.4 });
      history.replaceState(null, "", id);
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [reduced]);

  return null;
}
