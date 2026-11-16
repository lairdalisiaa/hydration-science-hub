import { Link } from "@tanstack/react-router";
import { CalendarDays, Droplet, FileText, FlaskConical, TrendingUp } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { PageShell } from "@/components/site/PageShell";
import { Button } from "@/components/ui/button";
import { tewlTrend } from "@/lib/dashboard-data";
import { marketStrip } from "@/lib/reports-data";
import { cn } from "@/lib/utils";

const rail = [
  { to: "/reports/egcg", icon: FileText, label: "Ingredient overview" },
  { to: "/theory/trend-signal", icon: TrendingUp, label: "Trend signal" },
  { to: "/reports/eye-serum/bioinformatics", icon: FlaskConical, label: "Product bioinformatics" },
  { to: "/theory", icon: Droplet, label: "Cell simulation" },
  { to: "/reports/eye-serum", icon: CalendarDays, label: "Skincare guide" },
] as const;

const chips = [
  { label: "Market", to: "/" },
  { label: "Top searches", to: "/" },
  { label: "Skinomic focus", to: null },
  { label: "Ingredients", to: "/skincare" },
  { label: "Goals", to: "/" },
] as const;

/** Frame for report detail pages: market strip, live time bar and report tool rail. */
export function ReportShell({ children }: { children: ReactNode }) {
  return (
    <PageShell>
      <MarketStrip />
      <TimeBar />
      <main className="grid gap-4 px-4 py-6 lg:grid-cols-[56px_1fr] lg:px-8">
        <nav aria-label="Report sections" className="flex gap-2 self-start rounded-2xl bg-card p-2 shadow-soft lg:sticky lg:top-6 lg:flex-col">
          {rail.map(({ to, icon: Icon, label }) => (
            <Link
              key={to}
              to={to}
              aria-label={label}
              title={label}
              activeOptions={{ exact: true }}
              className="grid size-10 place-items-center rounded-xl bg-muted text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "!bg-primary !text-primary-foreground" }}
            >
              <Icon className="size-4" />
            </Link>
          ))}
        </nav>
        <div className="min-w-0">{children}</div>
      </main>
    </PageShell>
  );
}

function MarketStrip() {
  const [chip, setChip] = useState<string>("Market");
  return (
    <div className="grid gap-4 border-b border-border bg-card px-4 py-4 lg:grid-cols-[220px_1fr] lg:px-8">
      <div className="flex items-center gap-3 rounded-2xl bg-muted px-3 py-3">
        <span className="size-9 rounded-lg bg-secondary" aria-hidden />
        <span className="flex-1">
          <span className="eyebrow block text-[0.55rem] text-muted-foreground">Market</span>
          <span className="flex items-center gap-1 font-medium">
            New York
          </span>
        </span>
      </div>
      <div className="flex flex-col gap-3">
        <dl className="grid grid-cols-3 gap-3 md:grid-cols-6">
          {marketStrip.map((m) => (
            <div key={m.label}>
              <dt className="eyebrow text-[0.55rem] text-muted-foreground">{m.label}</dt>
              <dd className="flex items-baseline gap-1">
                <span className="tabular text-lg">{m.value}</span>
                <span className="text-[0.65rem] text-muted-foreground">{m.extra}</span>
              </dd>
            </div>
          ))}
        </dl>
        <div role="group" aria-label="Market view" className="flex flex-wrap gap-1.5">
          {chips.map(({ label, to }) => (
            <Button key={label} variant="ghost" asChild={to !== null} aria-pressed={to === null ? chip === label : undefined} onClick={to === null ? () => setChip(label) : undefined} className={cn("h-auto rounded-full px-3 py-1 text-xs font-normal", chip === label ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground hover:text-foreground")}>
              {to !== null ? <Link to={to}>{label}</Link> : label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

/** ISO week number. */
function isoWeek(d: Date) {
  const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const day = t.getUTCDay() || 7;
  t.setUTCDate(t.getUTCDate() + 4 - day);
  const y0 = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
  return Math.ceil(((t.getTime() - y0.getTime()) / 86400000 + 1) / 7);
}

function TimeBar() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);
  const tz = "America/New_York";
  const time = now ? now.toLocaleTimeString("en-US", { timeZone: tz, hour: "numeric", minute: "2-digit", timeZoneName: "short" }) : "—";
  const date = now ? now.toLocaleDateString("en-US", { timeZone: tz, weekday: "short", month: "short", day: "numeric", year: "numeric" }) : "—";
  const nyDate = now ? new Date(now.toLocaleString("en-US", { timeZone: tz })) : null;
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-1 bg-ink px-4 py-2 font-mono text-[0.65rem] uppercase tracking-wider text-ink-foreground lg:px-8">
      <span><span className="text-ink-muted">Time</span> {time}</span>
      <span><span className="text-ink-muted">Date</span> {date}</span>
      <span><span className="text-primary">●</span> Week {nyDate ? isoWeek(nyDate) : "—"}</span>
      <span><span className="text-ink-muted">TEWL</span> {tewlTrend.at(-1)?.tewl}</span>
    </div>
  );
}
