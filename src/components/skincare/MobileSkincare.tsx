import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { MobileCard, MobileCarousel } from "@/components/site/mobile";
import { filterIngredients, libraryIngredients, libraryTotals, type Concern } from "@/lib/ingredients-data";
import { cn } from "@/lib/utils";

const concerns = ["All", "Barrier care", "Hydration", "Brightening", "Soothing", "Firming", "Clarifying"] as const;

export function MobileSkincare() {
  const [query, setQuery] = useState("");
  const [concern, setConcern] = useState<Concern | "All">("All");
  const shown = filterIngredients(libraryIngredients, query, concern, "Trending");
  const available = shown.filter(i => !i.comingSoon);
  const upcoming = shown.filter(i => i.comingSoon);
  return (
    <main className="flex flex-col gap-5 px-4 py-6 lg:hidden">
      <div><p className="eyebrow text-muted-foreground">Ingredient library · {libraryTotals.available} available</p><h1 className="mt-1 text-3xl font-semibold">Skincare, <span className="font-script font-normal text-crimson">decoded</span></h1></div>
      <label className="flex h-12 items-center gap-2 rounded-full bg-card px-4 shadow-soft backdrop-blur-xl"><Search className="size-4 text-muted-foreground" /><span className="sr-only">Search ingredients</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by ingredient or concern" className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none" /></label>
      <div role="group" aria-label="Filter by concern" className="-mx-4 flex gap-1.5 overflow-x-auto px-4 [scrollbar-width:none]">{concerns.map(c => <button key={c} onClick={() => setConcern(c)} className={cn("shrink-0 rounded-full border px-3 py-1.5 text-xs", c === concern ? "border-ink bg-ink text-ink-foreground" : "border-border bg-card")}>{c}</button>)}</div>
      {shown.length === 0 && <p className="rounded-3xl bg-card p-6 text-center text-sm text-muted-foreground">No ingredients match "{query}".</p>}
      {available.length > 0 && <MobileCarousel title="Trending" script="now" count={available.length}>
        {available.map(i => <MobileCard key={i.name} className="w-44"><div className="flex items-start justify-between"><span className="rounded-lg bg-ingredient px-2 py-1 font-mono text-[0.6rem]">{i.inci}</span>{i.change !== null && <span className="tabular text-xs text-positive">+{i.change}%</span>}</div><p className="tabular mt-3 text-5xl font-semibold">{i.score}</p><p className="mt-1 text-sm font-medium">{i.name}</p><p className="font-mono text-[0.6rem] text-muted-foreground">{i.products} PRODUCT · {i.searches} SEARCHES (SAMPLE)</p>{i.report && <Link to={i.report} className="mt-2 inline-block text-xs text-crimson underline">Read report</Link>}</MobileCard>)}
      </MobileCarousel>}
      {upcoming.length > 0 && <MobileCarousel title="More to" script="explore" count={upcoming.length}>
        {upcoming.map(i => <MobileCard key={i.name} className="flex h-40 w-36 flex-col"><span className="size-8 rounded-lg bg-muted" /><p className="mt-auto text-sm font-medium">{i.name}</p><p className="font-mono text-[0.6rem] text-muted-foreground">COMING SOON</p></MobileCard>)}
      </MobileCarousel>}
    </main>
  );
}
