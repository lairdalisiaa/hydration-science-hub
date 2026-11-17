import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { ScoreRing } from "@/components/dashboard/ScoreRing";
import { MobileCard, MobileCarousel, MobileEyebrow } from "@/components/site/mobile";
import { cn } from "@/lib/utils";
import {
  activityProfile, deliveryModes, invitroAssays, keyTakeaway, mechanisms, performanceSignal, profileCards, scanner,
  signalCards, signalScore, skinLayers, synergies, targetMechanisms, trendIngredient, trendMeaning, trendSeries, trendStats, funnel,
  literature, type DeliveryMode,
} from "@/lib/theory-data";
import { trendingProducts } from "@/lib/products-data";
import moleculeImg from "@/assets/egcg-molecule.jpg";

const wrap = "flex flex-col gap-4 lg:hidden";

export function MobileCellSimulation() {
  const [mode, setMode] = useState<DeliveryMode>("Leave-on serum");
  const d = deliveryModes[mode];
  return (
    <div className={wrap}>
      <MobileCard className="border-l-2 border-crimson"><MobileEyebrow>Key takeaway · EGCG</MobileEyebrow><p className="mt-2 text-sm">{keyTakeaway.text}</p></MobileCard>
      <section className="rounded-3xl bg-ink p-4 text-ink-foreground">
        <div className="flex items-center justify-between gap-2"><MobileEyebrow className="text-secondary">Cell simulation</MobileEyebrow>
          <div className="flex rounded-full bg-ink-raised p-0.5 text-[0.65rem]">{(Object.keys(deliveryModes) as DeliveryMode[]).map(m => <button key={m} onClick={() => setMode(m)} className={cn("rounded-full px-2 py-1", m === mode ? "bg-secondary text-secondary-foreground" : "text-ink-muted")}>{m}</button>)}</div></div>
        <p className="mt-2 font-serif text-[26px] font-normal italic leading-[1.05] text-theory-heading-ink">where it goes in skin</p>
        <ol className="mt-3 flex flex-col gap-1.5 text-xs">{skinLayers.map((l, i) => <li key={l.name} className={cn("flex items-center justify-between rounded-xl px-3 py-3", i === 0 ? "bg-ink-raised" : "bg-ink-raised/60")}><span>{l.name}</span>{i === d.layer ? <span className="size-3 rounded-full border-2 border-crimson-bright bg-ink-foreground" /> : <span className="font-mono text-ink-muted">{l.detail}</span>}</li>)}</ol>
        <p className="mt-2 text-xs text-ink-muted">{d.label}</p>
      </section>
      <div className="grid grid-cols-2 gap-3">
        <MobileCard><MobileEyebrow>TEWL</MobileEyebrow><p className="tabular mt-6 text-4xl">{d.tewl}<span className="ml-1 text-xs text-muted-foreground">g/m²/h</span></p><p className="mt-1 text-xs text-muted-foreground">Lower is better</p></MobileCard>
        <MobileCard className="bg-ingredient"><MobileEyebrow>pKa signal</MobileEyebrow><div className="mt-4 flex items-center gap-2"><ScoreRing value={55} size={56}><span className="tabular text-sm font-semibold">7.65</span></ScoreRing><p className="text-xs">Sample estimate</p></div></MobileCard>
      </div>
      <MobileCarousel typography="theory-mockup" title="Ingredient" script="profile" count={profileCards.length}>
        {profileCards.map(c => <MobileCard key={c.title} className="w-72"><p className="font-script text-2xl text-crimson">{c.title}</p><dl className="mt-2 flex flex-col gap-2 text-xs">{c.rows.map(r => <div key={r.label} className="border-t border-border pt-2"><dt className="eyebrow text-[0.6rem] text-muted-foreground">{r.label}</dt><dd className="mt-0.5">{r.value}</dd></div>)}</dl></MobileCard>)}
      </MobileCarousel>
      <MobileCarousel typography="theory-mockup" title="Performance" script="signal" count={performanceSignal.length}>
        {performanceSignal.map(p => <MobileCard key={p.label} className="flex w-36 flex-col items-center gap-2 text-center"><ScoreRing value={p.meter} size={64}><span className="tabular text-xs font-semibold">{p.value}</span></ScoreRing><p className="text-xs font-medium">{p.label}</p><p className="text-[0.6rem] text-muted-foreground">{p.unit}</p></MobileCard>)}
      </MobileCarousel>
      <MobileCarousel typography="theory-mockup" title="Target" script="mechanisms" count={targetMechanisms.length}>
        {targetMechanisms.map(m => <MobileCard key={m.target} className="flex h-40 w-40 flex-col justify-between bg-ingredient"><p className="eyebrow text-[0.6rem]">{m.layer}</p><p className="text-sm font-semibold">{m.target}</p></MobileCard>)}
      </MobileCarousel>
    </div>
  );
}

