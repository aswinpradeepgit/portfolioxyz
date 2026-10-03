import Section, { Reveal } from "./Section";
import { experience } from "../data/content";

export default function Experience() {
  return (
    <Section id="experience" index="02" eyebrow="Experience · In flight" title="Where I work">
      <div className="space-y-6">
        {experience.map((job) => (
          <Reveal key={job.company}>
            <article className="card card-hover overflow-hidden p-0 sm:p-0">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-board px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-board-ink sm:px-7">
                <span>Flight AP 101 · {job.company}</span>
                <span className="flex items-center gap-2 text-board-amber">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-board-amber motion-reduce:animate-none" />
                  Cruising
                </span>
              </div>

              <div className="p-6 sm:p-7">
                <header className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
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
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
