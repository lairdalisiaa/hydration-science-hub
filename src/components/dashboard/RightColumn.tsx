import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { skinomicFocus } from "@/lib/dashboard-data";
import { cn } from "@/lib/utils";
import moleculeImg from "@/assets/egcg-molecule.jpg";

export function RightColumn() {
  return (
    <div className="flex flex-col gap-4">
      <section className="rounded-3xl bg-card p-5 shadow-soft">
        <h2 className="text-xl font-medium">Skinomic Focus</h2>
        <p className="mt-1 text-sm text-muted-foreground">What everyone's asking. 0–100 index of 12-month search demand.</p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {skinomicFocus.map((f, i) => (
            <div
              key={f.concern}
              className={cn("flex min-h-32 flex-col rounded-2xl p-4", i === 0 ? "bg-ink text-ink-foreground" : "bg-muted/60")}
            >
              <div className="flex items-baseline justify-between">
                <span className="font-medium">{f.concern}</span>
                <span className="tabular text-2xl">{f.score}</span>
              </div>
              <p className={cn("mt-1 text-xs italic", i === 0 ? "text-ink-muted" : "text-muted-foreground")}>"{f.query}"</p>
              <div className={cn("mt-3 h-1 rounded-full", i === 0 ? "bg-ink-raised" : "bg-border")}>
                <div className={cn("h-full rounded-full", i === 0 ? "bg-secondary" : "bg-primary")} style={{ width: `${f.score}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-ingredient rounded-3xl p-5 shadow-soft">
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="rounded-full bg-ink px-3 py-1 text-ink-foreground">Role: Active</span>
          <span className="rounded-full bg-card px-3 py-1">Evidence: High (Human RCT)</span>
        </div>
        <h2 className="mt-3 text-xl font-medium">Epigallocatechin gallate</h2>
        <p className="text-sm text-muted-foreground">
          <span className="font-mono text-xs tracking-wider">EGCG</span> · C<sub>22</sub>H<sub>18</sub>O<sub>11</sub>
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <img src={moleculeImg} alt="3D render of the EGCG molecule" width={768} height={896} loading="lazy" className="h-full min-h-48 w-full rounded-2xl object-cover" />
          <div className="flex flex-col gap-2 text-sm">
            <Stat label="pKa" value="7.65" />
            <Stat label="Optimal range" value="0.10–2.00%" />
            <Stat label="Penetration" value="80" bar={80} tone="ink" />
            <Stat label="Solubility" value="27" bar={27} tone="pink" />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <button type="button" className="inline-flex items-center gap-1 text-sm font-medium underline underline-offset-4">
            Full ingredient report <ArrowUpRight className="size-4" />
          </button>
          <Button variant="ink" size="sm" className="rounded-full">
            +1 products
          </Button>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value, bar, tone }: { label: string; value: string; bar?: number; tone?: "ink" | "pink" }) {
  return (
    <div className="rounded-xl bg-card px-3 py-2">
      <div className="flex items-center justify-between gap-2">
        <span>{label}</span>
        <span className="tabular whitespace-nowrap">{value}</span>
      </div>
      {bar !== undefined && (
        <div className="mt-1.5 h-1 rounded-full bg-muted">
          <div className={cn("h-full rounded-full", tone === "ink" ? "bg-ink" : "bg-primary")} style={{ width: `${bar}%` }} />
        </div>
      )}
    </div>
  );
}
