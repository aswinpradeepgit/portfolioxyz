import { useEffect, useState } from "react";

const fmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

export default function KochiClock({ className = "" }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className={className}>
      <span className="sr-only">Local time in Kochi: </span>
      <time className="tabular-nums" dateTime={now.toISOString()}>
        {fmt.format(now)}
      </time>{" "}
      IST
    </span>
  );
}
