import { createFileRoute } from "@tanstack/react-router";
import { TrendSignal } from "@/components/theory/TrendSignal";
import { MobileTrendSignal } from "@/components/theory/MobileTheory";

export const Route = createFileRoute("/reports/egcg/trend-signal")({
  head: () => ({ meta: [
    { title: "EGCG Trend Signal — Addottee Report" },
    { name: "description", content: "EGCG search interest, market signals and sample forecasts across weekly, monthly and yearly views." },
    { property: "og:title", content: "EGCG Trend Signal — Addottee Report" },
    { property: "og:description", content: "EGCG search interest, market signals and sample forecasts." },
    { property: "og:type", content: "article" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => (<><div className="hidden lg:block"><TrendSignal /></div><MobileTrendSignal /></>),
});