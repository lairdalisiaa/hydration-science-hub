import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Formula } from "@/components/site/ui";
import { ScoreRing } from "@/components/dashboard/ScoreRing";
import { funnel, scanner } from "@/lib/theory-data";
import { trendingProducts, type ProductCategory } from "@/lib/products-data";
import moleculeImg from "@/assets/egcg-molecule.jpg";

const filters = ["All", "Serum", "Cleanser", "Moisturizer", "Lip"] as const satisfies readonly ("All" | ProductCategory)[];

export function TrendingProducts() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [saved, setSaved] = useState<string[]>(["pdrn-serum", "toleriane"]);
  const toggle = (id: string) => setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const ranked = trendingProducts.map((p, i) => ({ ...p, rank: i + 1 }));
  const shown = ranked.filter((p) => filter === "All" || p.category === filter);
  const [lead, ...rest] = shown;
  const savedProducts = ranked.filter((p) => saved.includes(p.id));

  return (
    <div className="flex flex-col gap-4">
      <section className="rounded-3xl border border-ink-raised bg-ink/80 p-5">
        <h2 className="text-lg font-medium">How we locate trending products</h2>
        <ol className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {funnel.map((f, i) => (
            <li key={f.n} className="flex flex-col">
              <div className="flex items-center gap-2 font-mono text-xs text-ink-muted">
                <span className={i === funnel.length - 1 ? "text-primary" : undefined}>{f.n}</span>
                <span className="h-px flex-1 bg-ink-raised" />
                <ArrowRight className="size-3" />
              </div>
              <p className="mt-2 font-medium">{f.title}</p>
              <p className="text-xs text-ink-muted">{f.note}</p>
              <p className="tabular mt-4 text-3xl font-light">{f.value}</p>
              <p className="font-mono text-[0.65rem] text-ink-muted">{f.unit}</p>
              <div className="mt-2 h-1.5 rounded-full bg-ink-raised">
                <div className={cn("h-full rounded-full", i === funnel.length - 1 ? "bg-primary" : "bg-secondary")} style={{ width: `${f.fill}%` }} />
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="grid gap-4 rounded-3xl border border-ink-raised bg-ink/80 p-4 lg:grid-cols-[220px_1fr_240px]">
        <div>
          <p className="eyebrow text-[0.6rem] text-secondary">Ingredient scanner</p>
          <p className="mt-1 font-mono text-xl">{scanner.code}</p>
          <p className="eyebrow text-[0.6rem] text-ink-muted">
            {scanner.name} · <Formula value={scanner.formula} />
          </p>
          <ul className="mt-4 flex gap-2">
            {scanner.rings.map((r) => (
              <li key={r.label} className="flex flex-col items-center gap-1">
                <ScoreRing value={r.fill} size={56} stroke={5} tone="ink">
                  <span className="tabular text-xs">{r.value}</span>
                </ScoreRing>
                <span className="font-mono text-[0.6rem] text-ink-muted">{r.label}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 flex flex-col divide-y divide-ink-raised font-mono text-xs">
            <div className="flex justify-between gap-3 py-2"><dt className="text-ink-muted">CHIRAL</dt><dd className="text-right">{scanner.chiral}</dd></div>
            <div className="flex justify-between gap-3 py-2"><dt className="text-ink-muted">CLASS</dt><dd className="text-right">{scanner.class}</dd></div>
          </dl>
          <p className="mt-2 text-[0.65rem] text-ink-muted">pKa and LogP are sample estimates; meters use reference scales.</p>
        </div>
        <div className="relative min-h-56 overflow-hidden rounded-2xl">
          <img src={moleculeImg} alt="Illustrative render of the Epigallocatechin gallate molecule" width={768} height={896} loading="lazy" className="absolute inset-0 h-full w-full object-contain" />
          <span className="absolute left-3 top-3 rounded bg-ink-raised px-2 py-1 font-mono text-xs">
            <Formula value={scanner.structure} />
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex-1 rounded-2xl bg-ink-raised p-3">
            <p className="eyebrow text-[0.6rem] text-ink-muted">Redox orbital · sample</p>
            <div className="mt-3 flex h-24 items-end gap-1.5">
              {scanner.redox.map((v, i) => (
                <span key={i} className="flex-1 rounded-sm bg-secondary" style={{ height: `${v}%` }} />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {scanner.atoms.map(([el, n]) => (
              <div key={el} className="rounded-xl bg-ink-raised p-2">
                <p className="font-mono text-[0.6rem] text-ink-muted">{el}</p>
                <p className="tabular text-lg">{n}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-3xl font-medium">Trending in New York</h2>
        <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-1.5">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={cn("rounded-full border px-3 py-1 text-xs", filter === f ? "border-secondary bg-secondary text-secondary-foreground" : "border-ink-raised text-ink-foreground hover:bg-ink-raised")}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {!lead ? (
        <p className="rounded-3xl border border-ink-raised p-8 text-center text-sm text-ink-muted">No trending {filter.toLowerCase()} products this week.</p>
      ) : (
        <div className="grid gap-3 lg:grid-cols-2">
          <article className="flex flex-col justify-between rounded-3xl bg-secondary p-5 text-secondary-foreground">
            <div className="flex items-start justify-between">
              <span className="tabular text-7xl font-light">{String(lead.rank).padStart(2, "0")}</span>
              <span className="rounded-full bg-ink px-3 py-1 text-xs text-ink-foreground">
                {lead.change >= 0 ? "+" : "−"}
                {Math.abs(lead.change)}% vs prior week
              </span>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-[180px_1fr] sm:items-end">
              <img src={lead.image} alt={lead.name} width={816} height={816} loading="lazy" className="aspect-square w-full rounded-2xl object-cover" />
              <div>
                <p className="eyebrow text-[0.6rem]">{lead.brand} · {lead.country} · {lead.category}</p>
                <h3 className="mt-1 text-3xl font-medium leading-tight">{lead.name}</h3>
                <p className="eyebrow mt-1 text-[0.6rem]">Why it's trending · {lead.ingredient} · {lead.ingredientScore}/100</p>
                <dl className="mt-3 flex gap-5">
                  <div><dd className="tabular text-xl">{lead.price}</dd><dt className="text-xs">price</dt></div>
                  <div><dd className="tabular text-xl">{lead.unitsPerWeek}</dd><dt className="text-xs">units / week</dt></div>
                  {lead.estSales && <div><dd className="tabular text-xl">{lead.estSales}</dd><dt className="text-xs">est. sales</dt></div>}
                </dl>
                <div className="mt-4 flex gap-2">
                  <Link to="/theory/trend-signal" className="inline-flex items-center gap-1 rounded-full bg-ink px-4 py-2 text-xs text-ink-foreground">
                    Ingredient report <ArrowUpRight className="size-3.5 text-primary" />
                  </Link>
                  <SaveButton saved={saved.includes(lead.id)} onClick={() => toggle(lead.id)} light />
                </div>
              </div>
            </div>
          </article>
          <div className="grid gap-3 sm:grid-cols-2">
            {rest.map((p) => (
              <article key={p.id} className="flex flex-col rounded-3xl border border-ink-raised bg-ink p-4">
                <div className="flex items-start justify-between">
                  <span className="tabular text-2xl font-light">{String(p.rank).padStart(2, "0")}</span>
                  <span className={cn("tabular rounded-md px-1.5 py-0.5 text-xs", p.change >= 0 ? "bg-positive-soft text-positive" : "bg-negative-soft text-negative")}>
                    {p.change >= 0 ? "+" : "−"}
                    {Math.abs(p.change)}%
                  </span>
                </div>
                <img src={p.image} alt={p.name} width={816} height={816} loading="lazy" className="mt-2 h-24 w-full rounded-xl object-cover" />
                <h3 className="mt-3 font-medium">{p.name}</h3>
                <p className="text-xs text-ink-muted">{p.brand} · {p.country}</p>
                <p className="font-mono text-[0.6rem] text-ink-muted">NY · {p.ingredient} · {p.ingredientScore}/100</p>
                <div className="mt-auto flex items-center justify-between pt-3 text-xs">
                  <span className="tabular">{p.price} · {p.unitsPerWeek}/wk</span>
                  <SaveButton saved={saved.includes(p.id)} onClick={() => toggle(p.id)} />
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      <div className="grid gap-3 lg:grid-cols-[2fr_1fr]">
        <section className="flex flex-wrap items-center gap-4 rounded-3xl border border-ink-raised bg-ink-raised/40 p-4">
          <div>
            <h2 className="font-medium">Your watchlist</h2>
            <p className="text-xs text-ink-muted"><span className="text-primary">●</span> {savedProducts.length} saved</p>
          </div>
          <ul className="flex flex-1 flex-wrap gap-2">
            {savedProducts.length === 0 && <li className="text-xs text-ink-muted">Save a product to watch it here.</li>}
            {savedProducts.map((p, i) => (
              <li key={p.id} className={cn("rounded-xl border px-3 py-2 text-xs", i === 0 ? "border-primary" : "border-ink-raised")}>
                <p>{p.name}</p>
                <p className="tabular text-ink-muted">{p.change >= 0 ? "+" : "−"}{Math.abs(p.change)}% this week</p>
              </li>
            ))}
          </ul>
        </section>
        <Link to="/theory/trend-signal" className="flex items-center justify-between gap-3 rounded-3xl border border-ink-raised bg-ink-raised/40 p-4 hover:bg-ink-raised">
          <span>
            <span className="eyebrow block text-[0.6rem] text-ink-muted">Related report</span>
            <span className="text-lg">Ingredient trend signal</span>
          </span>
          <span className="grid size-10 place-items-center rounded-full bg-secondary text-secondary-foreground"><ArrowUpRight className="size-4" /></span>
        </Link>
      </div>
    </div>
  );
}

function SaveButton({ saved, onClick, light }: { saved: boolean; onClick: () => void; light?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={saved}
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs",
        light ? "bg-card text-card-foreground" : saved ? "bg-ink-raised text-ink-foreground" : "bg-card text-card-foreground",
      )}
    >
      {saved ? <>Saved <Check className="size-3" /></> : "+ Save"}
    </button>
  );
}
