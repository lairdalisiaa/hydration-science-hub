import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LevelScale, Panel, Segmented, Tag } from "@/components/site/ui";
import { TewlScale } from "@/components/site/TewlScale";
import { tewlTrend } from "@/lib/dashboard-data";
import { cn } from "@/lib/utils";
import {
  diary,
  eyeSerum,
  groupOrder,
  inci,
  interactions,
  keyActives,
  morningRoutine,
  nightRoutine,
  otherEyeCreams,
  pathways,
  scheduleCategories,
} from "@/lib/reports-data";
import eyeSerumImg from "@/assets/product-eye-serum.jpg";

const keyNumbers = new Set(keyActives.map((k) => k.n));

export function EyeSerumGuide() {
  const [schedule, setSchedule] = useState<Record<string, { am: boolean; pm: boolean }>>({ "Eye cream": { am: true, pm: true } });
  const [done, setDone] = useState<string[]>([]);
  const [order, setOrder] = useState<"INCI order" | "Grouped">("INCI order");
  const [rating, setRating] = useState(4);
  const [decision, setDecision] = useState<"Keep" | "Adjust" | "Drop">("Keep");
  const [saved, setSaved] = useState(false);
  const [reactions, setReactions] = useState<string[]>([]);
  const [draft, setDraft] = useState<string | null>(null);
  const tewl = tewlTrend.at(-1)?.tewl ?? 0;

  const toggleSlot = (cat: string, slot: "am" | "pm") =>
    setSchedule((s) => ({ ...s, [cat]: { am: s[cat]?.am ?? false, pm: s[cat]?.pm ?? false, [slot]: !(s[cat]?.[slot] ?? false) } }));
  const toggleDone = (key: string) => setDone((d) => (d.includes(key) ? d.filter((x) => x !== key) : [...d, key]));

  return (
    <div className="flex flex-col gap-4">
      <Panel className="grid gap-4 md:grid-cols-[160px_1fr]">
        <img src={eyeSerumImg} alt={eyeSerum.name} width={816} height={816} className="aspect-square w-full rounded-2xl object-cover" />
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="eyebrow text-[0.6rem] text-muted-foreground">{eyeSerum.kicker}</p>
              <h1 className="mt-1 text-3xl font-medium">{eyeSerum.name}</h1>
              <div className="mt-2 flex flex-wrap gap-1.5">{eyeSerum.tags.map((t) => <Tag key={t}>{t}</Tag>)}</div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="rounded-full" aria-pressed={saved} onClick={() => setSaved((v) => !v)}>
                {saved ? "Saved ✓" : "Save report"}
              </Button>
              <Button variant="ink" size="sm" className="rounded-full" asChild>
                <Link to="/theory/trending-products">
                  Find a replacement <ArrowUpRight className="size-3.5 text-primary" />
                </Link>
              </Button>
            </div>
          </div>
          <dl className="grid gap-2 sm:grid-cols-4">
            <Fact label="Use" value={eyeSerum.use} />
            <div className="rounded-xl border border-border bg-background px-3 py-2">
              <dt className="eyebrow text-[0.55rem] text-muted-foreground">Left</dt>
              <dd className="flex items-center gap-2">
                <span className="tabular text-primary">{eyeSerum.left}%</span>
                <span className="h-1 flex-1 rounded-full bg-muted"><span className="block h-full rounded-full bg-primary" style={{ width: `${eyeSerum.left}%` }} /></span>
              </dd>
            </div>
            <Fact label="Opened" value={eyeSerum.opened} />
            <Fact label="Period after opening" value={eyeSerum.pao} />
          </dl>
        </div>
      </Panel>

      <Panel className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="font-medium">Product Schedule</h2>
          <table className="mt-3 w-full text-sm">
            <thead>
              <tr className="eyebrow text-[0.55rem] text-muted-foreground">
                <th className="py-1 text-left font-normal">Category</th>
                <th className="w-16 font-normal">AM</th>
                <th className="w-16 font-normal">PM</th>
              </tr>
            </thead>
            <tbody>
              {scheduleCategories.map((c) => {
                const row = schedule[c];
                const on = row?.am || row?.pm;
                return (
                  <tr key={c} className={cn(on && "bg-accent")}>
                    <td className="rounded-l-lg px-2 py-2">{c}</td>
                    {(["am", "pm"] as const).map((slot) => (
                      <td key={slot} className={cn("text-center", slot === "pm" && "rounded-r-lg")}>
                        <button
                          type="button"
                          role="checkbox"
                          aria-checked={row?.[slot] ?? false}
                          aria-label={`${c} ${slot.toUpperCase()}`}
                          onClick={() => toggleSlot(c, slot)}
                          className={cn("inline-grid size-5 place-items-center rounded-md border", row?.[slot] ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card")}
                        >
                          {row?.[slot] && <Check className="size-3" />}
                        </button>
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col justify-center gap-2 text-sm">
          <Row label="Frequency" value="Daily, AM & PM" />
          <Row label="Started" value="Week 46" />
          <Row label="Patch test" value={<span className="rounded-full bg-positive-soft px-2 py-0.5 text-xs text-positive">Passed · week 45</span>} />
          <p className="mt-1 text-xs text-muted-foreground">No other new product started this week.</p>
        </div>
      </Panel>

      <div className="grid gap-4 lg:grid-cols-2">
        <RoutineCard title="Morning" time="7:30 AM" icon={<Sun className="size-4" />} items={morningRoutine} done={done} onToggle={toggleDone} />
        <RoutineCard title="Night" time="10:00 PM" icon={<Moon className="size-4" />} items={nightRoutine} done={done} onToggle={toggleDone} dark />
      </div>

      <Panel>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-medium">Ingredients</h2>
          <Segmented label="Ingredient order" options={["INCI order", "Grouped"] as const} value={order} onChange={setOrder} />
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {keyActives.map((k) => (
            <div key={k.n} className="rounded-2xl bg-accent px-4 py-3">
              <p className="eyebrow text-[0.55rem] text-muted-foreground">Key active · {String(k.n).padStart(2, "0")}</p>
              <p className="text-lg font-medium">{k.name}</p>
              <p className="text-xs text-muted-foreground">{k.role}</p>
            </div>
          ))}
        </div>
        {order === "INCI order" ? (
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {inci.map((i) => <IngredientPill key={i.n} n={i.n} name={i.name} />)}
          </ul>
        ) : (
          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {groupOrder.map((g) => (
              <div key={g} className="rounded-xl bg-muted/50 p-3">
                <p className="text-xs font-medium">{g}</p>
                <ul className="mt-1.5 flex flex-wrap gap-1">
                  {inci.filter((i) => i.group === g).map((i) => <IngredientPill key={i.n} n={i.n} name={i.name} />)}
                </ul>
              </div>
            ))}
          </div>
        )}
        <Link to="/reports/eye-serum/bioinformatics" className="mt-3 inline-flex items-center gap-1 text-sm underline underline-offset-4">
          Full ingredient analysis in the Bioinformatics report <ArrowUpRight className="size-3.5" />
        </Link>
      </Panel>

      <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
        <Panel>
          <h2 className="font-medium">Product Interactions</h2>
          <ul className="mt-2 flex flex-col divide-y divide-border">
            {interactions.map((x) => (
              <li key={x.name} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                <div>
                  <p className="font-medium">{x.name}</p>
                  <p className="text-xs text-muted-foreground">{x.note}</p>
                </div>
                <span className={cn("rounded-full px-2.5 py-0.5 text-xs", x.ok ? "bg-positive-soft text-positive" : "bg-negative-soft text-negative")}>{x.verdict}</span>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel>
          <h2 className="font-medium">
            Product Category <span className="text-sm font-normal text-muted-foreground">· other eye creams</span>
          </h2>
          <ul className="mt-3 grid grid-cols-3 gap-2">
            {otherEyeCreams.map((p) => (
              <li key={p.name} className="text-sm">
                <div className="bg-ingredient h-16 rounded-xl" aria-hidden />
                <p className="mt-1.5 font-medium leading-tight">{p.name}</p>
                <p className="flex justify-between text-xs text-muted-foreground">
                  <span>{p.price}</span>
                  <span className="tabular">{p.score}/100</span>
                </p>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel className="grid gap-5 lg:grid-cols-[150px_1fr_1.1fr]">
        <FaceOutline />
        <div>
          <h2 className="font-medium">Skin Care Diary</h2>
          <p className="eyebrow text-[0.55rem] text-muted-foreground">Skinomic focus · 1–5 · this week vs last</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            {diary.map((d) => (
              <li key={d.label} className="grid grid-cols-[90px_1fr_48px] items-center gap-2">
                <span>{d.label}</span>
                <span className="flex gap-1" aria-label={`${d.now} out of 5`}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} className={cn("size-2.5 rounded-full", i < d.now ? "bg-primary" : "bg-muted")} />
                  ))}
                </span>
                <span className="tabular text-right text-xs text-muted-foreground">{d.now} vs {d.last}</span>
              </li>
            ))}
          </ul>
          {draft === null ? (
            <Button variant="ink" size="sm" className="mt-3 rounded-full" onClick={() => setDraft("")}>
              Log a reaction
            </Button>
          ) : (
            <form
              className="mt-3 flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                if (draft.trim()) setReactions((r) => [draft.trim(), ...r]);
                setDraft(null);
              }}
            >
              <input autoFocus value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="e.g. slight tingling under left eye" aria-label="Reaction" className="h-8 min-w-0 flex-1 rounded-full border border-border bg-background px-3 text-xs outline-none" />
              <Button type="submit" variant="ink" size="sm" className="h-8 rounded-full">Add</Button>
            </form>
          )}
          {reactions.length > 0 && (
            <ul className="mt-2 flex flex-col gap-1 text-xs text-muted-foreground">
              {reactions.map((r, i) => <li key={i}>• {r}</li>)}
            </ul>
          )}
        </div>
        <div>
          <p className="eyebrow text-[0.55rem] text-muted-foreground">Targeted pathways</p>
          <ul className="mt-2 flex flex-col divide-y divide-border">
            {pathways.filter((p) => p.name !== "Soothing").map((p) => (
              <li key={p.name} className="flex items-center justify-between gap-2 py-2 text-sm">
                <span>{p.name}</span>
                <LevelScale level={p.level} />
              </li>
            ))}
          </ul>
        </div>
      </Panel>

      <div className="grid gap-4 lg:grid-cols-3">
        <section className="flex flex-col justify-between gap-6 rounded-3xl bg-ink p-5 text-ink-foreground">
          <div>
            <p className="eyebrow text-[0.6rem] text-ink-muted">TEWL score</p>
            <p className="mt-1 flex items-baseline gap-1.5">
              <span className="tabular text-5xl font-light">{tewl}</span>
              <span className="font-mono text-xs text-ink-muted">g/m²/h</span>
            </p>
          </div>
          <div>
            <TewlScale value={tewl} />
            <p className="mt-3 text-xs text-ink-muted">Lower is better.</p>
          </div>
        </section>
        <Panel>
          <p className="eyebrow text-[0.6rem] text-muted-foreground">Product review · goal</p>
          <h2 className="mt-1 text-lg font-medium">Reduce under-eye puffiness</h2>
          <p className="mt-2 text-xs text-muted-foreground">Rating since starting</p>
          <div role="radiogroup" aria-label="Rating since starting" className="mt-1.5 flex gap-1.5">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                role="radio"
                aria-checked={rating === n}
                onClick={() => setRating(n)}
                className={cn("tabular grid size-8 place-items-center rounded-full border text-sm", n <= rating ? "border-ink bg-ink text-ink-foreground" : "border-border bg-card")}
              >
                {n}
              </button>
            ))}
          </div>
          <div className="mt-4">
            <Segmented label="Decision" options={["Keep", "Adjust", "Drop"] as const} value={decision} onChange={setDecision} />
          </div>
        </Panel>
        <Calendar />
      </div>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-background px-3 py-2">
      <dt className="eyebrow text-[0.55rem] text-muted-foreground">{label}</dt>
      <dd className="text-sm font-medium">{value}</dd>
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-muted/60 px-3 py-2.5">
      <span>{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function IngredientPill({ n, name }: { n: number; name: string }) {
  const key = keyNumbers.has(n);
  return (
    <li className={cn("flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs", key ? "bg-accent" : "bg-muted/70")}>
      <span className={cn("size-1.5 rounded-full", key ? "bg-primary" : "bg-muted-foreground/40")} />
      <span className="font-mono text-[0.6rem] text-muted-foreground">{String(n).padStart(2, "0")}</span> {name}
    </li>
  );
}

function RoutineCard({
  title,
  time,
  icon,
  items,
  done,
  onToggle,
  dark,
}: {
  title: string;
  time: string;
  icon: React.ReactNode;
  items: { name: string; kind: string; current?: boolean; note?: string }[];
  done: string[];
  onToggle: (key: string) => void;
  dark?: boolean;
}) {
  return (
    <section className={cn("overflow-hidden rounded-3xl shadow-soft", dark ? "bg-ink text-ink-foreground" : "bg-card")}>
      <div className={cn("flex items-center justify-between px-5 py-3", dark ? "bg-ink" : "bg-accent")}>
        <h2 className="flex items-center gap-2 font-medium">{icon} {title}</h2>
        <span className="font-mono text-xs">{time}</span>
      </div>
      <ol className="flex flex-col gap-1.5 p-3">
        {items.map((it, i) => {
          const key = `${title}-${i}`;
          const isDone = done.includes(key);
          return (
            <li key={key} className={cn("flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm", it.current ? (dark ? "bg-secondary text-secondary-foreground" : "bg-accent") : dark ? "bg-ink-raised/60" : "bg-muted/40")}>
              <span className="tabular w-4 text-xs">{i + 1}</span>
              <span className={cn("flex-1", isDone && "line-through opacity-60")}>
                {it.name} {it.note && <span className="text-xs opacity-70">{it.note}</span>}
              </span>
              <span className={cn("rounded-full border px-2 py-0.5 text-[0.65rem]", dark && !it.current ? "border-ink-raised" : "border-border bg-card text-card-foreground")}>{it.kind}</span>
              <button
                type="button"
                role="checkbox"
                aria-checked={isDone}
                aria-label={`Mark ${it.name} done`}
                onClick={() => onToggle(key)}
                className={cn("grid size-5 place-items-center rounded-full border", isDone ? "border-primary bg-primary text-primary-foreground" : dark && !it.current ? "border-ink-muted" : "border-muted-foreground/50")}
              >
                {isDone && <Check className="size-3" />}
              </button>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

function FaceOutline() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl bg-muted/50 p-3">
      <svg viewBox="0 0 100 120" className="h-32 w-auto" aria-label="Face outline with the under-eye area marked" role="img">
        <ellipse cx="50" cy="60" rx="34" ry="46" fill="none" stroke="var(--muted-foreground)" strokeWidth="1.2" />
        <path d="M30 50 q8 -5 16 0" fill="none" stroke="var(--muted-foreground)" strokeWidth="1.2" />
        <path d="M54 50 q8 -5 16 0" fill="none" stroke="var(--muted-foreground)" strokeWidth="1.2" />
        <rect x="26" y="56" width="48" height="8" rx="4" fill="var(--accent)" stroke="var(--primary)" strokeWidth="1.5" />
        <path d="M50 62 v12 q-4 3 0 4" fill="none" stroke="var(--muted-foreground)" strokeWidth="1" />
        <path d="M40 88 q10 6 20 0" fill="none" stroke="var(--muted-foreground)" strokeWidth="1.2" />
      </svg>
      <p className="eyebrow mt-1 text-center text-[0.5rem] text-muted-foreground">Under-eye marked</p>
    </div>
  );
}

function Calendar() {
  // November 2026 starts on a Sunday; week 46 runs 15–21.
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  return (
    <Panel>
      <div className="flex items-baseline justify-between">
        <h2 className="text-lg font-medium">November 2026</h2>
        <span className="eyebrow text-[0.55rem] text-muted-foreground">Week 46</span>
      </div>
      <div className="mt-2 grid grid-cols-7 gap-1 text-center text-xs">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <span key={i} className="eyebrow text-[0.55rem] text-muted-foreground">{d}</span>
        ))}
        {days.map((d) => (
          <span key={d} className={cn("tabular rounded-md py-1", d >= 15 && d <= 21 && "bg-accent", d === 15 && "ring-1 ring-primary")}>
            {d}
          </span>
        ))}
      </div>
      <p className="mt-2 text-xs text-muted-foreground">Opened {eyeSerum.opened.replace(", 2026", "")} · day {eyeSerum.dayOf.day} of {eyeSerum.dayOf.total}</p>
      <p className="mt-2 rounded-lg bg-negative-soft px-3 py-1.5 text-xs text-negative">Restock soon: {eyeSerum.left}% left</p>
    </Panel>
  );
}
