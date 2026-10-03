import Section, { Reveal } from "./Section";
import Stamp from "./Stamp";
import { about, profile } from "../data/content";

const facts = [
  { label: "Experience", value: profile.years },
  { label: "Companies", value: "4 + freelance" },
  { label: "Based in", value: "Kochi, India" },
  { label: "Next destination", value: "Forward deployed eng.", accent: true },
];

const passport = [
  { label: "Data science", tone: "indigo", rotate: -6 },
  { label: "AI", tone: "emerald", rotate: 5 },
  { label: "Software eng", tone: "emerald", rotate: -3 },
  { label: "Airline systems", tone: "amber", rotate: 7 },
  { label: "Algo trading", tone: "rose", rotate: -8 },
];

export default function About() {
  return (
    <Section id="about" index="01" eyebrow="About · Check-in" title="Data, AI, backend. Forward deployed next.">
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <Reveal className="space-y-5 text-lg leading-relaxed text-muted">
          {about.map((p, i) => (
            <p key={p.slice(0, 24)} className={i === 0 ? "text-xl text-fg sm:text-2xl sm:leading-snug" : ""}>
              {p}
            </p>
          ))}
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="grid grid-cols-2 overflow-hidden rounded-2xl border border-line bg-surface/70 backdrop-blur-sm">
            {facts.map((f, i) => (
              <div
                key={f.label}
                className={`p-5 ${i % 2 === 0 ? "border-r" : ""} ${i < 2 ? "border-b" : ""} border-line`}
              >
                <dt className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{f.label}</dt>
                <dd className={`font-display text-lg font-semibold leading-tight ${f.accent ? "text-accent" : ""}`}>
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-5 rounded-2xl border border-dashed border-line p-5">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">Passport · domains visited</p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-4">
              {passport.map((p, i) => (
                <Stamp key={p.label} label={p.label} tone={p.tone} rotate={p.rotate} delay={i * 0.12} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
