import { skinPerformance } from "@/lib/dashboard-data";
import { ScoreRing } from "./ScoreRing";

export function SkinPerformance() {
  return (
    <section className="flex flex-col rounded-3xl bg-card p-5 shadow-soft">
      <div className="flex items-baseline justify-between gap-2">
        <h2 className="font-serif text-3xl italic text-primary">Skin Performance</h2>
        <span className="eyebrow text-muted-foreground">This week</span>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">0–100 scores across the New York panel.</p>
      <div className="mt-5 flex flex-1 flex-wrap content-center justify-center gap-x-3 gap-y-5">
        {skinPerformance.map((s) => (
          <div key={s.label} className="flex w-20 flex-col items-center gap-2 text-center">
            <ScoreRing value={s.value} size={68} stroke={6}>
              <span className="tabular text-base font-medium">
                {s.value}
                {s.unit && <span className="text-xs text-muted-foreground">{s.unit}</span>}
              </span>
            </ScoreRing>
            <span className="text-sm">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
