import { useState } from "react";
import { CartesianGrid, Line, LineChart, ReferenceArea, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ScoreRing } from "@/components/dashboard/ScoreRing";
import { Bar, Eyebrow, Panel, Segmented } from "@/components/site/ui";
import { cn } from "@/lib/utils";
import { signalCards, signalScore, trendNow, trendSeries, trendStats, type TrendRange } from "@/lib/theory-data";

const ranges = ["12 months", "30 days", "7 days"] as const satisfies readonly TrendRange[];
const statTones = ["bg-accent", "bg-blush/70", "bg-accent", "bg-accent"];
const cardTones = ["bg-blush/80", "bg-accent/70", "bg-blush/60"];
const tick = { fill: "var(--muted-foreground)", fontSize: 11, fontFamily: "var(--font-mono)" };

export function TrendSignal() {
  const [range, setRange] = useState<TrendRange>("12 months");
  const data = trendSeries[range];
  const now = trendNow[range];
  const last = data.at(-1)?.label;

  return (
    <div className="flex flex-col gap-4">
      <ul className="flex flex-wrap gap-4 text-xs text-muted-foreground">
        <li className="flex items-center gap-1.5"><span className="size-2.5 rounded-sm bg-primary" /> Rising trend</li>
        <li className="flex items-center gap-1.5"><span className="size-2.5 rounded-sm bg-secondary" /> Ingredient interest</li>
        <li className="flex items-center gap-1.5"><span className="size-2.5 rounded-sm bg-accent" /> Signals</li>
        <li className="flex items-center gap-1.5"><span className="size-2.5 rounded-sm bg-blush" /> Market data · same pink as the homepage Explore Market</li>
      </ul>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {trendStats.map((s, i) => (
          <div key={s.eyebrow} className={cn("rounded-2xl p-4 shadow-soft", statTones[i])}>
            <p className="eyebrow flex items-center gap-1.5 text-[0.6rem]">
              <span className="size-2 rounded-sm bg-primary" /> {s.eyebrow}
            </p>
            <p className={cn("mt-1 text-3xl", s.positive && "text-positive")}>{s.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{s.note}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[3fr_1fr]">
        <Panel>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="font-medium">Trend Over Time</h2>
              <Eyebrow className="text-[0.6rem]">Search interest index · 2026 · sample data</Eyebrow>
            </div>
            <Segmented label="Time range" options={ranges} value={range} onChange={setRange} />
          </div>
          <div className="mt-4 h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid stroke="var(--border)" vertical={false} />
                {last && <ReferenceArea x1={now} x2={last} fill="var(--accent)" fillOpacity={0.8} />}
                <XAxis dataKey="label" tickLine={false} axisLine={false} tick={tick} interval={range === "30 days" ? 4 : 0} />
                <YAxis tickLine={false} axisLine={false} tick={tick} domain={["dataMin - 4", "dataMax + 4"]} />
                <ReferenceLine x={now} stroke="var(--primary)" />
                <Tooltip contentStyle={{ borderRadius: 12, border: "none", fontFamily: "var(--font-mono)", fontSize: 12 }} />
                <Line type="monotone" dataKey="actual" name="Index" stroke="var(--foreground)" strokeWidth={2} dot={false} connectNulls={false} />
                <Line type="monotone" dataKey="forecast" name="Forecast" stroke="var(--foreground)" strokeWidth={2} strokeDasharray="5 4" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="h-0.5 w-4 bg-foreground" /> Now</span>
            <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-sm bg-accent" /> Forecast</span>
          </div>
        </Panel>
        <Panel className="bg-muted/80">
          <Eyebrow className="text-[0.6rem]">What this means</Eyebrow>
          <p className="mt-2 text-lg leading-snug">A high-potential ingredient with rising momentum. Growing interest in serums points to room for new products.</p>
        </Panel>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {signalCards.map((c, i) => (
          <section key={c.title} className={cn("rounded-3xl p-4 shadow-soft", cardTones[i])}>
            <h2 className="font-medium">{c.title}</h2>
            <p className="text-xs text-muted-foreground">{c.note}</p>
            <dl className="mt-3 flex flex-col divide-y divide-foreground/10 text-sm">
              {c.rows.map(([k, v]) => (
                <div key={k} className="flex justify-between py-2">
                  <dt>{k}</dt>
                  <dd className="font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
        <Panel className="flex flex-col items-center">
          <ScoreRing value={signalScore.total} size={96} stroke={10} tone="pink">
            <span className="flex flex-col items-center leading-none">
              <span className="tabular text-2xl">{signalScore.total}</span>
              <span className="font-mono text-[0.6rem] text-muted-foreground">/ 100</span>
            </span>
          </ScoreRing>
          <Eyebrow className="mt-2 text-[0.6rem]">Signal score</Eyebrow>
          <ul className="mt-3 flex w-full flex-col gap-1.5 text-xs">
            {signalScore.parts.map((p) => (
              <li key={p.label} className="grid grid-cols-[60px_1fr_24px] items-center gap-2">
                <span>{p.label}</span>
                <Bar value={p.value} />
                <span className="tabular text-right">{p.value}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}