export function MobileTrendSignal() {
  const series = trendSeries["12 months"];
  const max = Math.max(...series.map(s => s.actual ?? s.forecast ?? 0));
  return (
    <div className={wrap}>
      <MobileCard><p className="text-lg font-semibold">{trendIngredient.name}</p><p className="font-mono text-xs text-muted-foreground">{trendIngredient.short} · {trendIngredient.family}</p></MobileCard>
      <MobileCarousel typography="theory-mockup" title="Trend" script="at a glance" count={trendStats.length}>
        {trendStats.map(s => <MobileCard key={s.eyebrow} className="flex h-40 w-40 flex-col justify-between"><p className="eyebrow text-[0.6rem]">{s.eyebrow}</p><div><p className={cn("text-3xl font-semibold", s.positive && "text-positive")}>{s.value}</p><p className="mt-1 text-[0.65rem] text-muted-foreground">{s.note}</p></div></MobileCard>)}
      </MobileCarousel>
      <MobileCard>
        <div className="flex justify-between"><MobileEyebrow>Trend over time</MobileEyebrow><span className="font-mono text-[0.6rem] text-muted-foreground">2026 · sample</span></div>
        <div className="mt-4 flex h-32 items-end gap-1">{series.map(s => <div key={s.label} className="flex flex-1 flex-col items-center gap-1"><div className={cn("w-full rounded-t", s.actual !== undefined ? "bg-primary" : "bg-blush")} style={{ height: `${((s.actual ?? s.forecast ?? 0) / max) * 100}%` }} /><span className="text-[0.5rem] text-muted-foreground">{s.label[0]}</span></div>)}</div>
      </MobileCard>
      <div className="grid grid-cols-2 gap-3">
        <MobileCard className="flex flex-col items-center"><MobileEyebrow className="self-start">Signal score</MobileEyebrow><ScoreRing value={signalScore.total} size={84} tone="ink" className="mt-3"><span className="tabular text-2xl font-semibold">{signalScore.total}</span></ScoreRing></MobileCard>
        <MobileCard className="bg-ingredient"><MobileEyebrow>What it means</MobileEyebrow><p className="mt-3 line-clamp-6 text-xs">{trendMeaning}</p></MobileCard>
      </div>
      <MobileCarousel typography="theory-mockup" title="Signal" script="breakdown" count={signalCards.length}>
        {signalCards.map(c => <MobileCard key={c.title} className="w-64"><p className="font-semibold">{c.title}</p><p className="text-xs text-muted-foreground">{c.note}</p><dl className="mt-2 text-xs">{c.rows.map(([k, v]) => <div key={k} className="flex justify-between border-t border-border py-1.5"><dt className="text-muted-foreground">{k}</dt><dd className="font-semibold">{v}</dd></div>)}</dl></MobileCard>)}
      </MobileCarousel>
    </div>
  );
}

export function MobileBioinformatics() {
  return (
    <div className={wrap}>
      <div className="grid grid-cols-2 gap-3">
        <MobileCard><MobileEyebrow>Lipophilic efficiency</MobileEyebrow><p className="mt-6 text-xl font-semibold leading-tight">pIC50 – cLogP</p><p className="mt-1 text-[0.65rem] text-muted-foreground">Activity per unit of oiliness</p></MobileCard>
        <MobileCard className="bg-ingredient"><MobileEyebrow>In vitro</MobileEyebrow><p className="tabular mt-6 text-3xl font-semibold">{invitroAssays[0][1]}</p><p className="mt-1 text-[0.65rem]">IC50 · sample</p></MobileCard>
      </div>
      <MobileCard><MobileEyebrow>Activity profile</MobileEyebrow><ul className="mt-3 flex flex-col gap-2 text-xs">{activityProfile.map(a => <li key={a.label} className="grid grid-cols-[minmax(0,1fr)_80px_44px] items-center gap-2"><span className="min-w-0">{a.label}</span><span className="h-1 rounded-full bg-muted"><span className="block h-full rounded-full bg-primary" style={{ width: `${a.value}%` }} /></span><span className="text-right text-muted-foreground">{a.level}</span></li>)}</ul></MobileCard>
      <section className="relative overflow-hidden rounded-3xl"><img src={moleculeImg} alt="EGCG molecule" width={768} height={896} loading="lazy" className="aspect-square w-full object-cover" /><span className="absolute left-3 top-3 rounded-md bg-ink px-2 py-1 font-mono text-[0.6rem] text-ink-foreground">SAMPLE · INGREDIENT RELATIONSHIPS</span><p className="absolute bottom-3 left-4 font-script text-3xl text-crimson">EGCG, mapped</p></section>
      <MobileCarousel typography="theory-mockup" title="Pathways" script="& outcomes" count={mechanisms.length}>
        {mechanisms.map((m, i) => <MobileCard key={m.name} className="flex h-44 w-40 flex-col"><p className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</p><p className="mt-1 font-semibold">{m.name}</p><p className="text-[0.65rem] text-muted-foreground">{m.code}</p><span className="mt-auto self-start rounded-full bg-blush px-2 py-1 text-[0.65rem]">→ {m.outcome}</span></MobileCard>)}
      </MobileCarousel>
      <MobileCarousel typography="theory-mockup" title="Key" script="synergies" count={synergies.length}>
        {synergies.map(s => <MobileCard key={s.partner} className="w-60"><p className="font-mono text-[0.65rem] text-muted-foreground">EGCG</p><p className="font-semibold">+ {s.partner}</p><p className="mt-1 text-xs text-muted-foreground">{s.note}</p></MobileCard>)}
      </MobileCarousel>
      <p className="-mt-2 text-[0.65rem] text-muted-foreground">Illustrative pairings, not clinically verified.</p>
      <MobileCarousel typography="theory-mockup" title="Literature" script="evidence" count={literature.length}>
        {literature.map(l => <MobileCard key={l.kind} className="flex h-40 w-40 flex-col justify-between"><p className="eyebrow text-[0.6rem]">{l.kind}</p><div><p className="tabular text-4xl font-semibold">{l.count}</p><p className="text-[0.65rem] text-muted-foreground">{l.note}</p></div></MobileCard>)}
      </MobileCarousel>
    </div>
  );
}

