import { createFileRoute } from "@tanstack/react-router";
import { TrendSignal } from "@/components/theory/TrendSignal";
import { MobileTrendSignal } from "@/components/theory/MobileTheory";

export const Route = createFileRoute("/theory/trend-signal")({
  head: () => ({
    meta: [
      { title: "Ingredient Trend Signal — Addottee Theory" },
      { name: "description", content: "Search interest, category and market signals for Epigallocatechin gallate, with a 12-month forecast." },
      { property: "og:title", content: "Ingredient Trend Signal — Addottee Theory" },
      { property: "og:description", content: "Search interest, category and market signals for Epigallocatechin gallate, with a 12-month forecast." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (<><div className="hidden lg:block"><TrendSignal /></div><MobileTrendSignal /></>),
});
