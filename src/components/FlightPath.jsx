import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionValue, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { useMediaQuery, useReducedMotionPref } from "../hooks/useMedia";

const W = 80;
const PLANE = "M23 8c0-.8-.7-1.4-1.6-1.4H15L9.6 0H7.4l2.8 6.6H4.6L2.8 4.2H1l1.2 3.8L1 11.8h1.8l1.8-2.4h5.6L7.4 16h2.2L15 9.4h6.4c.9 0 1.6-.6 1.6-1.4z";

// Smooth curve weaving between the section waypoints (always heading down).
function buildPath(points) {
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1];
    const b = points[i];
    const mid = (b.y - a.y) / 2;
    d += ` C ${a.x} ${a.y + mid}, ${b.x} ${b.y - mid}, ${b.x} ${b.y}`;
  }
  return d;
}

function Path({ containerRef }) {
  const reduced = useReducedMotionPref();
  const [geo, setGeo] = useState(null);
  const pathRef = useRef(null);
  const planeRef = useRef(null);
  const dotRefs = useRef([]);
  const drawn = useMotionValue(reduced ? 1 : 0);

  // Plain effect: the container's ref is attached after this child's layout effects run.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => {
      const top = el.getBoundingClientRect().top + window.scrollY;
      const waypoints = [...el.querySelectorAll("[data-waypoint]")].map((s, i) => ({
        x: i % 2 === 0 ? 22 : W - 22,
        y: s.getBoundingClientRect().top + window.scrollY - top + 110,
        label: s.dataset.waypoint,
      }));
      if (waypoints.length < 2) return;
      const start = { x: W / 2, y: Math.max(0, waypoints[0].y - 320) };
      setGeo({ top, h: el.offsetHeight, d: buildPath([start, ...waypoints]), waypoints });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [containerRef]);

  const { scrollY } = useScroll();
  const smoothY = useSpring(scrollY, { stiffness: 140, damping: 30, restDelta: 0.5 });

  // Put the plane on the path at the height of the viewport's middle.
  const place = (sy) => {
    const path = pathRef.current;
    if (!path || !planeRef.current || !geo) return;
    const total = path.getTotalLength();
    const targetY = sy + window.innerHeight * 0.55 - geo.top;
    let lo = 0;
    let hi = total;
    for (let i = 0; i < 18; i++) {
      const mid = (lo + hi) / 2;
      if (path.getPointAtLength(mid).y < targetY) lo = mid;
      else hi = mid;
    }
    const pt = path.getPointAtLength(lo);
    const ahead = path.getPointAtLength(Math.min(total, lo + 2));
    const angle = lo >= total - 1 ? 90 : (Math.atan2(ahead.y - pt.y, ahead.x - pt.x) * 180) / Math.PI;
    planeRef.current.setAttribute("transform", `translate(${pt.x} ${pt.y}) rotate(${angle})`);
    planeRef.current.style.opacity = lo > 0 ? 1 : 0;
    drawn.set(lo / total);
    geo.waypoints.forEach((w, i) => {
      dotRefs.current[i]?.setAttribute("data-on", pt.y >= w.y - 2 ? "true" : "false");
    });
  };

  useMotionValueEvent(smoothY, "change", (v) => !reduced && place(v));
  useLayoutEffect(() => {
    if (!reduced) place(smoothY.get());
  });

  if (!geo) return null;

  return (
    <svg
      aria-hidden="true"
      width={W}
      height={geo.h}
      viewBox={`0 0 ${W} ${geo.h}`}
      className="pointer-events-none absolute top-0 z-0"
      style={{ left: `max(8px, calc((100vw - 1100px) / 2 - ${W + 8}px))` }}
    >
      <path d={geo.d} fill="none" stroke="rgb(var(--line))" strokeWidth="1.5" strokeDasharray="4 6" />
      <motion.path
        ref={pathRef}
        d={geo.d}
        fill="none"
        stroke="rgb(var(--accent))"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{ pathLength: drawn }}
      />
      {geo.waypoints.map((w, i) => (
        <g key={w.label} transform={`translate(${w.x} ${w.y})`}>
          <circle
            ref={(n) => (dotRefs.current[i] = n)}
            r="5"
            data-on={reduced ? "true" : "false"}
            className="fill-bg stroke-accent transition-[fill] duration-300 data-[on=true]:fill-accent"
            strokeWidth="1.5"
          />
          <text
            x={i % 2 === 0 ? 12 : -12}
            y="3.5"
            textAnchor={i % 2 === 0 ? "start" : "end"}
            className="fill-muted font-mono text-[9px] tracking-widest"
          >
            {w.label}
          </text>
        </g>
      ))}
      {!reduced && (
        <g ref={planeRef} style={{ opacity: 0, transition: "opacity 300ms" }}>
          <circle r="11" className="fill-bg" />
          <path transform="translate(-9 -6) scale(0.75)" className="fill-accent" d={PLANE} />
        </g>
      )}
    </svg>
  );
}

// Only on wide screens where there's a gutter to fly through.
export default function FlightPath({ containerRef }) {
  const wide = useMediaQuery("(min-width: 1280px)");
  return wide ? <Path containerRef={containerRef} /> : null;
}
