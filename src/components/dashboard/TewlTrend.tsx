import { Area, AreaChart, CartesianGrid, ReferenceArea, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { tewlTrend } from "@/lib/dashboard-data";
import { TEWL_BANDS, classifyTewl, tewlMarkerPosition } from "@/lib/tewl";

export function TewlTrend() {
  const current = tewlTrend[tewlTrend.length - 1].tewl;
  const start = tewlTrend[0].tewl;
  const delta = current - start;
  const marker = tewlMarkerPosition(current) * 100;

  return (
    <section className="flex flex-col rounded-3xl bg-ink p-5 text-ink-foreground lg:col-span-2">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="eyebrow text-secondary">TEWL trend · 12 weeks · New York</p>
          <h2 className="mt-1 text-xl font-medium">How well skin is holding water</h2>
        </div>
        <div className="text-right">
          <p className="flex items-baseline justify-end gap-1.5">
            <span className="tabular text-4xl font-light">{current}</span>
            <span className="font-mono text-xs text-ink-muted">g/m²/h</span>
          </p>
          <p className="mt-1 text-xs">
            <span className="rounded-full bg-secondary px-2 py-0.5 text-secondary-foreground">{classifyTewl(current)}</span>{" "}
            <span className="tabular text-ink-muted">{delta.toFixed(1)} since W35</span>
          </p>
        </div>
      </div>

      <div className="mt-4 h-52 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={tewlTrend} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="tewlFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.45} />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <ReferenceArea y1={5} y2={15} fill="var(--secondary)" fillOpacity={0.08} />
            <CartesianGrid stroke="var(--ink-raised)" vertical={false} />
            <XAxis dataKey="week" tickLine={false} axisLine={false} tick={{ fill: "var(--ink-muted)", fontSize: 11, fontFamily: "var(--font-mono)" }} />
            <YAxis domain={[10, 20]} ticks={[10, 15, 20]} tickLine={false} axisLine={false} tick={{ fill: "var(--ink-muted)", fontSize: 11, fontFamily: "var(--font-mono)" }} />
            <Tooltip
              cursor={{ stroke: "var(--ink-muted)", strokeDasharray: 3 }}
              contentStyle={{ background: "var(--ink-raised)", border: "none", borderRadius: 12, fontFamily: "var(--font-mono)", fontSize: 12 }}
              labelStyle={{ color: "var(--ink-muted)" }}
              itemStyle={{ color: "var(--ink-foreground)" }}
              formatter={(v: number) => [`${v} g/m²/h`, "TEWL"]}
            />
            <Area type="monotone" dataKey="tewl" stroke="var(--primary)" strokeWidth={2.5} fill="url(#tewlFill)" dot={false} activeDot={{ r: 5, fill: "var(--primary)", stroke: "var(--ink)" }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4">
        <div className="relative flex gap-1">
          {TEWL_BANDS.map((b) => (
            <div key={b.label} className={b.label === "Healthy" ? "h-1.5 flex-1 rounded-full bg-ink-foreground" : b.label === "Very healthy" ? "h-1.5 flex-1 rounded-full bg-secondary" : "h-1.5 flex-1 rounded-full bg-ink-raised"} />
          ))}
          <span className="absolute -top-1 h-3.5 w-1 -translate-x-1/2 rounded-full bg-primary" style={{ left: `${marker}%` }} />
        </div>
        <div className="eyebrow mt-2 grid grid-cols-4 text-[0.6rem] text-ink-muted">
          {TEWL_BANDS.map((b) => (
            <span key={b.label} className={b.label === classifyTewl(current) ? "text-ink-foreground" : undefined}>
              {b.label}
            </span>
          ))}
        </div>
        <p className="mt-3 text-xs text-ink-muted">Lower is better. Healthy skin sits at 5–15 g/m²/h. Sample data.</p>
      </div>
    </section>
  );
}
