import { CartesianGrid, Line, LineChart, ReferenceDot, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { currentChelation, oxidationVsChelation, tewlTrend } from "@/lib/dashboard-data";
import { classifyTewl } from "@/lib/tewl";
import { TewlScale } from "@/components/site/TewlScale";
import { cn } from "@/lib/utils";

const axisTick = { fill: "var(--ink-muted)", fontSize: 11, fontFamily: "var(--font-mono)" };
const axisLabel = { fill: "var(--ink-muted)", fontSize: 10, fontFamily: "var(--font-mono)", letterSpacing: "0.12em" };

export function TewlTrend({ className }: { className?: string }) {
  const current = tewlTrend.at(-1)?.tewl ?? 0;
  const start = tewlTrend[0]?.tewl ?? current;
  const delta = current - start;

  return (
    <section className={cn("grid gap-6 rounded-3xl bg-ink p-5 text-ink-foreground lg:grid-cols-[minmax(0,1fr)_300px]", className)}>
      <div className="flex min-w-0 flex-col">
        <p className="eyebrow text-secondary">Oxidation vs chelation · New York panel</p>
        <h2 className="mt-1 text-xl font-medium">How well skin is holding water</h2>
        <p className="mt-1 max-w-xl text-sm text-ink-muted">
          The more free metal ions a formula binds (chelation), the less its antioxidants oxidise — which keeps the barrier intact and water in.
        </p>

        <div className="mt-4 h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={oxidationVsChelation} margin={{ top: 8, right: 16, left: 4, bottom: 18 }}>
              <CartesianGrid stroke="var(--ink-raised)" vertical={false} />
              <XAxis
                dataKey="chelation"
                type="number"
                domain={[0, 100]}
                ticks={[0, 20, 40, 60, 80, 100]}
                tickFormatter={(v: number) => `${v}%`}
                tickLine={false}
                axisLine={{ stroke: "var(--ink-raised)" }}
                tick={axisTick}
                label={{ value: "CHELATION", position: "insideBottom", offset: -12, ...axisLabel }}
              />
              <YAxis
                dataKey="oxidation"
                domain={[0, 70]}
                ticks={[0, 20, 40, 60]}
                tickFormatter={(v: number) => `${v}%`}
                tickLine={false}
                axisLine={false}
                tick={axisTick}
                width={52}
                label={{ value: "OXIDATION", angle: -90, position: "insideLeft", offset: 6, style: { textAnchor: "middle", ...axisLabel } }}
              />
              <Tooltip
                cursor={{ stroke: "var(--ink-muted)", strokeDasharray: 3 }}
                contentStyle={{ background: "var(--ink-raised)", border: "none", borderRadius: 12, fontFamily: "var(--font-mono)", fontSize: 12 }}
                labelStyle={{ color: "var(--ink-muted)" }}
                itemStyle={{ color: "var(--ink-foreground)" }}
                labelFormatter={(v) => `Chelation ${v}%`}
                formatter={(v: number) => [`${v}%`, "Oxidation"]}
              />
              <Line
                type="monotone"
                dataKey="oxidation"
                stroke="var(--primary)"
                strokeWidth={2.5}
                dot={{ r: 3, fill: "var(--ink)", stroke: "var(--primary)", strokeWidth: 2 }}
                activeDot={{ r: 5, fill: "var(--primary)", stroke: "var(--ink)" }}
              />
              <ReferenceDot x={currentChelation.chelation} y={currentChelation.oxidation} r={7} fill="var(--secondary)" stroke="var(--ink)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="flex items-center gap-2 text-xs text-ink-muted">
          <span className="size-2.5 rounded-full bg-secondary" /> Current routine: {currentChelation.chelation}% chelation, {currentChelation.oxidation}% oxidation. Sample data.
        </p>
      </div>

      <div className="flex flex-col justify-between gap-6 rounded-2xl bg-ink-raised/60 p-5">
        <div>
          <p className="eyebrow text-ink-muted">TEWL · this week</p>
          <p className="mt-2 flex items-baseline gap-1.5">
            <span className="tabular text-5xl font-light">{current}</span>
            <span className="font-mono text-xs text-ink-muted">g/m²/h</span>
          </p>
          <p className="mt-2 text-xs">
            <span className="rounded-full bg-secondary px-2 py-0.5 text-secondary-foreground">{classifyTewl(current)}</span>{" "}
            <span className="tabular text-ink-muted">{delta.toFixed(1)} since W35</span>
          </p>
        </div>
        <div>
          <TewlScale value={current} />
          <p className="mt-3 text-xs text-ink-muted">Lower is better. Healthy skin sits at 5–15 g/m²/h.</p>
        </div>
      </div>
    </section>
  );
}
