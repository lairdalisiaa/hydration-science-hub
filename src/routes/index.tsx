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
      <main className="px-4 py-6 lg:flex lg:gap-4 lg:px-8">
        <div aria-hidden className="hidden w-16 shrink-0 lg:block" />
        <ToolRail className="fixed left-[max(36px,calc((100vw-1400px)/2+12px))] top-1/2 z-20 hidden w-14 -translate-y-1/2 lg:flex" />
        <div className="min-w-0 flex-1">
        {/* Mobile: one column ordered by order-*. Desktop: three stacked columns sized to content. */}
        <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[1fr_1fr_1.4fr] lg:items-start">
          <div className="contents lg:flex lg:flex-col lg:gap-4">
            <ExploreMarket className="order-2 lg:order-none" />
            <PartnerCard className="order-3 lg:order-none" />
          </div>
          <div className="contents lg:flex lg:flex-col lg:gap-4">
            <LocationPill className="order-1 lg:order-none" />
            <FeaturedArticle className="order-5 lg:order-none" />
            <TopSearches className="order-4 lg:order-none" />
          </div>
          <div className="contents lg:flex lg:flex-col lg:gap-4">
            <div className="contents lg:flex lg:items-start lg:gap-4">
              <SkinomicFocus className="order-6 lg:order-none lg:flex-1" />
              <GoalsRail className="order-7 lg:order-none lg:shrink-0" />
            </div>
            <IngredientCard className="order-8 lg:order-none" />
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-4">
          <SkinPerformance className="lg:col-span-4" />
          <TewlTrend className="lg:col-span-4" />
        </div>
        </div>
      </main>
    </PageShell>
  );
}
