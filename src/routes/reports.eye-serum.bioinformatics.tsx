import { createFileRoute } from "@tanstack/react-router";
import { ReportShell } from "@/components/reports/ReportShell";
import { EyeSerumBioinformatics } from "@/components/reports/EyeSerumBioinformatics";

export const Route = createFileRoute("/reports/eye-serum/bioinformatics")({
  head: () => ({
    meta: [
      { title: "Caffeine 5% + EGCG Eye Serum — Bioinformatics · Addottee" },
      { name: "description", content: "Product-level bioinformatics: EGCG vs its glucoside, all 26 ingredients grouped by role, target pathways and product signal." },
      { property: "og:title", content: "Caffeine 5% + EGCG Eye Serum — Bioinformatics · Addottee" },
      { property: "og:description", content: "Product-level bioinformatics: EGCG vs its glucoside, all 26 ingredients grouped by role, target pathways and product signal." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EyeSerumBioinformaticsPage,
});

function EyeSerumBioinformaticsPage() {
  return (
    <ReportShell>
      <EyeSerumBioinformatics />
    </ReportShell>
  );
}
