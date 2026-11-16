import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { ExploreMarket, PartnerCard } from "@/components/dashboard/ExploreMarket";
import { FeaturedArticle, TopSearches } from "@/components/dashboard/MiddleColumn";
import { LocationPill } from "@/components/dashboard/LocationPill";
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
        <ToolRail className="mb-4 hidden lg:flex" />
        {/* DOM order = mobile order; desktop placement is explicit. */}
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr_1.3fr_76px] lg:grid-rows-[auto_1fr_auto]">
          <LocationPill className="lg:col-start-2 lg:row-start-1" />
          <ExploreMarket className="lg:col-start-1 lg:row-span-2 lg:row-start-1" />
          <PartnerCard className="lg:col-start-1 lg:row-start-3" />
          <TopSearches className="lg:col-start-2 lg:row-start-3" />
          <FeaturedArticle className="lg:col-start-2 lg:row-start-2" />
          <SkinomicFocus className="lg:col-start-3 lg:row-span-2 lg:row-start-1" />
          <GoalsRail className="lg:col-start-4 lg:row-span-2 lg:row-start-1" />
          <IngredientCard className="lg:col-span-2 lg:col-start-3 lg:row-start-3" />
          <SkinPerformance className="lg:col-span-4" />
          <TewlTrend className="lg:col-span-4" />
        </div>
      </main>
    </PageShell>
  );
}
