import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Download } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScoreRing } from "@/components/dashboard/ScoreRing";
import { Bar, ChangeChip, Formula, Panel, Segmented, Tag } from "@/components/site/ui";
import { cn } from "@/lib/utils";
import { egcgOverview as e, eyeSerum } from "@/lib/reports-data";

const factTones = ["bg-accent", "bg-card", "bg-card", "bg-blush/70", "bg-muted", "bg-ink text-ink-foreground"];
const years = ["2024", "2025", "2026"] as const;

export function EgcgOverview() {
  const [saved, setSaved] = useState(false);
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [year, setYear] = useState<(typeof years)[number]>("2026");
  const lead = eyeSerum;
  const max = Math.max(...e.searchInterest.map((s) => s.v));
  const milestones = e.milestones[year];

  return (
    <div className="flex flex-col gap-4">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border pb-4">
        <div className="flex items-center gap-3">
          <span className="size-11 rounded-full bg-secondary" aria-hidden />
          <div>
            <h1 className="text-3xl font-medium">{e.name}</h1>
            <p className="font-mono text-xs text-muted-foreground">
              {e.code} · <Formula value={e.formula} />
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Tag tone="ink" className="py-1.5">Role: Active</Tag>
          <Tag className="py-1.5">Evidence: High (Human RCT)</Tag>
          <Button variant="outline" size="sm" className="rounded-full" aria-pressed={saved} onClick={() => setSaved((v) => !v)}>
            {saved ? "Saved ✓" : "Save report"}
          </Button>
          <Button variant="outline" size="sm" className="rounded-full" onClick={() => window.print()}>
            PDF <Download className="size-3.5" />
          </Button>
        </div>
      </header>

      <section>
        <p className="eyebrow text-[0.6rem] text-muted-foreground">Overview</p>
        <p className="mt-1 max-w-3xl">{e.overview}</p>
      </section>

      <div className="bg-ingredient grid gap-2 rounded-3xl p-3 sm:grid-cols-3">
        {e.facts.map((f, i) => (
          <div key={f.label} className={cn("rounded-2xl px-4 py-3", factTones[i])}>
            <p className={cn("eyebrow text-[0.55rem]", i === 5 ? "text-ink-muted" : "text-muted-foreground")}>{f.label}</p>
            <p className="mt-1 text-lg font-medium">{f.value}</p>
          </div>
        ))}
      </div>

      {lead && (
        <section>
          <p className="eyebrow text-[0.6rem] text-muted-foreground">Product trend signal</p>
          <div className="mt-2 grid items-center gap-3 rounded-2xl bg-card p-3 shadow-soft sm:grid-cols-[24px_1.4fr_repeat(3,1fr)_auto_auto]">
            <span className="font-mono text-xs text-muted-foreground">01</span>
            <span className="font-medium">{lead.name}</span>
            <span className="text-primary">{lead.brand}</span>
            <span className="text-sm">{lead.country}</span>
            <span className="text-sm">{lead.category} · Caffeine 5% · EGCG</span>
            <span className="text-xs text-muted-foreground">Trend data coming soon</span>
            <Link to="/theory/trending-products" className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs hover:bg-muted">
              All trending <ArrowUpRight className="size-3" />
            </Link>
          </div>
        </section>
      )}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[1fr_1fr_1.4fr_1fr]">
        <section className="flex flex-col rounded-3xl bg-accent p-5">
          <p className="eyebrow text-[0.6rem] text-muted-foreground">Weekly signal</p>
          <p className="mt-1 text-xl font-medium leading-snug">Get EGCG updates every week</p>
          <form
            aria-label="EGCG weekly updates"
            className="mt-auto flex flex-col gap-2 pt-6"
            onSubmit={(event) => {
              event.preventDefault();
              setNewsletterSubmitted(true);
            }}
          >
            <label htmlFor="egcg-weekly-email" className="sr-only">Email address</label>
            <input
              id="egcg-weekly-email"
              type="email"
              autoComplete="email"
              required
              placeholder="Email address"
              className="h-10 w-full min-w-0 rounded-full border border-transparent bg-card px-4 text-sm text-card-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <Button type="submit" variant="ink" className="h-10 w-full rounded-full">Subscribe</Button>
            {newsletterSubmitted && (
              <p role="status" className="text-xs text-muted-foreground">Newsletter sign-ups are coming soon. Your email has not been saved.</p>
            )}
          </form>
        </section>
        <section className="flex flex-col rounded-3xl bg-ink p-5 text-ink-foreground">
          <div className="flex items-center justify-between">
            <p className="eyebrow text-[0.6rem] text-secondary">Ingredient trend signal</p>
            <span className="eyebrow rounded bg-negative px-1.5 py-0.5 text-[0.5rem] text-ink-foreground">New</span>
          </div>
          <p className="mt-2 text-4xl">{e.code}</p>
          <p className="mt-2 text-sm text-ink-muted">Green-tea catechin moving from niche K-beauty serums into mass cleansers.</p>
          <dl className="mt-3 grid grid-cols-2 gap-2">
            <div><dt className="eyebrow text-[0.55rem] text-ink-muted">Trending products</dt><dd className="tabular text-xl">{e.trendingProducts}</dd></div>
            <div><dt className="eyebrow text-[0.55rem] text-ink-muted">Top market</dt><dd className="text-xl">Global</dd></div>
          </dl>
        </section>
        <Panel>
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Search interest · 12 months</h2>
            <ChangeChip value={22} />
          </div>
          <ul className="mt-4 flex h-36 items-end gap-1.5" aria-label="Monthly search interest">
            {e.searchInterest.map((s, i) => (
              <li key={s.m} className="flex h-full flex-1 flex-col items-center justify-end gap-1" title={`${s.m}: ${s.v}`}>
                <span className={cn("w-full rounded-md", i === e.searchInterest.length - 1 ? "bg-ink" : i >= 7 ? "bg-secondary" : "bg-muted")} style={{ height: `${(s.v / max) * 100}%` }} />
                <span className="font-mono text-[0.5rem] text-muted-foreground">{s.m.toUpperCase()}</span>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel className="flex flex-col items-center">
          <ScoreRing value={e.trendSignal.total} size={92} stroke={10}>
            <span className="flex flex-col items-center leading-none">
              <span className="tabular text-2xl">{e.trendSignal.total}</span>
              <span className="font-mono text-[0.55rem] text-muted-foreground">/ 100</span>
            </span>
          </ScoreRing>
          <p className="eyebrow mt-2 text-[0.55rem] text-muted-foreground">Trend signal</p>
          <ul className="mt-2 flex w-full flex-col gap-1.5 text-xs">
            {e.trendSignal.parts.map((p) => (
              <li key={p.label} className="grid grid-cols-[60px_1fr_22px] items-center gap-2">
                <span>{p.label}</span>
                <Bar value={p.value} />
                <span className="tabular text-right">{p.value}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-medium">Latest statistics</h2>
            <p className="text-xs text-muted-foreground">Search interest, launches and retail share, updated as new data arrives.</p>
          </div>
          <Segmented label="Year" options={years} value={year} onChange={setYear} />
          <span className="font-medium">Milestones</span>
        </div>
        {milestones.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">No milestones tracked for {year} yet.</p>
        ) : (
          <ol className="relative mt-5 grid gap-4 sm:grid-cols-4">
            <span aria-hidden className="absolute left-0 right-0 top-1.5 hidden h-px bg-border sm:block" />
            {milestones.map((m) => (
              <li key={m.date} className="relative">
                <span className={cn("block size-3 rounded-full", m.now ? "bg-negative" : "bg-ink")} />
                <p className="eyebrow mt-2 text-[0.55rem] text-muted-foreground">{m.date}</p>
                <p className="text-sm">{m.text}</p>
              </li>
            ))}
          </ol>
        )}
      </Panel>
    </div>
  );
}
