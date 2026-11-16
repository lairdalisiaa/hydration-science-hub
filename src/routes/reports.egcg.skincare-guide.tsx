import { createFileRoute } from "@tanstack/react-router";
import { EyeSerumGuide } from "@/components/reports/EyeSerumGuide";

export const Route = createFileRoute("/reports/egcg/skincare-guide")({
  head: () => ({ meta: [
    { title: "EGCG Skincare Guide — Addottee Report" },
    { name: "description", content: "Routine guide for The Ordinary Caffeine 5% + EGCG eye serum, with schedules, ingredients and sample skin diary." },
    { property: "og:title", content: "EGCG Skincare Guide — Addottee Report" },
    { property: "og:description", content: "The Ordinary Caffeine 5% + EGCG eye serum routine and ingredient guide." },
    { property: "og:type", content: "article" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: EyeSerumGuide,
});