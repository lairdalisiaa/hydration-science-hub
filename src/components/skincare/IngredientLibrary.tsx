import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Search } from "lucide-react";
import { useState } from "react";
import { ChangeChip, Formula, Segmented, Tag } from "@/components/site/ui";
import { cn } from "@/lib/utils";
import { filterIngredients, libraryIngredients, libraryTotals, type Concern, type LibraryIngredient, type LibrarySort } from "@/lib/ingredients-data";

const concerns = ["Barrier care", "Hydration", "Brightening", "Soothing", "Firming", "Clarifying"] as const satisfies readonly Concern[];
const sorts = ["Trending", "Most searched", "A–Z"] as const satisfies readonly LibrarySort[];

export function IngredientLibrary() {
  const [query, setQuery] = useState("");
  const [concern, setConcern] = useState<(typeof concerns)[number] | "All">("All");
  const [sort, setSort] = useState<LibrarySort>("Trending");
  const [view, setView] = useState<"Grid" | "List">("Grid");
  const shown = filterIngredients(libraryIngredients, query, concern, sort);

  return (
    <main className="px-4 py-6 lg:px-8">
      <p className="eyebrow text-[0.6rem] text-muted-foreground">Ingredient library · {libraryTotals.available} ingredient available</p>
      <h1 className="mt-1 text-4xl font-medium tracking-tight">Skincare</h1>
      <p className="mt-1 text-muted-foreground">Epigallocatechin gallate · more ingredients coming soon.</p>

      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <label className="flex h-11 shrink-0 items-center sm:flex-1 gap-2 rounded-full border border-border bg-card px-4">
          <Search className="size-4 text-muted-foreground" />
          <span className="sr-only">Search ingredients</span>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by ingredient, function or concern" className="h-full flex-1 bg-transparent text-sm outline-none" />
        </label>
        <label className="flex h-11 items-center gap-2 rounded-full border border-border bg-card px-4 text-sm">
          <span className="text-muted-foreground">Sort</span>
          <select value={sort} onChange={(e) => setSort(e.target.value as LibrarySort)} className="bg-transparent outline-none">
            {sorts.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
      </div>

      <div role="group" aria-label="Filter by concern" className="-mx-4 mt-3 flex gap-1.5 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 [&>*]:shrink-0">
        {(["All", ...concerns] as const).map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={concern === c}
            onClick={() => setConcern(c)}
            className={cn("flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs", concern === c ? "border-ink bg-ink text-ink-foreground shadow-[inset_0_-2px_0_var(--primary)]" : "border-border bg-card hover:bg-muted")}
          >
            {c}
            <span className={cn("font-mono text-[0.6rem]", concern === c ? "text-ink-muted" : "text-muted-foreground")}>{c === "All" ? libraryTotals.all : libraryTotals[c]}</span>
          </button>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between">
        <p className="font-medium">
          {shown.length} of {concern === "All" ? libraryTotals.all : libraryTotals[concern]} ingredients
        </p>
        <Segmented label="Layout" options={["Grid", "List"] as const} value={view} onChange={setView} />
      </div>

      {shown.length === 0 ? (
        <p className="mt-4 rounded-3xl bg-card p-10 text-center text-sm text-muted-foreground">No ingredients match "{query}".</p>
      ) : view === "Grid" ? (
        <ul className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {shown.map((i) => (
            <li key={i.name} className={i.comingSoon ? undefined : "col-span-2 sm:col-span-1"}>
              <IngredientCard item={i} />
            </li>
          ))}
        </ul>
      ) : (
        <ul className="mt-3 flex flex-col gap-2">
          {shown.map((i) => (
            <li key={i.name} className="grid items-center gap-3 rounded-2xl bg-card p-3 shadow-soft sm:grid-cols-[64px_1.4fr_1fr_repeat(3,72px)_80px]">
              <FormulaTile formula={i.formula} small />
              <div>
                <p className="font-medium">{i.name}</p>
                <p className="font-mono text-[0.65rem] text-muted-foreground">{i.inci}</p>
              </div>
              <div className="flex flex-wrap gap-1">{i.concerns.map((c) => <Tag key={c}>{c}</Tag>)}</div>
              <Metric label={i.searchesAreSample ? "Searches · sample" : "Searches"} value={i.searches} />
              <Metric label="Saves" value={i.saves} />
              <Metric label="Products" value={i.products === null ? "Coming soon" : String(i.products)} />
              <Score item={i} />
            </li>
          ))}
        </ul>
      )}
      <p className="mt-5 text-center text-xs text-muted-foreground">{libraryTotals.available} available · {libraryTotals.all - libraryTotals.available} coming soon</p>
    </main>
  );
}

function IngredientCard({ item: i }: { item: LibraryIngredient }) {
  if (i.comingSoon) return (
    <div className="flex h-full flex-col rounded-3xl bg-card p-3 shadow-soft">
      <FormulaTile formula="Coming soon" />
      <p className="mt-3 font-medium leading-tight">{i.name}</p>
      <p className="mt-2 text-xs text-muted-foreground">Coming soon</p>
      <div className="mt-auto hidden grid-cols-3 gap-2 border-t border-border pt-2 sm:grid">
        <Metric label="Searches" value="Coming soon" />
        <Metric label="Saves" value="Coming soon" />
        <Metric label="Products" value="Coming soon" />
      </div>
    </div>
  );
  const body = (
    <>
      <div className="relative">
        <FormulaTile formula={i.formula} />
        {i.isNew && <span className="eyebrow absolute left-2 top-2 rounded bg-card px-1.5 py-0.5 text-[0.55rem] text-negative">New</span>}
      </div>
      <div className="mt-3 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-medium leading-tight">{i.name}</p>
          <p className="truncate font-mono text-[0.65rem] text-muted-foreground">{i.inci}</p>
        </div>
        <Score item={i} />
      </div>
      <div className="mt-2 flex flex-wrap gap-1">{i.concerns.map((c) => <Tag key={c}>{c}</Tag>)}</div>
      <div className="mt-3 grid grid-cols-3 border-t border-border pt-2">
        <Metric label={i.searchesAreSample ? "Searches · sample" : "Searches"} value={i.searches} />
        <Metric label="Saves" value={i.saves} />
        <Metric label="Products" value={i.products === null ? "Coming soon" : String(i.products)} />
      </div>
      {i.report && (
        <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary">
          Read report <ArrowUpRight className="size-3" />
        </span>
      )}
    </>
  );
  const cls = "flex h-full flex-col rounded-3xl bg-card p-3 shadow-soft";
  return i.report ? (
    <Link to={i.report} className={cn(cls, "transition-transform hover:-translate-y-0.5")}>
      {body}
    </Link>
  ) : (
    <div className={cls}>{body}</div>
  );
}

function FormulaTile({ formula, small }: { formula: string; small?: boolean }) {
  return (
    <div className={cn("bg-ingredient grid place-items-center rounded-2xl text-center font-mono", small ? "size-16 text-[0.55rem]" : "h-28 text-sm")}>
      <Formula value={formula} className="px-2" />
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="eyebrow text-[0.55rem] text-muted-foreground">{label}</p>
      <p className={cn("tabular", value === "Coming soon" ? "text-xs text-muted-foreground" : "text-sm")}>{value}</p>
    </div>
  );
}

function Score({ item: i }: { item: LibraryIngredient }) {
  if (i.comingSoon) return <span className="text-xs text-muted-foreground">Coming soon</span>;
  if (i.score === null || i.change === null) return <span className="text-right text-xl text-muted-foreground">—</span>;
  return (
    <div className="flex flex-col items-end gap-0.5">
      <span className="tabular text-xl">{i.score}</span>
      <ChangeChip value={i.change} className="text-[0.6rem]" />
    </div>
  );
}
