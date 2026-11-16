import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Clock, FileText, FlaskConical, Droplet, Search, SlidersHorizontal } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ChangeChip, Formula, Segmented, Tag } from "@/components/site/ui";
import { cn } from "@/lib/utils";
import {
  featuredReport,
  filterReports,
  howToGuides,
  reportConcerns,
  reportTypes,
  reports,
  type Evidence,
  type ReportFilters,
  type ReportStatus,
  type ReportType,
} from "@/lib/reports-data";
import moleculeImg from "@/assets/egcg-molecule.jpg";

const toggle = <T,>(list: T[], v: T) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

export function ReportsIndex() {
  const [f, setF] = useState<ReportFilters>({ query: "", types: [], concerns: [], evidence: [], status: [] });
  const [view, setView] = useState<"Grid" | "List">("List");
  const shown = filterReports(reports, f);

  return (
    <main className="px-4 py-6 lg:px-8">
      <p className="eyebrow text-[0.6rem] text-muted-foreground">Reports & guides · week 46</p>
      <h1 className="mt-1 text-4xl font-medium tracking-tight">Reports & Guides</h1>
      <p className="mt-1 text-muted-foreground">Ingredient reports, product analysis and how-to guides, updated weekly.</p>

      <section className="mt-5 grid gap-4 rounded-3xl bg-card p-3 shadow-soft md:grid-cols-[240px_1fr_auto] md:items-center">
        <div className="relative overflow-hidden rounded-2xl">
          <img src={moleculeImg} alt="3D render of the EGCG molecule" width={768} height={896} className="h-32 w-full object-cover" />
          <span className="eyebrow absolute left-2 top-2 rounded bg-card px-1.5 py-0.5 text-[0.55rem] text-negative">New</span>
        </div>
        <div className="px-2">
          <p className="eyebrow text-[0.6rem] text-muted-foreground">Featured report · published {featuredReport.published}</p>
          <h2 className="mt-1 text-2xl font-medium">{featuredReport.title}</h2>
          <div className="mt-2 flex flex-wrap gap-1.5">{featuredReport.tags.map((t) => <Tag key={t}>{t}</Tag>)}</div>
          <p className="mt-2 flex items-center gap-2">
            <span className="tabular text-xl">{featuredReport.signal}</span>
            <span className="font-mono text-[0.6rem] text-muted-foreground">/100 SIGNAL</span>
            <ChangeChip value={featuredReport.change} />
          </p>
        </div>
        <Button variant="ink" className="mx-2 rounded-full" asChild>
          <Link to="/reports/egcg">
            Read report <ArrowUpRight className="size-4 text-primary" />
          </Link>
        </Button>
      </section>

      <div className="mt-5 grid gap-5 lg:grid-cols-[240px_1fr]">
        <aside className="flex flex-col gap-5 self-start rounded-3xl bg-card p-4 shadow-soft">
          <label className="flex h-10 items-center gap-2 rounded-full border border-border bg-background px-3">
            <Search className="size-4 text-muted-foreground" />
            <span className="sr-only">Search reports</span>
            <input value={f.query} onChange={(e) => setF({ ...f, query: e.target.value })} placeholder="Search reports" className="h-full flex-1 bg-transparent text-sm outline-none" />
          </label>
          <FilterGroup icon={<FileText className="size-3.5" />} title="Report type">
            <ul className="flex flex-col gap-1.5 text-sm">
              {reportTypes.map((t) => (
                <li key={t}>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="size-3.5 accent-[var(--ink)]" checked={f.types.includes(t)} onChange={() => setF({ ...f, types: toggle<ReportType>(f.types, t) })} />
                    {t}
                  </label>
                </li>
              ))}
            </ul>
          </FilterGroup>
          <FilterGroup icon={<Droplet className="size-3.5" />} title="Filter by concern">
            <ChipSet options={reportConcerns} value={f.concerns} onToggle={(c) => setF({ ...f, concerns: toggle(f.concerns, c) })} />
          </FilterGroup>
          <FilterGroup icon={<FlaskConical className="size-3.5" />} title="Evidence level">
            <ChipSet options={["High", "Medium", "Emerging"]} value={f.evidence} onToggle={(c) => setF({ ...f, evidence: toggle(f.evidence, c as Evidence) })} />
          </FilterGroup>
          <FilterGroup icon={<Clock className="size-3.5" />} title="Status">
            <ChipSet options={["Published", "Coming soon"]} value={f.status} onToggle={(c) => setF({ ...f, status: toggle(f.status, c as ReportStatus) })} />
          </FilterGroup>
          {(f.types.length + f.concerns.length + f.evidence.length + f.status.length > 0 || f.query) && (
            <button type="button" onClick={() => setF({ query: "", types: [], concerns: [], evidence: [], status: [] })} className="inline-flex items-center justify-center gap-1.5 rounded-full bg-muted px-3 py-2 text-xs">
              <SlidersHorizontal className="size-3.5" /> Clear filters
            </button>
          )}
        </aside>

        <div>
          <div className="flex items-center justify-between">
            <p className="font-medium">{shown.length} reports</p>
            <Segmented label="Layout" options={["Grid", "List"] as const} value={view} onChange={setView} />
          </div>
          {shown.length === 0 && <p className="mt-3 rounded-3xl bg-card p-8 text-center text-sm text-muted-foreground">No reports match these filters.</p>}
          <ul className={cn("mt-3 gap-2", view === "List" ? "flex flex-col" : "grid sm:grid-cols-2 xl:grid-cols-3")}>
            {shown.map((r) => (
              <li
                key={r.title}
                className={cn(
                  "gap-3 rounded-2xl bg-card p-3 shadow-soft",
                  view === "List" ? "grid items-center sm:grid-cols-[56px_1.6fr_repeat(3,64px)_1fr_auto]" : "flex flex-col",
                  r.status === "Coming soon" && "opacity-80",
                )}
              >
                <div className="bg-ingredient grid size-14 place-items-center rounded-xl font-mono text-[0.55rem]">
                  <Formula value={r.title.slice(0, 4).toUpperCase()} />
                </div>
                <div>
                  <p className="font-medium">{r.title}</p>
                  <p className="text-xs text-muted-foreground">{r.summary}</p>
                  <div className="mt-1 flex flex-wrap gap-1">{r.types.map((t) => <Tag key={t} className="text-[0.65rem]">{t}</Tag>)}</div>
                </div>
                <Stat label="Signal" value={r.signal} />
                <Stat label="Readers" value={r.readers} />
                <Stat label="Products" value={r.products} />
                <p className="text-xs text-muted-foreground">{r.status === "Published" ? `Published ${r.date}` : `Coming ${r.date}`}</p>
                {r.to ? (
                  <Button variant="ink" size="sm" className="rounded-full" asChild>
                    <Link to={r.to}>
                      Open <ArrowUpRight className="size-3.5" />
                    </Link>
                  </Button>
                ) : (
                  <span className="rounded-full bg-muted px-3 py-1.5 text-center text-xs text-muted-foreground">Coming soon</span>
                )}
              </li>
            ))}
          </ul>

          <h2 className="mt-6 font-medium">How-to guides</h2>
          <ul className="mt-2 grid gap-2 sm:grid-cols-3">
            {howToGuides.map((g) =>
              g.to ? (
                <li key={g.title}>
                  <Link to={g.to} className="block rounded-2xl bg-accent p-4 hover:bg-blush">
                    <p className="eyebrow text-[0.55rem] text-primary">{g.kicker} ↗</p>
                    <p className="mt-1 font-medium">{g.title}</p>
                  </Link>
                </li>
              ) : (
                <li key={g.title} className="rounded-2xl bg-muted/60 p-4">
                  <p className="eyebrow text-[0.55rem] text-muted-foreground">{g.kicker} · coming soon</p>
                  <p className="mt-1 font-medium">{g.title}</p>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
    </main>
  );
}

function FilterGroup({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <fieldset className="flex flex-col items-center gap-2">
      <span className="grid size-7 place-items-center rounded-full bg-accent text-primary">{icon}</span>
      <legend className="sr-only">{title}</legend>
      <p className="eyebrow text-[0.6rem] text-muted-foreground">{title}</p>
      <div className="w-full">{children}</div>
    </fieldset>
  );
}

function ChipSet({ options, value, onToggle }: { options: string[]; value: string[]; onToggle: (v: string) => void }) {
  return (
    <div className="flex flex-wrap justify-center gap-1">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          aria-pressed={value.includes(o)}
          onClick={() => onToggle(o)}
          className={cn("rounded-full px-2.5 py-1 text-xs", value.includes(o) ? "bg-ink text-ink-foreground" : "bg-muted hover:bg-accent")}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function Stat({ label, value }: { label: string; value?: string | number }) {
  return (
    <div>
      <p className="eyebrow text-[0.55rem] text-muted-foreground">{label}</p>
      <p className="tabular text-sm">{value ?? "—"}</p>
    </div>
  );
}
