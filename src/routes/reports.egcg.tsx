import { createFileRoute } from "@tanstack/react-router";
import { ReportShell } from "@/components/reports/ReportShell";
import { EgcgOverview } from "@/components/reports/EgcgOverview";

export const Route = createFileRoute("/reports/egcg")({
  head: () => ({
    meta: [
      { title: "EGCG Ingredient Overview — Addottee Report" },
      { name: "description", content: "Epigallocatechin gallate (EGCG): what it does for skin, typical use levels, search interest and trend signal." },
      { property: "og:title", content: "EGCG Ingredient Overview — Addottee Report" },
      { property: "og:description", content: "Epigallocatechin gallate (EGCG): what it does for skin, typical use levels, search interest and trend signal." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EgcgReportPage,
});

function EgcgReportPage() {
  return (
    <ReportShell>
      <EgcgOverview />
    </ReportShell>
  );
}
