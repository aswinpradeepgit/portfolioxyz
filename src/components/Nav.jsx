import { useState } from "react";
import { nav, profile } from "../data/content";
import { usePath } from "../lib/router";
import Link from "./Link";

// Section anchors scroll in place on the home page; elsewhere they route home first.
function NavLink({ href, isHome, ...rest }) {
  if (href.startsWith("#") && isHome) return <a href={href} {...rest} />;
  return <Link to={href.startsWith("#") ? `/${href}` : href} {...rest} />;
}

function ThemeToggle() {
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  // Only persist an explicit choice, so visitors otherwise keep following their OS theme.
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* storage unavailable */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted
                 transition-colors hover:border-accent hover:text-accent"
    >
      {dark ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      )}
    </button>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const path = usePath();
  const isHome = path === "/";

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/80 backdrop-blur-md">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded-md focus:bg-surface focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <nav aria-label="Primary" className="container-page flex h-16 items-center justify-between gap-4">
        <NavLink href="#top" isHome={isHome} className="font-semibold tracking-tight">
          {profile.name}
        </NavLink>

        <ul className="hidden items-center gap-7 text-sm text-muted md:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <NavLink
                href={item.href}
                isHome={isHome}
                aria-current={item.href !== "/" && path.startsWith(item.href) ? "page" : undefined}
                className="link-underline hover:text-fg aria-[current=page]:text-accent"
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
            className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted md:hidden"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <ul id="mobile-menu" className="container-page flex flex-col gap-1 pb-4 md:hidden">
          {nav.map((item) => (
            <li key={item.href}>
              <NavLink
                href={item.href}
                isHome={isHome}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-2 py-2.5 text-muted hover:bg-surface hover:text-fg"
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
