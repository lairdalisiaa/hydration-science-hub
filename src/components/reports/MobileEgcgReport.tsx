import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { ScoreRing } from "@/components/dashboard/ScoreRing";
import { MobileCard, MobileCarousel, MobileEyebrow } from "@/components/site/mobile";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  bioderivative, diary, egcgOverview as e, eyeSerum, interactions, keyActives,
  morningRoutine, nightRoutine, pathways, productAnalysis, productSignal,
} from "@/lib/reports-data";
import eyeSerumImg from "@/assets/product-eye-serum.jpg";

const wrap = "flex flex-col gap-4 lg:hidden";

/** Phone layout for the EGCG ingredient overview (mockup screen 5i). */
export function MobileEgcgOverview() {
  const [sent, setSent] = useState(false);
  const max = Math.max(...e.searchInterest.map((s) => s.v));
  const milestones = e.milestones["2026"];
  return (
    <div className={wrap}>
      <MobileCard className="bg-ink text-ink-foreground">
        <div className="flex items-center justify-between">
          <MobileEyebrow className="text-ink-muted">Trend signal</MobileEyebrow>
          <span className="eyebrow rounded bg-negative px-1.5 py-0.5 text-[0.55rem]">New</span>
        </div>
        <div className="mt-5 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-4xl font-medium">{e.code}</p>
            <p className="mt-1 font-serif text-lg italic leading-snug text-secondary">from K-beauty serums to mass cleansers</p>
          </div>
          <ScoreRing value={e.trendSignal.total} size={84} stroke={9}><span className="tabular text-xl">{e.trendSignal.total}</span></ScoreRing>
        </div>
      </MobileCard>

      <MobileCarousel title="Ingredient" script="facts" count={e.facts.length}>
        {e.facts.map((f) => (
          <MobileCard key={f.label} className="flex min-h-28 w-44 flex-col justify-between">
            <p className="font-mono text-[0.6rem] uppercase text-muted-foreground">{f.label}</p>
            <p className="mt-4 font-medium">{f.value}</p>
          </MobileCard>
        ))}
      </MobileCarousel>

      <MobileCard>
        <div className="flex items-center justify-between">
          <MobileEyebrow>Search interest · 12 mo</MobileEyebrow>
          <span className="rounded-md bg-positive/15 px-2 py-0.5 text-xs font-medium text-positive">▲ 22%</span>
        </div>
        <ul className="mt-4 flex h-28 items-end gap-1" aria-label="Monthly search interest">
          {e.searchInterest.map((s, i) => (
            <li key={s.m} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
              <span className={cn("w-full rounded", i === e.searchInterest.length - 1 ? "bg-crimson" : i >= 7 ? "bg-secondary" : "bg-muted")} style={{ height: `${(s.v / max) * 100}%` }} />
              <span className="font-mono text-[0.45rem] text-muted-foreground">{s.m[0]}</span>
            </li>
          ))}
        </ul>
      </MobileCard>

      <div className="grid grid-cols-2 gap-3">
        <MobileCard>
          <MobileEyebrow>Top product</MobileEyebrow>
          <img src={eyeSerumImg} alt={eyeSerum.name} loading="lazy" className="mt-3 aspect-[4/3] w-full rounded-xl object-cover" />
          <p className="mt-2 text-sm font-semibold leading-tight">{eyeSerum.brand} {eyeSerum.name}</p>
        </MobileCard>
        <MobileCard className="flex flex-col bg-secondary/60">
          <MobileEyebrow>Products</MobileEyebrow>
          <p className="tabular mt-auto text-4xl font-medium">{e.trendingProducts}</p>
          <p className="text-xs text-muted-foreground">trending with EGCG</p>
        </MobileCard>
      </div>

      <MobileCarousel title="Mile" script="stones" count={milestones.length}>
        {milestones.map((m) => (
          <MobileCard key={m.date} className="flex min-h-28 w-44 flex-col justify-end">
            <span className={cn("mb-auto size-2.5 rounded-full", m.now ? "bg-negative" : "bg-ink")} />
            <p className="font-mono text-[0.6rem] uppercase text-muted-foreground">{m.date}</p>
            <p className="text-sm">{m.text}</p>
          </MobileCard>
        ))}
      </MobileCarousel>

      <form aria-label="Weekly EGCG updates" onSubmit={(ev) => { ev.preventDefault(); setSent(true); }} className="flex gap-2 rounded-full bg-secondary/70 p-1.5">
        <label htmlFor="egcg-mobile-email" className="sr-only">Email address</label>
        <input id="egcg-mobile-email" type="email" required autoComplete="email" placeholder="Weekly EGCG updates" className="h-10 min-w-0 flex-1 rounded-full bg-card px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring" />
        <Button type="submit" variant="ink" className="h-10 rounded-full">Subscribe</Button>
      </form>
      {sent && <p role="status" className="text-xs text-muted-foreground">Newsletter sign-ups are coming soon. Your email has not been saved.</p>}
    </div>
  );
}

