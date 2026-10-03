import Section, { Reveal } from "./Section";
import { skills } from "../data/content";

export default function Skills() {
  return (
    <Section id="skills" index="04" eyebrow="Skills · Carry-on" title="What I work with">
      <div className="grid gap-8 sm:grid-cols-3">
        {skills.map(({ group, items }, i) => (
          <Reveal key={group} delay={i * 0.06}>
            <h3 className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted">
              <span aria-hidden="true" className="h-2 w-2 rounded-full border border-accent" />
              {group}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {items.map((skill) => (
                <li
                  key={skill}
                  className="cursor-default rounded-lg border border-line bg-surface px-3 py-1.5 text-sm font-medium
                             transition-[transform,border-color,color] duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
