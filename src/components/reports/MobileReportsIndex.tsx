import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, FileText, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MobileCard, MobileCarousel, MobileEyebrow } from "@/components/site/mobile";
import { featuredReport, filterReports, howToGuides, reports, reportTypes, type ReportType } from "@/lib/reports-data";
import { cn } from "@/lib/utils";
import moleculeImg from "@/assets/egcg-molecule.jpg";

const shortTypes: Record<ReportType, string> = {
  "Ingredient overview": "Overview", "Bioinformatics": "Bioinformatics", "Trend signal": "Trend",
  "Product analysis": "Product", "Skincare guide": "Skincare", "How-to guide": "How-to",
};

export function MobileReportsIndex() {
  const [query, setQuery] = useState("");
  const [types, setTypes] = useState<ReportType[]>([]);
  const [expanded, setExpanded] = useState(false);
  const shown = filterReports(reports, { query, types, concerns: [], evidence: [], status: [] });
  const published = reports.filter(report => report.status === "Published").length;
  return (
    <main className="flex flex-col gap-4 px-4 py-6 lg:hidden">
      <header><p className="eyebrow text-[10px] text-muted-foreground">Reports & guides · week 46</p><h1 className="mt-1.5 text-[32px] font-semibold leading-tight">Reports <span className="font-script text-[38px] font-normal text-crimson">& guides</span></h1></header>
      <Link to="/reports/egcg" aria-label="Read EGCG ingredient overview" className="block overflow-hidden rounded-3xl bg-card shadow-soft backdrop-blur-xl">
        <div className="relative"><img src={moleculeImg} alt="EGCG molecule" width={768} height={896} className="h-48 w-full object-cover sm:h-60" /><span className="absolute left-3.5 top-3.5 rounded-md bg-negative-soft px-2 py-1 font-mono text-[10px] text-negative">NEW · FEATURED</span></div>
        <div className="flex items-center justify-between gap-3 p-4"><div className="min-w-0"><h2 className="text-[22px] font-semibold leading-tight">EGCG <span className="font-script text-[26px] font-normal text-crimson">ingredient overview</span></h2><div className="mt-2 flex flex-wrap items-center gap-2"><span className="tabular font-semibold">{featuredReport.signal}</span><span className="font-mono text-[10px] text-muted-foreground">/100</span><span className="rounded-md bg-positive-soft px-2 py-1 text-xs font-semibold text-positive">▲ {featuredReport.change}%</span></div></div><span className="grid size-10 shrink-0 place-items-center rounded-full bg-ink text-ink-foreground"><ArrowUpRight className="size-4" /></span></div>
      </Link>
      <div className="grid grid-cols-2 items-stretch gap-3 [&>*]:min-w-0">
        <MobileCard className="flex min-h-44 flex-col bg-ingredient"><MobileEyebrow>Published</MobileEyebrow><div className="mt-auto pt-6"><p className="tabular text-[44px] font-semibold leading-none">{published}</p><p className="mt-1 text-xs text-muted-foreground">{published === 1 ? "report" : "reports"} this year</p></div></MobileCard>
        <MobileCard className="flex flex-col"><MobileEyebrow>Filter</MobileEyebrow><div className="mt-auto flex flex-wrap gap-1 pt-4">{(expanded ? reportTypes : reportTypes.slice(0, 3)).map(type => <Button key={type} size="sm" variant={types.includes(type) ? "ink" : "secondary"} aria-pressed={types.includes(type)} onClick={() => setTypes(current => current.includes(type) ? current.filter(value => value !== type) : [...current, type])} className="h-7 rounded-full px-2 text-[10px]">{shortTypes[type]}</Button>)}<Button size="sm" variant="ghost" className="h-7 rounded-full px-2 text-[10px]" aria-expanded={expanded} onClick={() => setExpanded(value => !value)}>{expanded ? "Less" : "+3"}</Button></div></MobileCard>
      </div>
      <div className="relative"><Search className="absolute left-3 top-3 size-4 text-muted-foreground" aria-hidden /><Input aria-label="Search reports" placeholder="Search reports" value={query} onChange={event => setQuery(event.target.value)} className="h-10 rounded-full bg-card pl-10" /></div>
      {(types.length > 0 || query) && <Button variant="ghost" size="sm" className="self-start rounded-full" onClick={() => { setQuery(""); setTypes([]); }}>Clear filters</Button>}
      <MobileCarousel title="All" script="reports" count={shown.length}>
        {shown.map(report => {
          const content = <><FileText className="size-6 text-muted-foreground" aria-hidden /><h3 className="mt-3 text-[15px] font-semibold leading-tight">{report.title}</h3>{report.status === "Published" ? <><p className="mt-1 text-xs leading-relaxed text-muted-foreground">{report.summary}</p><dl className="mt-auto grid grid-cols-3 gap-2 pt-4 text-xs">{[["Signal", report.signal], ["Readers", report.readers], ["Products", report.products]].map(([label, value]) => <div key={label}><dt className="font-mono text-[9px] text-muted-foreground">{label}</dt><dd className="tabular mt-1 font-semibold">{value}</dd></div>)}</dl><span className="mt-3 flex items-center justify-between text-xs font-semibold">Open report<ArrowUpRight className="size-4" /></span></> : <p className="mt-auto pt-4 text-xs text-muted-foreground">Coming soon</p>}</>;
          const className = cn("flex min-h-60 w-56 flex-col rounded-3xl bg-card p-4 shadow-soft backdrop-blur-xl", report.status === "Coming soon" && "opacity-80");
          return report.status === "Published" && report.to ? <Link key={report.title} to={report.to} className={className}>{content}</Link> : <div key={report.title} className={className}>{content}</div>;
        })}
      </MobileCarousel>
      {shown.length === 0 && <p role="status" className="text-sm text-muted-foreground">No reports match these filters.</p>}
      <MobileCarousel title="How-to" script="guides" count={howToGuides.length}>
        {howToGuides.map(guide => <MobileCard key={guide.title} className="flex min-h-44 w-44 flex-col"><MobileEyebrow>Guide</MobileEyebrow><h3 className="mt-auto pt-6 text-base font-semibold leading-tight">{guide.title}</h3><p className="mt-2 text-xs text-muted-foreground">Coming soon</p></MobileCard>)}
      </MobileCarousel>
    </main>
  );
}