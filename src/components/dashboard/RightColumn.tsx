import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { featuredIngredient } from "@/lib/dashboard-data";
import { getFocus } from "@/lib/market-data";
import { useMarket } from "./market-context";
import { cn } from "@/lib/utils";
import moleculeImg from "@/assets/egcg-molecule.jpg";

  const { city } = useMarket();
  const skinomicFocus = getFocus(city);
export function SkinomicFocus({ className }: { className?: string }) {
  return (
    <section className={cn("rounded-3xl bg-card p-5 shadow-soft", className)}>
      <h2 className="text-xl font-medium">Skinomic Focus</h2>
      <p className="mt-1 text-sm text-muted-foreground">What everyone's asking. 0–100 index of 12-month search demand.</p>
      <div className="mt-4 grid grid-cols-[repeat(2,minmax(0,1fr))] gap-2">
        {skinomicFocus.map((f, i) => (
          <div key={f.concern} className={cn("flex min-w-0 flex-col rounded-2xl px-3 py-3", i === 0 ? "bg-ink text-ink-foreground" : "bg-muted/60")}>
            <div className="flex items-baseline justify-between gap-1">
              <span className={cn("min-w-0 flex-1 font-medium", f.concern === "Wrinkles" ? "text-xs" : "text-sm")}>{f.concern}</span>
              <span className="tabular shrink-0 text-xl">{f.score}</span>
            </div>
            <p className={cn("mt-1 text-xs italic", i === 0 ? "text-ink-muted" : "text-muted-foreground")}>"{f.query}"</p>
            <div className={cn("mt-2 h-1 rounded-full", i === 0 ? "bg-ink-raised" : "bg-border")}>
              <div className={cn("h-full rounded-full", i === 0 ? "bg-secondary" : "bg-primary")} style={{ width: `${f.score}%` }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function IngredientCard({ className }: { className?: string }) {
  return (
    <section className={cn("bg-ingredient flex flex-col rounded-3xl p-5 shadow-soft", className)}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-ink px-3 py-1 text-ink-foreground">Role: {featuredIngredient.role}</span>
            <span className="rounded-full bg-card px-3 py-1">Evidence: {featuredIngredient.evidence}</span>
          </div>
          <h2 className="mt-3 text-xl font-medium">{featuredIngredient.name}</h2>
          <p className="text-sm text-muted-foreground">
            <span className="font-mono text-xs tracking-wider">{featuredIngredient.shortName}</span> · C<sub>22</sub>H<sub>18</sub>O<sub>11</sub>
          </p>
        </div>
        <Button variant="ink" size="sm" className="rounded-full" asChild>
          <Link to="/skincare">+{featuredIngredient.products} products</Link>
        </Button>
      </div>
      <div className="mt-4 grid flex-1 gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] xl:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <img src={moleculeImg} alt="3D render of the EGCG molecule" width={768} height={896} loading="lazy" className="h-full max-h-56 min-h-40 w-full rounded-2xl object-cover" />
        <div className="flex flex-col gap-2 text-sm">
          <Stat label="pKa" value={featuredIngredient.pKa} />
          <Stat label="Optimal range" value={featuredIngredient.optimalRange} />
          <Stat label="Penetration" value={String(featuredIngredient.penetration)} bar={featuredIngredient.penetration} tone="ink" />
          <Stat label="Solubility" value={String(featuredIngredient.solubility)} bar={featuredIngredient.solubility} tone="pink" />
        </div>
        <div className="flex flex-col justify-center gap-3 rounded-2xl bg-card p-4 text-sm sm:col-span-2 xl:col-span-1">
          <p className="text-muted-foreground">{featuredIngredient.summary}</p>
          <Link to="/reports/egcg" className="inline-flex items-center gap-1 font-medium underline underline-offset-4">
            Full ingredient report <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
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
