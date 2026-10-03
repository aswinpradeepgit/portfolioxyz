import { Reveal, SectionHeader } from "./Section";
import Magnetic from "./Magnetic";
import { profile } from "../data/content";

const icons = {
  mail: <path d="M4 6h16v12H4zM4 7l8 6 8-6" />,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />,
  github: <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />,
  linkedin: <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" />,
};

function ContactLink({ href, icon, label, external }) {
  return (
    <li>
      <a
        href={href}
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
        className="group inline-flex items-center gap-3 text-fg"
      >
        <span className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-colors group-hover:border-accent group-hover:text-accent">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {icons[icon]}
          </svg>
        </span>
        <span className="link-underline">{label}</span>
      </a>
    </li>
  );
}

export default function Footer() {
  const { email, phone, links, name } = profile;

  return (
    <footer id="contact" data-waypoint="05" aria-labelledby="contact-title" className="relative overflow-hidden border-t border-line bg-surface/60">
      <div className="container-page py-20 sm:py-28">
        <SectionHeader id="contact" index="05" eyebrow="Contact · Final call" title="Want to build something meaningful?" />
        <Reveal className="max-w-2xl">
          <p className="mb-10 text-lg leading-relaxed text-muted">
            If you're working on AI, productivity or thoughtful software, and want an engineer who'll sit with your
            team and ship what actually works, let's talk.
          </p>

          <Magnetic strength={0.2}>
            <a href={`mailto:${email}`} className="btn-primary mb-12 px-7 py-3.5 text-base" data-cursor="Say hi">
              {email}
              <span aria-hidden="true">↗</span>
            </a>
          </Magnetic>

          <ul className="grid gap-4 sm:grid-cols-2">
            <ContactLink href={`mailto:${email}`} icon="mail" label="Email" />
            <ContactLink href={phone.href} icon="phone" label={phone.display} />
            {links.github && <ContactLink href={links.github} icon="github" label="GitHub" external />}
            {links.linkedin && <ContactLink href={links.linkedin} icon="linkedin" label="LinkedIn" external />}
          </ul>
        </Reveal>

        {/* Decorative watermark, drawn via ::before so it stays out of the content and a11y tree */}
        <div
          aria-hidden="true"
          data-text="See you at the gate."
          className="watermark mt-20 select-none font-display text-[clamp(3rem,13vw,10rem)] font-extrabold leading-none tracking-tight"
        />

        <p className="mt-8 flex flex-wrap justify-between gap-2 font-mono text-xs uppercase tracking-[0.15em] text-muted">
          <span>© {new Date().getFullYear()} {name}</span>
          <span>Built in Kochi · React + Vite</span>
        </p>
      </div>
    </footer>
  );
}
