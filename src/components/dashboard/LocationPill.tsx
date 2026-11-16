import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const tz = "America/New_York";

/** "New York" pill with the live New York date and time (filled in after hydration). */
export function LocationPill({ className }: { className?: string }) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);
  const date = now ? now.toLocaleDateString("en-US", { timeZone: tz, weekday: "short", month: "short", day: "numeric" }) : "—";
  const time = now ? now.toLocaleTimeString("en-US", { timeZone: tz, hour: "numeric", minute: "2-digit" }) : "";
  return (
    <div className={cn("flex flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-2xl bg-card px-4 py-3 shadow-soft", className)}>
      <span className="flex items-center gap-3 text-sm font-medium">
        <span className="size-3.5 rounded-sm bg-primary" /> New York
      </span>
      <span className="tabular flex items-center gap-2 whitespace-nowrap text-xs text-muted-foreground">
        <span className="size-1.5 animate-pulse rounded-full bg-positive" />
        {date} · {time}
      </span>
    </div>
  );
}
