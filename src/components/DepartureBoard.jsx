import SplitFlap from "./SplitFlap";
import KochiClock from "./KochiClock";
import { departures } from "../data/content";

const cell = "h-[18px] w-[10px] text-[10px] sm:h-[22px] sm:w-[13px] sm:text-[12px]";

export default function DepartureBoard() {
  return (
    <div
      role="table"
      aria-label="Departures board"
      className="rounded-2xl border border-black/40 bg-board p-4 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6)] sm:p-5"
    >
      <div className="mb-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-board-amber">
        <span className="flex items-center gap-2">
          <svg width="14" height="10" viewBox="0 0 24 16" aria-hidden="true">
            <path fill="currentColor" d="M23 8c0-.8-.7-1.4-1.6-1.4H15L9.6 0H7.4l2.8 6.6H4.6L2.8 4.2H1l1.2 3.8L1 11.8h1.8l1.8-2.4h5.6L7.4 16h2.2L15 9.4h6.4c.9 0 1.6-.6 1.6-1.4z" />
          </svg>
          Departures · COK
        </span>
        <KochiClock className="text-board-ink" />
      </div>

      <div role="row" className="mb-2 grid grid-cols-[1fr_94px] gap-2 sm:grid-cols-[88px_1fr_118px] sm:gap-3 font-mono text-[10px] uppercase tracking-widest text-board-dim">
        <span role="columnheader" className="hidden sm:block">Flight</span>
        <span role="columnheader">Destination</span>
        <span role="columnheader">Status</span>
      </div>

      <div className="space-y-1.5">
        {departures.map((d, i) => (
          <div role="row" key={d.flight} className="grid grid-cols-[1fr_94px] items-center gap-2 sm:grid-cols-[88px_1fr_118px] sm:gap-3">
            <span role="cell" className="hidden sm:block">
              <SplitFlap text={d.flight} length={6} delay={300 + i * 180} cellClass={cell} />
            </span>
            <span role="cell">
              <SplitFlap text={d.to} length={16} delay={400 + i * 180} cellClass={cell} />
            </span>
            <span role="cell" className={d.status === "BOARDING" ? "[&_.flap]:text-board-amber" : ""}>
              <SplitFlap text={d.status} length={8} delay={500 + i * 180} cellClass={cell} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
