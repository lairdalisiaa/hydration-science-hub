import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { ReportsIndex } from "@/components/reports/ReportsIndex";

export const Route = createFileRoute("/reports/")({
  head: () => ({
    meta: [
      { title: "Reports & Guides — Addottee" },
      { name: "description", content: "Ingredient reports, product analysis and how-to skincare guides, updated every week." },
      { property: "og:title", content: "Reports & Guides — Addottee" },
      { property: "og:description", content: "Ingredient reports, product analysis and how-to skincare guides, updated every week." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReportsPage,
});

function ReportsPage() {
  return (
    <PageShell>
      <ReportsIndex />
    </PageShell>
  );
}
