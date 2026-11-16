import { skinPerformance } from "@/lib/dashboard-data";
import { cn } from "@/lib/utils";
import { ScoreRing } from "./ScoreRing";

export function SkinPerformance({ className }: { className?: string }) {
  return (
    <section className={cn("flex flex-col gap-5 rounded-3xl bg-card p-5 shadow-soft lg:flex-row lg:items-center lg:justify-between lg:gap-8", className)}>
      <div className="lg:max-w-56">
        <div className="flex items-baseline justify-between gap-3 lg:block">
          <h2 className="font-serif text-3xl italic text-primary">Skin Performance</h2>
          <span className="eyebrow text-muted-foreground lg:mt-1 lg:block">This week</span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">0–100 scores across the New York panel.</p>
      </div>
      <ul className="flex flex-1 flex-wrap justify-center gap-x-3 gap-y-5 lg:flex-nowrap lg:justify-around">
        {skinPerformance.map((s) => (
          <li key={s.label} className="flex w-20 flex-col items-center gap-2 text-center lg:w-auto lg:flex-row lg:gap-3 lg:text-left">
            <ScoreRing value={s.value} size={68} stroke={6}>
              <span className="tabular text-base font-medium">
                {s.value}
                {s.unit && <span className="text-xs text-muted-foreground">{s.unit}</span>}
              </span>
            </ScoreRing>
            <span className="text-sm">{s.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
