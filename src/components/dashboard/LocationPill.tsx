import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const CITIES = [
  { name: "New York", tz: "America/New_York" },
  { name: "London", tz: "Europe/London" },
] as const;

/**
 * Location pill with a New York / London dropdown.
 * Self-contained: the selection lives in this component's own state and is never
 * passed to or read by any other card, so changing it only updates this pill's
 * label and its own live date/time.
 */
export function LocationPill({ className }: { className?: string }) {
  const [cityName, setCityName] = useState<string>(CITIES[0].name);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  const city = CITIES.find((c) => c.name === cityName) ?? CITIES[0];
  const date = now ? now.toLocaleDateString("en-US", { timeZone: city.tz, weekday: "short", month: "short", day: "numeric" }) : "—";
  const time = now ? now.toLocaleTimeString("en-US", { timeZone: city.tz, hour: "numeric", minute: "2-digit" }) : "";

  return (
    <div
      className={cn(
        "relative flex flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-2xl bg-card px-4 py-3 shadow-soft focus-within:ring-2 focus-within:ring-primary/40",
        className,
      )}
    >
      <span className="flex items-center gap-3 text-sm font-medium">
        <span className="size-3.5 rounded-sm bg-primary" /> {city.name}
        <ChevronDown aria-hidden className="size-3.5 opacity-60" />
      </span>
      <span className="tabular flex items-center gap-2 whitespace-nowrap text-xs text-muted-foreground">
        <span className="size-1.5 animate-pulse rounded-full bg-positive" />
        {date} · {time}
      </span>
      {/* Native dropdown laid invisibly over the pill: opens above any card and can't be clipped. */}
      <select
        aria-label="Choose location"
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      >
        {CITIES.map((c) => (
          <option key={c.name} value={c.name}>{c.name}</option>
        ))}
      </select>
    </div>
  );
}
