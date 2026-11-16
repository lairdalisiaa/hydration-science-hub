import { createFileRoute } from "@tanstack/react-router";
import { ReportShell } from "@/components/reports/ReportShell";
import { EyeSerumGuide } from "@/components/reports/EyeSerumGuide";

export const Route = createFileRoute("/reports/eye-serum/")({
  head: () => ({
    meta: [
      { title: "Caffeine 5% + EGCG Eye Serum — Skincare Guide · Addottee" },
      { name: "description", content: "Your eye serum routine: AM and PM schedule, full ingredient list, interactions, skin diary and TEWL score." },
      { property: "og:title", content: "Caffeine 5% + EGCG Eye Serum — Skincare Guide · Addottee" },
      { property: "og:description", content: "Your eye serum routine: AM and PM schedule, full ingredient list, interactions, skin diary and TEWL score." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EyeSerumGuidePage,
});

function EyeSerumGuidePage() {
  return (
    <ReportShell>
      <EyeSerumGuide />
    </ReportShell>
  );
}
