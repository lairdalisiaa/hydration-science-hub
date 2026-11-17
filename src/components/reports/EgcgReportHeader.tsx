import { useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Formula, Tag } from "@/components/site/ui";
import { egcgOverview } from "@/lib/reports-data";

export function EgcgReportHeader() {
  const [saved, setSaved] = useState(false);
  return (
    <header className="mb-4 flex flex-wrap items-start justify-between gap-3 border-b border-border pb-4">
      <div className="flex items-center gap-3">
        <span className="hidden size-11 shrink-0 rounded-full bg-secondary lg:block" aria-hidden />
        <div>
          <h1 className="text-3xl font-medium"><span className="lg:hidden">Epigallocatechin <span className="font-script font-normal text-crimson">gallate</span></span><span className="hidden lg:inline">{egcgOverview.name}</span></h1>
          <p className="font-mono text-xs text-muted-foreground">{egcgOverview.code} · <Formula value={egcgOverview.formula} /></p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Tag tone="ink" className="py-1.5">Role: Active</Tag>
        <Tag className="py-1.5">Evidence: High (Human RCT)</Tag>
        <Button variant="outline" size="sm" className="rounded-full" aria-pressed={saved} onClick={() => setSaved((value) => !value)}>{saved ? "Saved ✓" : "Save report"}</Button>
        <Button variant="outline" size="sm" className="rounded-full" onClick={() => window.print()}>PDF <Download className="size-3.5" /></Button>
      </div>
    </header>
  );
}