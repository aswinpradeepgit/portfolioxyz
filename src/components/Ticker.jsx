import { ticker } from "../data/content";

// Airport-style info strip that scrolls continuously. Decorative: everything
// in it is said elsewhere on the page.
export default function Ticker() {
  const items = [...ticker, ...ticker];
  return (
    <div aria-hidden="true" className="ticker overflow-hidden border-y border-black/40 bg-board py-3">
      <div className="ticker-track flex w-max gap-10 whitespace-nowrap font-mono text-xs uppercase tracking-[0.2em] text-board-ink">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            {item}
            <span className="text-board-amber">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
