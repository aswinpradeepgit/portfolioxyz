import Section, { Reveal } from "./Section";
import RouteMap from "./RouteMap";
import Stamp from "./Stamp";
import { experience, freelance } from "../data/content";

const [current, ...previous] = experience;
const stops = [...experience].reverse().map(({ code, years }) => ({ code, years }));
stops.push({ code: "FDE", years: "next" });

function CurrentLeg({ job }) {
  return (
    <article className="card card-hover relative overflow-hidden p-0 sm:p-0">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-board px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-board-ink sm:px-7">
        <span>Now cruising · {job.period}</span>
        <span className="flex items-center gap-2 text-board-amber">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-board-amber motion-reduce:animate-none" />
          Current role
        </span>
      </div>

      <div className="relative p-6 sm:p-7">
        <Stamp
          label={job.stamp.label}
          sub={job.code}
          tone={job.stamp.tone}
          rotate={-9}
          className="absolute right-6 top-6 hidden sm:inline-flex"
        />
        <header className="mb-6 flex flex-col gap-1 sm:pr-40">
          <h3 className="text-2xl font-bold">
            {job.role} <span className="text-accent">@ {job.company}</span>
          </h3>
          <p className="text-sm text-muted">{job.summary}</p>
        </header>

        <ul className="mb-7 grid gap-x-10 gap-y-3 text-muted md:grid-cols-2">
          {job.points.map((point, i) => (
            <li key={point} className="flex gap-3 leading-relaxed">
              <span aria-hidden="true" className="mt-0.5 font-mono text-xs text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              {point}
            </li>
          ))}
        </ul>

        <ul className="flex flex-wrap gap-2" aria-label="Technologies">
          {job.tags.map((tag) => (
            <li key={tag} className="tag hover:border-accent hover:text-accent">{tag}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function PastLeg({ job, index }) {
  return (
    <article className="card card-hover group relative flex h-full flex-col overflow-hidden">
      <div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true" className="text-emerald-600 dark:text-emerald-400">✓</span> Arrived
        </span>
        <span>{job.period}</span>
      </div>

      <div className="mb-4 flex items-start justify-between gap-3">
        <p aria-hidden="true" className="font-display text-4xl font-extrabold leading-none text-fg/90">
          {job.code}
        </p>
        <Stamp label={job.stamp.label} tone={job.stamp.tone} rotate={index % 2 ? 7 : -7} delay={0.1 + index * 0.08} />
      </div>

      <h3 className="text-lg font-bold leading-snug">{job.role}</h3>
      <p className="mb-1 font-medium text-accent">{job.company}</p>
      {job.location && <p className="mb-3 font-mono text-xs text-muted">{job.location}</p>}
      <p className="mb-5 flex-1 leading-relaxed text-muted">{job.summary}</p>

      <ul className="flex flex-wrap gap-2" aria-label="Focus areas">
        {job.tags.map((tag) => (
          <li key={tag} className="tag group-hover:border-accent/30">{tag}</li>
        ))}
      </ul>
    </article>
  );
}

function CharterLeg() {
  return (
    <article className="relative grid gap-5 rounded-2xl border-2 border-dashed border-line p-6 transition-colors hover:border-accent/50 sm:p-7 md:grid-cols-[1fr_auto] md:items-center md:gap-10">
      <div>
        <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">Charter flights · {freelance.period}</p>
        <h3 className="mb-2 text-lg font-bold">{freelance.title}</h3>
        <p className="leading-relaxed text-muted">{freelance.summary}</p>
      </div>
      <div className="flex flex-wrap items-center gap-3 md:max-w-sm md:justify-end">
        <ul className="flex flex-wrap gap-2 md:justify-end" aria-label="Focus areas">
          {freelance.tags.map((tag) => (
            <li key={tag} className="tag">{tag}</li>
          ))}
        </ul>
        <Stamp label={freelance.stamp.label} tone={freelance.stamp.tone} rotate={6} delay={0.15} />
      </div>
    </article>
  );
}

export default function Experience() {
  return (
    <Section id="experience" index="02" eyebrow="Experience · Flight history" title="Four stops, one direction">
      <RouteMap stops={stops} />

      <div className="space-y-6">
        <Reveal>
          <CurrentLeg job={current} />
        </Reveal>

        <div>
          <Reveal>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-muted">Previous legs</p>
          </Reveal>
          <ul className="grid gap-5 md:grid-cols-3">
            {previous.map((job, i) => (
              <li key={job.company}>
                <Reveal delay={i * 0.08} className="h-full">
                  <PastLeg job={job} index={i} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <Reveal>
          <CharterLeg />
        </Reveal>
      </div>
    </Section>
  );
}
