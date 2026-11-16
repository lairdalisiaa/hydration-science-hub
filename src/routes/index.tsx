import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/dashboard/SiteHeader";
import { ExploreMarket } from "@/components/dashboard/ExploreMarket";
import { MiddleColumn } from "@/components/dashboard/MiddleColumn";
import { RightColumn } from "@/components/dashboard/RightColumn";
import { GoalsRail, ToolRail } from "@/components/dashboard/Rails";
import { TewlTrend } from "@/components/dashboard/TewlTrend";
import { SkinPerformance } from "@/components/dashboard/SkinPerformance";
import { Ticker } from "@/components/dashboard/Ticker";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Addottee — Hydration & skincare market dashboard" },
      { name: "description", content: "Live skincare signals: market hubs, top searches, TEWL hydration trends and skin performance scores." },
      { property: "og:title", content: "Addottee — Hydration & skincare market dashboard" },
      { property: "og:description", content: "Live skincare signals: market hubs, top searches, TEWL hydration trends and skin performance scores." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-muted/40 lg:p-6">
      <div className="mx-auto max-w-[1400px] overflow-hidden bg-background lg:rounded-3xl lg:shadow-soft">
        <SiteHeader />
        <main className="bg-page px-4 py-6 lg:px-8">
          <div className="grid gap-4 lg:grid-cols-[56px_1fr_1fr_1.3fr_76px]">
            <ToolRail />
            <ExploreMarket />
            <MiddleColumn />
            <RightColumn />
            <GoalsRail />
            <div className="hidden lg:block" />
            <div className="grid gap-4 lg:col-span-3 lg:grid-cols-3">
              <TewlTrend />
              <SkinPerformance />
            </div>
          </div>
        </main>
        <Ticker />
      </div>
    </div>
  );
}
