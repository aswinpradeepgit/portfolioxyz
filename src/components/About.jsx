import Section, { Reveal } from "./Section";
import { about, profile } from "../data/content";

const facts = [
  { label: "Experience", value: profile.years },
  { label: "Based in", value: "Kochi, India" },
  { label: "Core stack", value: "Java · Spring Boot" },
  { label: "Next destination", value: "Forward deployed eng.", accent: true },
];

export default function About() {
  return (
    <Section id="about" index="01" eyebrow="About · Check-in" title="Dependable systems today. Forward deployed next.">
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
        </Reveal>
      </div>
    </Section>
  );
}
