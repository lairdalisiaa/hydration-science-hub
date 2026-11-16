import { createFileRoute } from "@tanstack/react-router";
import { EgcgOverview } from "@/components/reports/EgcgOverview";

export const Route = createFileRoute("/reports/egcg/")({
  head: () => ({ meta: [
    { title: "EGCG Ingredient Overview — Addottee Report" },
    { name: "description", content: "Epigallocatechin gallate overview, ingredient properties and The Ordinary Caffeine 5% + EGCG eye serum." },
    { property: "og:title", content: "EGCG Ingredient Overview — Addottee Report" },
    { property: "og:description", content: "Ingredient properties and The Ordinary Caffeine 5% + EGCG eye serum." },
    { property: "og:type", content: "article" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: EgcgOverview,
});