export function MobileTrendingProducts() {
  const [top, ...rest] = trendingProducts;
  const dark = "bg-ink-raised text-ink-foreground shadow-none";
  return (
    <div className={wrap}>
      <MobileCarousel title="How we" script="locate trends" count={funnel.length}>
        {funnel.map(f => <MobileCard key={f.n} className={cn("flex h-40 w-44 flex-col justify-between", dark)}><p className="font-mono text-xs text-secondary">{f.n} · {f.title}</p><div><p className="tabular text-3xl font-semibold">{f.value}</p><p className="text-[0.65rem] text-ink-muted">{f.unit}</p></div></MobileCard>)}
      </MobileCarousel>
      <div className="grid grid-cols-2 gap-3">
        <MobileCard className={dark}><MobileEyebrow className="text-secondary">Scanner</MobileEyebrow><p className="mt-1 font-semibold">{scanner.code}</p><img src={moleculeImg} alt="EGCG molecule" width={768} height={896} loading="lazy" className="mt-2 aspect-[4/3] w-full rounded-xl object-cover" /></MobileCard>
        <MobileCard className={dark}><MobileEyebrow className="text-secondary">Molecule</MobileEyebrow><dl className="mt-2 flex flex-col gap-1.5 text-xs">{scanner.rings.map(r => <div key={r.label} className="flex justify-between"><dt className="text-ink-muted">{r.label}</dt><dd className="tabular">{r.value}</dd></div>)}</dl><p className="mt-2 text-[0.6rem] text-ink-muted">{scanner.class}</p></MobileCard>
      </div>
      {top && <section className="rounded-3xl bg-secondary p-4 text-secondary-foreground">
        <div className="flex items-start justify-between"><span className="tabular text-5xl">01</span><span className="rounded-full bg-ink px-2.5 py-1 text-xs text-ink-foreground">▲ {top.change}% vs last week</span></div>
        <div className="mt-3 grid grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-3"><img src={top.image} alt={top.name} loading="lazy" className="aspect-[3/4] w-full rounded-2xl object-cover" /><div className="flex min-w-0 flex-col"><p className="eyebrow text-[0.6rem]">{top.brand} · {top.category}</p><p className="mt-1 text-lg font-semibold leading-tight">{top.name}</p><p className="mt-1 font-script text-xl">why: {top.ingredient} {top.ingredientScore}/100</p><p className="mt-auto font-semibold">{top.price}</p><p className="text-sm"><b>{top.unitsPerWeek}</b> units/wk</p></div></div>
      </section>}
      <MobileCarousel title="Also trending in" script="New York" count={rest.length}>
        {rest.map((p, i) => <MobileCard key={p.id} className={cn("w-40", dark)}><div className="flex justify-between"><span className="tabular text-2xl">{String(i + 2).padStart(2, "0")}</span><span className={cn("text-xs", p.change >= 0 ? "text-positive" : "text-negative")}>{p.change >= 0 ? "+" : ""}{p.change}%</span></div><img src={p.image} alt={p.name} loading="lazy" className="mt-2 aspect-[4/3] w-full rounded-xl object-cover" /><p className="mt-2 text-xs font-semibold">{p.name}</p><p className="text-[0.65rem] text-ink-muted">{p.brand} · {p.price}</p></MobileCard>)}
      </MobileCarousel>
      <Link to="/reports/egcg" className="flex items-center justify-between rounded-3xl bg-ink-raised p-4 text-sm">Full EGCG report <ArrowUpRight className="size-4" /></Link>
    </div>
  );
}
