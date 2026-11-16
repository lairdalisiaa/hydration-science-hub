import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { ExploreMarket } from "@/components/dashboard/ExploreMarket";
import { MiddleColumn } from "@/components/dashboard/MiddleColumn";
import { IngredientCard, SkinomicFocus } from "@/components/dashboard/RightColumn";
import { GoalsRail, ToolRail } from "@/components/dashboard/Rails";
import { TewlTrend } from "@/components/dashboard/TewlTrend";
import { SkinPerformance } from "@/components/dashboard/SkinPerformance";
import { Ticker } from "@/components/dashboard/Ticker";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Addottee — Hydration & skincare market dashboard" },
      { name: "description", content: "Live skincare signals: market hubs, top searches, oxidation and hydration science, and skin performance scores." },
      { property: "og:title", content: "Addottee — Hydration & skincare market dashboard" },
      { property: "og:description", content: "Live skincare signals: market hubs, top searches, oxidation and hydration science, and skin performance scores." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <PageShell footer={<Ticker />}>
      <main className="px-4 py-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-[56px_1fr_1fr_1.3fr_76px] lg:grid-rows-[auto_1fr]">
          <ToolRail className="lg:row-span-2" />
          <ExploreMarket className="lg:row-span-2" />
          <MiddleColumn className="lg:row-span-2" />
          <SkinomicFocus className="lg:col-start-4 lg:row-start-1" />
          <GoalsRail className="lg:col-start-5 lg:row-start-1" />
          <IngredientCard className="lg:col-span-2 lg:col-start-4 lg:row-start-2" />
          <SkinPerformance className="lg:col-span-4 lg:col-start-2" />
          <TewlTrend className="lg:col-span-4 lg:col-start-2" />
        </div>
      </main>
    </PageShell>
  );
}
