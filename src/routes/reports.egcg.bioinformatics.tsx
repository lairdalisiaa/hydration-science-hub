import { createFileRoute } from "@tanstack/react-router";
import { EyeSerumBioinformatics } from "@/components/reports/EyeSerumBioinformatics";
import { MobileEyeSerumBioinformatics } from "@/components/reports/MobileEgcgReport";

export const Route = createFileRoute("/reports/egcg/bioinformatics")({
  head: () => ({ meta: [
    { title: "EGCG Product Bioinformatics — Addottee Report" },
    { name: "description", content: "EGCG and its glucoside derivative in The Ordinary Caffeine 5% + EGCG eye serum: ingredients and pathways." },
    { property: "og:title", content: "EGCG Product Bioinformatics — Addottee Report" },
    { property: "og:description", content: "The Ordinary Caffeine 5% + EGCG eye serum ingredient and pathway analysis." },
    { property: "og:type", content: "article" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => (<><div className="hidden lg:block"><EyeSerumBioinformatics /></div><MobileEyeSerumBioinformatics /></>),
});