function ProductCard() {
  return (
    <MobileCard className="flex items-center gap-3">
      <img src={eyeSerumImg} alt={eyeSerum.name} loading="lazy" className="size-20 shrink-0 rounded-2xl object-cover" />
      <div className="min-w-0">
        <p className="font-mono text-[0.6rem] uppercase text-crimson">{eyeSerum.brand}</p>
        <p className="font-semibold leading-tight">{eyeSerum.name}</p>
        <p className="mt-1 text-xs text-muted-foreground">{eyeSerum.kicker}</p>
      </div>
    </MobileCard>
  );
}

/** Phone layout for the EGCG product bioinformatics section. */
export function MobileEyeSerumBioinformatics() {
  return (
    <div className={wrap}>
      <ProductCard />
      <MobileCard>
        <MobileEyebrow>Product vs bioderivative</MobileEyebrow>
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
          <p className="font-semibold">{bioderivative.left.name}</p>
          <p className="font-semibold text-crimson">Glucoside form</p>
          {bioderivative.rows.map((r) => (
            <div key={r.label} className="col-span-2 grid grid-cols-2 gap-2 border-t border-border pt-2">
              <p className="col-span-2 font-mono text-[0.55rem] uppercase text-muted-foreground">{r.label}</p>
              <p className={cn(r.winner === "left" && "font-semibold")}>{r.left}</p>
              <p className={cn(r.winner === "right" && "font-semibold")}>{r.right}</p>
            </div>
          ))}
        </div>
      </MobileCard>
      <MobileCarousel title="Skin" script="pathways" count={pathways.length}>
        {pathways.map((p) => (
          <MobileCard key={p.name} className="w-56">
            <span className="rounded-full bg-blush px-2 py-0.5 font-mono text-[0.6rem] text-crimson">{p.level}</span>
            <p className="mt-3 text-sm font-semibold">{p.name}</p>
            <p className="mt-1 text-xs text-muted-foreground">{p.ingredients.join(" · ")}</p>
          </MobileCard>
        ))}
      </MobileCarousel>
      <MobileCard>
        <MobileEyebrow>Product analysis</MobileEyebrow>
        <dl className="mt-3 flex flex-col gap-2 text-sm">
          {productAnalysis.map(([k, v]) => (
            <div key={k} className="border-t border-border pt-2"><dt className="font-mono text-[0.55rem] uppercase text-muted-foreground">{k}</dt><dd>{v}</dd></div>
          ))}
        </dl>
      </MobileCard>
      <MobileCarousel title="Product" script="signal" count={productSignal.length}>
        {productSignal.map((s) => (
          <MobileCard key={s.label} className="w-40">
            <p className="font-mono text-[0.6rem] uppercase text-muted-foreground">{s.label}</p>
            <p className={cn("mt-4 text-2xl font-medium", s.positive && "text-positive")}>{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.status}</p>
          </MobileCard>
        ))}
      </MobileCarousel>
    </div>
  );
}

