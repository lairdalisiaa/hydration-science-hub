import { useState } from "react";
import { ScoreRing } from "@/components/dashboard/ScoreRing";
import { Bar, Formula, InfoTip, Panel, Segmented, SerifTitle } from "@/components/site/ui";
import { cn } from "@/lib/utils";
import { classifyTewl } from "@/lib/tewl";
import {
  compatibilityRings,
  deliveryModes,
  keyTakeaway,
  performanceSignal,
  profileCards,
  skinCompatibility,
  skinLayers,
  targetMechanisms,
  type DeliveryMode,
} from "@/lib/theory-data";

const modes = Object.keys(deliveryModes) as DeliveryMode[];

export function CellSimulation() {
  const [mode, setMode] = useState<DeliveryMode>("Leave-on serum");
  const delivery = deliveryModes[mode];
  // Gauge spans the healthy 5–15 range.
  const gauge = Math.min(Math.max((delivery.tewl - 5) / 10, 0), 1) * 100;

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-2xl border-l-4 border-primary bg-card px-5 py-4 shadow-soft">
        <p className="eyebrow text-muted-foreground">
          Key takeaway · {keyTakeaway.ingredient} · <Formula value={keyTakeaway.formula} />
        </p>
        <p className="mt-1 text-base">{keyTakeaway.text}</p>
      </div>

      <section className="rounded-3xl bg-ink p-5 text-ink-foreground">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="eyebrow text-secondary">Cell simulation · sample data</p>
            <h2 className="mt-1 text-xl font-medium">Where Azelaic Acid goes in skin</h2>
          </div>
          <Segmented label="Product format" options={modes} value={mode} onChange={setMode} tone="ink" />
        </div>
        <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_240px]">
          <div className="relative flex flex-col gap-1 overflow-hidden rounded-2xl">
            {skinLayers.map((l, i) => (
              <div
                key={l.name}
                className={cn(
                  "relative flex items-center justify-between px-4 text-sm",
                  i === 0 && "bg-ink-foreground/25 py-3",
                  i === 1 && "bg-ink-foreground/15 py-5",
                  i === 2 && "bg-ink-foreground/10 py-9",
                  i === 3 && "bg-ink-foreground/5 py-4",
                )}
              >
                <span>{l.name}</span>
                <span className="font-mono text-xs text-ink-muted">{l.detail}</span>
                {i === delivery.layer && (
                  <span className="absolute left-1/2 top-1/2 flex -translate-y-1/2 items-center gap-2">
                    <span className="size-3 -translate-x-1/2 rounded-full border-2 border-ink-foreground bg-primary" />
                    <span className="rounded-full bg-ink-foreground px-2.5 py-0.5 text-xs text-ink">{delivery.label}</span>
                  </span>
                )}
              </div>
            ))}
            <DepthLine layer={delivery.layer} />
          </div>
          <div className="rounded-2xl bg-ink-raised p-4">
            <p className="eyebrow text-ink-muted">TEWL gauge</p>
            <p className="mt-2 flex items-baseline gap-1.5">
              <span className="tabular text-4xl font-light">{delivery.tewl}</span>
              <span className="font-mono text-xs text-ink-muted">g/m²/h</span>
            </p>
            <div className="relative mt-4 h-1.5 rounded-full bg-gradient-to-r from-secondary to-ink-muted">
              <span className="absolute -top-1 h-3.5 w-1 -translate-x-1/2 rounded-full bg-ink-foreground transition-all" style={{ left: `${gauge}%` }} />
            </div>
            <div className="eyebrow mt-2 flex justify-between text-[0.6rem] text-ink-muted">
              <span>5</span>
              <span className="text-ink-foreground">{classifyTewl(delivery.tewl)}</span>
              <span>15</span>
            </div>
            <p className="mt-4 text-xs text-ink-muted">Lower is better.</p>
          </div>
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-3">
        {profileCards.map((card) => (
          <Panel key={card.title}>
            <SerifTitle>{card.title}</SerifTitle>
            <dl className="mt-3 flex flex-col divide-y divide-border">
              {card.rows.map((r) => (
                <div key={r.label} className="py-2.5">
                  <dt className="eyebrow flex items-center gap-1.5 text-[0.6rem] text-muted-foreground">
                    {r.label} <InfoTip label={r.label}>{r.info}</InfoTip>
                  </dt>
                  <dd className="mt-0.5 text-sm">{r.value}</dd>
                </div>
              ))}
            </dl>
            {"note" in card && card.note && <p className="mt-2 text-xs text-muted-foreground">{card.note}</p>}
          </Panel>
        ))}
      </div>

      <section>
        <h2 className="text-xl font-medium">Target Mechanisms</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {targetMechanisms.map((m) => (
            <div key={m.layer} className="rounded-2xl bg-accent px-4 py-3">
              <p className="eyebrow text-[0.6rem] text-muted-foreground">{m.layer}</p>
              <p className="mt-1 font-medium">{m.target}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-[1fr_2fr]">
        <Panel>
          <SerifTitle>Performance Signal</SerifTitle>
          <ul className="mt-4 flex flex-col gap-4">
            {performanceSignal.map((p) => (
              <li key={p.label} className="text-sm">
                <div className="mb-1.5 flex justify-between">
                  <span>{p.label}</span>
                  <span className="tabular">{p.value}%</span>
                </div>
                <Bar value={p.value} />
              </li>
            ))}
          </ul>
        </Panel>
        <Panel className="grid gap-6 md:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="font-medium">Skin Compatibility</h2>
            <ul className="mt-3 flex flex-col gap-2.5 text-sm">
              {skinCompatibility.map((s) => (
                <li key={s.label} className="grid grid-cols-[80px_1fr_28px] items-center gap-3">
                  <span>{s.label}</span>
                  <Bar value={s.value} tone="ink" />
                  <span className="tabular text-right">{s.value}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow text-right text-[0.6rem] text-muted-foreground">Skinomic focus · 12 months · New York</p>
            <ul className="mt-3 flex flex-wrap justify-around gap-3">
              {compatibilityRings.map((r) => (
                <li key={r.label} className="flex flex-col items-center gap-1.5">
                  <ScoreRing value={r.value} size={56} stroke={5}>
                    <span className="tabular text-sm font-medium">{r.value}</span>
                  </ScoreRing>
                  <span className="text-xs">{r.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </Panel>
      </div>
    </div>
  );
}

/** Pink depth line from the surface down to the layer the ingredient reaches. */
function DepthLine({ layer }: { layer: number }) {
  const heights = ["12%", "32%", "68%", "100%"];
  return <span aria-hidden className="pointer-events-none absolute left-1/2 top-0 w-px -translate-x-1/2 bg-primary transition-all" style={{ height: heights[layer] }} />;
}
