import { useLayoutEffect, useRef } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { useReducedMotionPref } from "../hooks/useMedia";

const W = 1000;
const BASE_Y = 112;
const PLANE = "M23 8c0-.8-.7-1.4-1.6-1.4H15L9.6 0H7.4l2.8 6.6H4.6L2.8 4.2H1l1.2 3.8L1 11.8h1.8l1.8-2.4h5.6L7.4 16h2.2L15 9.4h6.4c.9 0 1.6-.6 1.6-1.4z";

// Career as a flight route: one arc per job, a plane flying it as you scroll,
// a dashed "charter" arc for freelance work, and a dashed leg to what's next.
export default function RouteMap({ stops }) {
  const reduced = useReducedMotionPref();
  const ref = useRef(null);
  const pathRef = useRef(null);
  const planeRef = useRef(null);
  const dotRefs = useRef([]);

  const n = stops.length;
  const xs = stops.map((_, i) => 70 + (i * (W - 140)) / (n - 1));
  const past = n - 1; // last stop is the future destination
  const arc = (a, b, h) => ` Q ${(xs[a] + xs[b]) / 2} ${BASE_Y - h} ${xs[b]} ${BASE_Y}`;
  let flown = `M ${xs[0]} ${BASE_Y}`;
  for (let i = 1; i < past; i++) flown += arc(i - 1, i, 70);
  const next = `M ${xs[past - 1]} ${BASE_Y}${arc(past - 1, past, 70)}`;
  const charter = `M ${xs[0]} ${BASE_Y} Q ${(xs[0] + xs[2]) / 2} -40 ${xs[2]} ${BASE_Y}`;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 40%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });

  const place = (p) => {
    const path = pathRef.current;
    if (!path || !planeRef.current) return;
    const len = path.getTotalLength();
    const at = Math.min(len, Math.max(0, p * len));
    const pt = path.getPointAtLength(at);
    const ahead = path.getPointAtLength(Math.min(len, at + 1));
    const angle = at >= len - 1 ? 0 : (Math.atan2(ahead.y - pt.y, ahead.x - pt.x) * 180) / Math.PI;
    planeRef.current.setAttribute("transform", `translate(${pt.x} ${pt.y}) rotate(${angle})`);
    path.style.strokeDashoffset = `${len - at}`;
    path.style.strokeDasharray = `${len}`;
    xs.slice(0, past).forEach((x, i) => dotRefs.current[i]?.setAttribute("data-on", pt.x >= x - 2 ? "true" : "false"));
  };
  useMotionValueEvent(progress, "change", (p) => !reduced && place(p));
  useLayoutEffect(() => {
    place(reduced ? 1 : progress.get());
  });

  return (
    <>
    {/* Phones: compact route strip */}
    <ol aria-hidden="true" className="mb-8 flex items-center gap-1.5 overflow-hidden font-mono text-[11px] uppercase tracking-[0.12em] md:hidden">
      {stops.map((s, i) => (
        <li key={s.code} className="flex items-center gap-1.5">
          <span className={`rounded-md border px-1.5 py-1 ${i === past ? "border-dashed border-accent text-accent" : i === past - 1 ? "border-accent bg-accent text-on-accent" : "border-line text-fg"}`}>
            {s.code}
          </span>
          {i < past && <span className={i === past - 1 ? "text-accent/60" : "text-muted"}>{i === past - 1 ? "⇢" : "→"}</span>}
        </li>
      ))}
    </ol>
    <div ref={ref} aria-hidden="true" className="mb-12 hidden md:block">
      <svg viewBox={`-10 -10 ${W + 20} 190`} className="w-full overflow-visible">
        {/* Freelance charter arc */}
        <path d={charter} fill="none" stroke="rgb(var(--muted))" strokeOpacity="0.5" strokeWidth="1.2" strokeDasharray="2 6" />
        <text x={(xs[0] + xs[2]) / 2} y="8" textAnchor="middle" className="fill-muted font-mono text-[11px] uppercase tracking-[0.2em]">
          charter flights · part-time freelance
        </text>

        {/* Route: dashed ghost, flown portion, and the leg still ahead */}
        <path d={flown} fill="none" stroke="rgb(var(--line))" strokeWidth="2" strokeDasharray="5 7" />
        <path ref={pathRef} d={flown} fill="none" stroke="rgb(var(--accent))" strokeWidth="2" strokeLinecap="round" />
        <path d={next} fill="none" stroke="rgb(var(--accent))" strokeOpacity="0.45" strokeWidth="2" strokeDasharray="2 8" strokeLinecap="round" />

        {stops.map((s, i) => {
          const future = i === past;
          const current = i === past - 1;
          return (
            <g key={s.code} transform={`translate(${xs[i]} ${BASE_Y})`}>
              {current && !reduced && (
                <circle r="14" className="fill-none stroke-accent/50" strokeWidth="1.5">
                  <animate attributeName="r" values="8;18;8" dur="2.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="1;0;1" dur="2.4s" repeatCount="indefinite" />
                </circle>
              )}
              <circle
                ref={(el) => (dotRefs.current[i] = el)}
                r="7"
                data-on={reduced ? "true" : "false"}
                strokeWidth="2"
                strokeDasharray={future ? "3 3" : undefined}
                className="fill-bg stroke-accent transition-[fill] duration-300 data-[on=true]:fill-accent"
              />
              <text y="38" textAnchor="middle" className={`font-display text-[22px] font-extrabold ${future ? "fill-accent" : "fill-fg"}`}>
                {s.code}
              </text>
              <text y="58" textAnchor="middle" className="fill-muted font-mono text-[11px] uppercase tracking-[0.16em]">
                {s.years}
              </text>
            </g>
          );
        })}

        {!reduced && (
          <g ref={planeRef}>
            <circle r="13" className="fill-bg" />
            <path transform="translate(-12 -8)" className="fill-accent" d={PLANE} />
          </g>
        )}
      </svg>
    </div>
    </>
  );
}
