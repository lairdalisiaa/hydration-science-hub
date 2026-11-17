import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { featuredIngredient, goals, skinomicFocus, topSearches } from "@/lib/dashboard-data";
import { cn } from "@/lib/utils";
import moleculeImg from "@/assets/egcg-molecule.jpg";
import { ExploreMarket, PartnerCard } from "./ExploreMarket";
import { FeaturedArticle } from "./MiddleColumn";
import { LocationPill } from "./LocationPill";
import { ScoreRing } from "./ScoreRing";
import { SkinPerformance } from "./SkinPerformance";
import { TewlTrend } from "./TewlTrend";

function WidgetCarousel({ title, count, children }: { title: ReactNode; count: number; children: ReactNode }) {
  return (
    <section className="min-w-0">
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
        <span className="flex items-center gap-2 font-mono text-xs text-muted-foreground">{count}<ArrowRight className="size-3 text-crimson" /></span>
      </div>
      <div tabIndex={0} className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3 [scrollbar-width:none]">{children}</div>
    </section>
  );
}

export function MobileDashboard() {
  const topSearch = topSearches[0];
  const peak = skinomicFocus.reduce<(typeof skinomicFocus)[number] | undefined>((best, item) => !best || item.score > best.score ? item : best, undefined);
  return (
    <div className="flex flex-col gap-4 px-4 py-5 lg:hidden">
      <section className="rounded-3xl bg-ink p-4 text-ink-foreground shadow-soft">
        <LocationPill className="bg-ink-raised text-ink-foreground shadow-none [&_.text-muted-foreground]:text-ink-muted" />
        <h1 className="mt-5 font-display text-3xl font-extrabold">addottee.</h1>
        <p className="mt-1 font-script text-3xl leading-tight text-crimson-bright">skincare, planned around your life</p>
      </section>
      <div className="grid grid-cols-2 gap-3">
        {topSearch && <div className="flex min-h-40 min-w-0 flex-col justify-between rounded-3xl bg-ingredient p-4 shadow-soft">
          <p className="eyebrow">Top search</p>
          <div><p className="break-words text-2xl font-semibold">{topSearch.brand}</p><p className="mt-2 text-xs"><span className="tabular rounded-md bg-positive-soft px-2 py-1 font-semibold text-positive">+{topSearch.change}%</span> this week</p></div>
        </div>}
        {peak && <div className="flex min-h-40 min-w-0 flex-col justify-between rounded-3xl bg-card p-4 shadow-soft backdrop-blur-xl">
          <p className="eyebrow">Skinomic peak</p>
          <div className="flex flex-wrap items-center gap-2"><ScoreRing value={peak.score} size={60}><span className="tabular font-semibold">{peak.score}</span></ScoreRing><div><p className="text-sm font-semibold">{peak.concern}</p><p className="text-xs text-muted-foreground">12-mo demand</p></div></div>
        </div>}
      </div>
      <ExploreMarket className="backdrop-blur-xl [&_li]:py-0 [&_li>div.relative]:py-2 [&_li:first-child]:py-2" />
      <WidgetCarousel title={<>Top <span className="font-script text-2xl font-normal text-crimson">searches</span></>} count={topSearches.length}>
        {topSearches.map((item, index) => <article key={item.brand} className="flex h-40 w-40 shrink-0 snap-start flex-col justify-between rounded-3xl bg-card p-4 shadow-soft backdrop-blur-xl">
          <div className="flex items-start justify-between gap-2"><span className="tabular text-3xl">{String(index + 1).padStart(2, "0")}</span><span className={cn("tabular rounded-md px-1.5 py-1 text-xs font-semibold", item.change >= 0 ? "bg-positive-soft text-positive" : "bg-negative-soft text-negative")}>{item.change >= 0 ? "+" : ""}{item.change}%</span></div>
          <div><h3 className="text-sm font-semibold">{item.brand}</h3><p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{item.product}</p></div>
        </article>)}
      </WidgetCarousel>
      <FeaturedArticle className="backdrop-blur-xl [&_img]:aspect-[4/3]" />
      <WidgetCarousel title={<>Skinomic <span className="font-script text-2xl font-normal text-crimson">focus</span></>} count={skinomicFocus.length}>
        {skinomicFocus.map((item, index) => <article key={item.concern} className={cn("flex h-40 w-40 shrink-0 snap-start flex-col rounded-3xl p-4 shadow-soft", index === 0 ? "bg-ink text-ink-foreground" : "bg-card backdrop-blur-xl")}>
          <h3 className="eyebrow">{item.concern}</h3><p className="tabular mt-auto text-4xl font-semibold">{item.score}</p><p className={cn("mt-2 text-xs italic", index === 0 ? "text-ink-muted" : "text-muted-foreground")}>“{item.query}”</p>
        </article>)}
      </WidgetCarousel>
      <section className="grid grid-cols-[100px_minmax(0,1fr)] gap-3 rounded-3xl bg-ingredient p-4 shadow-soft sm:grid-cols-[140px_minmax(0,1fr)]">
        <img src={moleculeImg} alt="EGCG molecule" width={768} height={896} className="h-full min-h-40 w-full rounded-2xl object-cover" loading="lazy" />
        <div className="min-w-0"><p className="eyebrow text-[0.6rem]">Ingredient of the week</p><h2 className="mt-2 break-words text-base font-semibold leading-tight">{featuredIngredient.name}</h2><p className="mt-1 font-mono text-[0.6rem] text-muted-foreground">{featuredIngredient.shortName} · {featuredIngredient.role}</p>
          <dl className="mt-3 grid grid-cols-3 gap-1 text-xs"><div><dt className="text-muted-foreground">Pen.</dt><dd className="tabular font-semibold">{featuredIngredient.penetration}</dd></div><div><dt className="text-muted-foreground">Sol.</dt><dd className="tabular font-semibold">{featuredIngredient.solubility}</dd></div><div><dt className="text-muted-foreground">pKa</dt><dd className="tabular font-semibold">{featuredIngredient.pKa}</dd></div></dl>
          <p className="mt-3 text-xs text-muted-foreground">{featuredIngredient.summary}</p><Button variant="link" size="sm" className="mt-2 h-auto whitespace-normal p-0 text-xs" asChild><Link to="/reports/egcg">Full ingredient report <ArrowUpRight className="size-3 shrink-0" /></Link></Button>
        </div>
      </section>
      <div className="grid grid-cols-2 gap-3">
        <section className="rounded-3xl bg-ink p-4 text-ink-foreground"><h2 className="eyebrow text-secondary">Goals</h2><div className="mt-3 flex flex-col gap-2">{goals.map(goal => <div key={goal.label} className="flex items-center gap-2"><ScoreRing value={goal.value} size={40} tone="ink"><span className="tabular text-[0.6rem]">{goal.value}%</span></ScoreRing><p className="min-w-0 text-xs text-ink-muted">{goal.label}</p></div>)}</div></section>
        <PartnerCard className="p-4 [&_h3]:text-base [&_p.text-sm]:text-xs" />
      </div>
      <SkinPerformance className="[&_ul]:grid [&_ul]:grid-cols-4 [&_ul]:gap-x-1 [&_li]:w-auto [&_li>span]:text-xs [&_h2]:text-3xl" />
      <TewlTrend />
    </div>
  );
}