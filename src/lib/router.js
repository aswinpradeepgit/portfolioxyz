import { useSyncExternalStore } from "react";

// Minimal path router (History API). Enough for "/", "/blog" and "/blog/:slug"
// without pulling in a routing library.

const EVENT = "app:navigate";

const subscribe = (cb) => {
  window.addEventListener("popstate", cb);
  window.addEventListener(EVENT, cb);
  return () => {
    window.removeEventListener("popstate", cb);
    window.removeEventListener(EVENT, cb);
  };
};

const normalise = (p) => (p.length > 1 ? p.replace(/\/+$/, "") : p);

export function usePath() {
  return useSyncExternalStore(subscribe, () => normalise(window.location.pathname), () => "/");
}

export function navigate(to) {
  const url = new URL(to, window.location.href);
  if (url.pathname + url.hash === window.location.pathname + window.location.hash) return;
  const samePage = normalise(url.pathname) === normalise(window.location.pathname);
  window.history.pushState(null, "", url.pathname + url.hash);
  window.dispatchEvent(new Event(EVENT));
  // New page: start at the top, or at the requested section once it has rendered.
  requestAnimationFrame(() => {
    const target = url.hash && document.querySelector(url.hash);
    if (target) target.scrollIntoView({ behavior: samePage ? "smooth" : "auto" });
    else if (!samePage) window.scrollTo(0, 0);
  });
}