/** Phone layout for the EGCG skincare guide section. */
export function MobileEyeSerumGuide() {
  const [time, setTime] = useState<"AM" | "PM">("AM");
  const steps = time === "AM" ? morningRoutine : nightRoutine;
  return (
    <div className={wrap}>
      <ProductCard />
      <div className="grid grid-cols-2 gap-3">
        <MobileCard className="bg-ink text-ink-foreground">
          <MobileEyebrow className="text-ink-muted">Day of use</MobileEyebrow>
          <p className="tabular mt-4 text-3xl">{eyeSerum.dayOf.day}<span className="text-sm text-ink-muted"> / {eyeSerum.dayOf.total}</span></p>
          <p className="text-xs text-ink-muted">{eyeSerum.use}</p>
        </MobileCard>
        <MobileCard>
          <MobileEyebrow>Left</MobileEyebrow>
          <ScoreRing value={eyeSerum.left} size={64} stroke={7} className="mt-3"><span className="tabular text-sm">{eyeSerum.left}%</span></ScoreRing>
          <p className="mt-2 text-[0.65rem] text-muted-foreground">{eyeSerum.pao}</p>
        </MobileCard>
      </div>
      <MobileCard>
        <div className="flex items-center justify-between">
          <MobileEyebrow>Routine</MobileEyebrow>
          <div role="group" aria-label="Routine time" className="flex gap-1 rounded-full bg-muted p-1">
            {(["AM", "PM"] as const).map((t) => (
              <button key={t} type="button" aria-pressed={time === t} onClick={() => setTime(t)} className={cn("rounded-full px-3 py-1 text-xs", time === t ? "bg-ink text-ink-foreground" : "text-muted-foreground")}>{t}</button>
            ))}
          </div>
        </div>
        <ol className="mt-3 flex flex-col gap-2">
          {steps.map((s, i) => (
            <li key={s.name} className={cn("flex items-center gap-3 rounded-2xl px-3 py-2 text-sm", s.current ? "bg-blush" : "bg-muted/60")}>
              <span className="font-mono text-[0.6rem] text-crimson">{String(i + 1).padStart(2, "0")}</span>
              <span className="flex-1">{s.name}{"note" in s && typeof s.note === "string" ? <span className="block text-[0.65rem] text-muted-foreground">{s.note}</span> : null}</span>
              <span className="font-mono text-[0.55rem] uppercase text-muted-foreground">{s.kind}</span>
            </li>
          ))}
        </ol>
      </MobileCard>
      <MobileCarousel title="Key" script="actives" count={keyActives.length}>
        {keyActives.map((a) => (
          <MobileCard key={a.name} className="w-40">
            <span className="font-mono text-[0.6rem] text-muted-foreground">INCI #{a.n}</span>
            <p className="mt-3 font-semibold">{a.name}</p>
            <p className="text-xs text-crimson">{a.role}</p>
          </MobileCard>
        ))}
      </MobileCarousel>
      <MobileCarousel title="Product" script="interactions" count={interactions.length}>
        {interactions.map((x) => (
          <MobileCard key={x.name} className="w-52">
            <span className={cn("rounded-full px-2 py-0.5 text-[0.6rem]", x.ok ? "bg-positive/15 text-positive" : "bg-negative/15 text-negative")}>{x.verdict}</span>
            <p className="mt-3 font-semibold">{x.name}</p>
            <p className="text-xs text-muted-foreground">{x.note}</p>
          </MobileCard>
        ))}
      </MobileCarousel>
      <MobileCard>
        <MobileEyebrow>Skin care diary · sample</MobileEyebrow>
        <ul className="mt-3 grid grid-cols-2 gap-2">
          {diary.map((d) => (
            <li key={d.label} className="rounded-2xl bg-muted/60 p-3">
              <p className="text-xs text-muted-foreground">{d.label}</p>
              <p className="tabular text-xl">{d.now}<span className="text-xs text-muted-foreground"> / 5 · last {d.last}</span></p>
            </li>
          ))}
        </ul>
      </MobileCard>
      <Link to="/theory/trending-products" className="flex items-center justify-between rounded-3xl bg-ink p-4 text-ink-foreground">
        <span><MobileEyebrow className="text-secondary">Explore</MobileEyebrow><span className="mt-1 block font-script text-2xl">all trending products</span></span>
        <span className="grid size-10 place-items-center rounded-full bg-secondary text-secondary-foreground"><ArrowUpRight className="size-4" /></span>
      </Link>
    </div>
  );
}
