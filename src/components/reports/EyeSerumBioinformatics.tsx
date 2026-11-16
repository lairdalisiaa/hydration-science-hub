import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Download } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LevelScale, Panel, Segmented, Tag } from "@/components/site/ui";
import { cn } from "@/lib/utils";
import { bioderivative, eyeSerum, groupOrder, inci, pathways, productAnalysis, productSignal, type IngredientGroup } from "@/lib/reports-data";

const groupTone: Record<IngredientGroup, string> = {
  Solvent: "bg-muted-foreground/30",
  Actives: "bg-primary",
  "Antioxidants & supporting": "bg-secondary",
  "Humectants & hydration": "bg-blush",
  "Texture & film-formers": "bg-muted-foreground/50",
  "Delivery & solvents": "bg-ink-raised",
  "Acids & pH": "bg-ink",
  Chelator: "bg-accent",
  "Preservative system": "bg-ink",
};

export function EyeSerumBioinformatics() {
  const [view, setView] = useState<"Grouped" | "INCI order">("Grouped");
  const [saved, setSaved] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-medium">{eyeSerum.name}</h1>
          <p className="eyebrow text-[0.6rem] text-muted-foreground">Eye serum · 26 ingredients · water-based</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="rounded-full" aria-pressed={saved} onClick={() => setSaved((v) => !v)}>
            {saved ? "Saved ✓" : "Save report"}
          </Button>
          <Button variant="outline" size="sm" className="rounded-full" onClick={() => window.print()}>
            PDF <Download className="size-3.5" />
          </Button>
        </div>
      </header>

      <section>
        <h2 className="font-medium">Compare Product to Bioderivative</h2>
        <div className="relative mt-3 grid gap-3 md:grid-cols-2">
          {(["left", "right"] as const).map((side) => (
            <div key={side} className={cn("rounded-3xl p-5 shadow-soft", side === "right" ? "bg-accent" : "bg-card")}>
              <p className="text-lg font-medium">{bioderivative[side].name}</p>
              <p className="text-xs text-muted-foreground">{bioderivative[side].sub}</p>
              <dl className="mt-3 flex flex-col divide-y divide-border text-sm">
                {bioderivative.rows.map((r) => (
                  <div key={r.label} className="grid grid-cols-[1fr_1.3fr_68px] items-center gap-2 py-2">
                    <dt className="eyebrow text-[0.55rem] text-muted-foreground">{r.label}</dt>
                    <dd>{r[side]}</dd>
                    <span>{r.winner === side && <span className="eyebrow rounded bg-ink px-1.5 py-0.5 text-[0.5rem] text-ink-foreground">Stronger</span>}</span>
                  </div>
                ))}
              </dl>
            </div>
          ))}
          <span className="absolute left-1/2 top-1/2 hidden size-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-card text-xs font-medium shadow-soft md:grid">vs</span>
        </div>
        <p className="eyebrow mt-2 text-[0.55rem] text-muted-foreground">Sample comparison · verify against sources</p>
      </section>

      <Panel>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-medium">Ingredient List, Grouped and Classed</h2>
          <Segmented label="Ingredient view" options={["Grouped", "INCI order"] as const} value={view} onChange={setView} />
        </div>
        <ol className="mt-3 grid grid-cols-[repeat(13,minmax(0,1fr))] gap-1 sm:grid-cols-[repeat(26,minmax(0,1fr))]" aria-label="Ingredient strip by group">
          {inci.map((i) => (
            <li key={i.n} title={`${i.n}. ${i.name} — ${i.group}`} className="flex flex-col items-center gap-0.5">
              <span className={cn("h-4 w-full rounded-sm", groupTone[i.group])} />
              <span className="font-mono text-[0.5rem] text-muted-foreground">{String(i.n).padStart(2, "0")}</span>
            </li>
          ))}
        </ol>
        <p className="eyebrow mt-1 text-[0.55rem] text-muted-foreground">INCI order · caffeine at 02 · EGCG glucoside at 06</p>
        {view === "Grouped" ? (
          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {groupOrder.map((g) => {
              const items = inci.filter((i) => i.group === g);
              return (
                <div key={g} className="rounded-2xl bg-muted/50 p-3">
                  <p className="flex items-center justify-between text-sm font-medium">
                    <span className="flex items-center gap-2"><span className={cn("size-2.5 rounded-sm", groupTone[g])} /> {g}</span>
                    <span className="tabular text-xs text-muted-foreground">{items.length}</span>
                  </p>
                  <ul className="mt-2 flex flex-wrap gap-1">
                    {items.map((i) => (
                      <li key={i.n} className="rounded-full bg-card px-2 py-0.5 text-xs">
                        <span className="font-mono text-[0.6rem] text-muted-foreground">{String(i.n).padStart(2, "0")}</span> {i.name}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        ) : (
          <ol className="mt-3 grid gap-1 text-sm sm:grid-cols-2 lg:grid-cols-3">
            {inci.map((i) => (
              <li key={i.n} className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-muted/60">
                <span className={cn("size-2 rounded-sm", groupTone[i.group])} />
                <span className="font-mono text-[0.6rem] text-muted-foreground">{String(i.n).padStart(2, "0")}</span>
                {i.name}
              </li>
            ))}
          </ol>
        )}
      </Panel>

      <Panel>
        <h2 className="font-medium">
          Target Pathways <span className="eyebrow text-[0.55rem] font-normal text-muted-foreground">· sample data</span>
        </h2>
        <ul className="mt-2 flex flex-col divide-y divide-border">
          {pathways.map((p) => (
            <li key={p.name} className="grid items-center gap-2 py-2.5 text-sm md:grid-cols-[220px_150px_1fr]">
              <span className="font-medium">{p.name}</span>
              <LevelScale level={p.level} />
              <span className="flex flex-wrap gap-1">{p.ingredients.map((i) => <Tag key={i}>{i}</Tag>)}</span>
            </li>
          ))}
        </ul>
      </Panel>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-3xl bg-ink p-5 text-ink-foreground">
          <p className="eyebrow text-[0.6rem] text-secondary">Product analysis</p>
          <dl className="mt-2 flex flex-col divide-y divide-ink-raised text-sm">
            {productAnalysis.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[130px_1fr] gap-2 py-2.5">
                <dt className="text-ink-muted">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <span className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">Fragrance free · yes</span>
            <span className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground">Essential-oil free · yes</span>
          </div>
        </section>
        <section className="flex flex-col items-center justify-center rounded-3xl bg-accent p-5">
          <p className="eyebrow text-[0.6rem] text-muted-foreground">Product synergy · key ingredients</p>
          <div className="mt-4 flex items-center">
            <Bubble size={120} className="bg-ink text-ink-foreground" name="Caffeine" role="primary" />
            <Bubble size={120} className="-ml-4 bg-secondary text-secondary-foreground" name="EGCG glucoside" role="primary" />
            <Bubble size={76} className="-ml-3 border border-border bg-card" name="Hyaluronic acid" />
            <Bubble size={76} className="-ml-3 border border-border bg-card" name="Oxidized glutathione" />
          </div>
          <p className="mt-4 text-xs text-muted-foreground">Circle size shows each ingredient's role in the formula.</p>
        </section>
      </div>

      <Panel>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-medium">Product Signal</h2>
          <Link to="/theory/trending-products" className="inline-flex items-center gap-1 text-sm underline underline-offset-4">
            Trending products with this ingredient · View all <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
        <dl className="mt-2 flex flex-col divide-y divide-border text-sm">
          {productSignal.map((s) => (
            <div key={s.label} className="grid grid-cols-[1fr_1fr_auto] items-center gap-2 py-2.5">
              <dt className="eyebrow text-[0.55rem] text-muted-foreground">{s.label}</dt>
              <dd className={cn(s.positive && "text-positive")}>{s.value}</dd>
              <Tag tone={s.positive ? "ink" : "soft"}>{s.status}</Tag>
            </div>
          ))}
        </dl>
      </Panel>
    </div>
  );
}

function Bubble({ size, className, name, role }: { size: number; className: string; name: string; role?: string }) {
  return (
    <div className={cn("grid shrink-0 place-items-center rounded-full p-2 text-center", className)} style={{ width: size, height: size }}>
      <span className="text-xs font-medium leading-tight">
        {name}
        {role && <span className="mt-0.5 block font-mono text-[0.55rem] opacity-70">{role}</span>}
      </span>
    </div>
  );
}
