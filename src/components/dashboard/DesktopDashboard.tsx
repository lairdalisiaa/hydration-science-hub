import { ExploreMarket, PartnerCard } from "./ExploreMarket";
import { FeaturedArticle, TopSearches } from "./MiddleColumn";
import { LocationPill } from "./LocationPill";
import { IngredientCard, SkinomicFocus } from "./RightColumn";
import { GoalsRail, ToolRail } from "./Rails";
import { TewlTrend } from "./TewlTrend";
import { SkinPerformance } from "./SkinPerformance";

export function DesktopDashboard() {
  return (
    <div className="hidden px-4 py-6 lg:flex lg:gap-4 lg:px-8">
      <div aria-hidden className="hidden w-16 shrink-0 lg:block" />
      <ToolRail className="fixed left-[max(36px,calc((100vw-1400px)/2+12px))] top-1/2 z-20 hidden w-14 -translate-y-1/2 lg:flex" />
      <div className="min-w-0 flex-1">
        <div className="grid grid-cols-[1fr_2.75fr] items-start gap-4">
          <div className="flex flex-col gap-4">
            <ExploreMarket />
            <PartnerCard />
          </div>
          <div className="grid grid-cols-[1fr_1.4fr] items-stretch gap-4">
            <div className="flex min-h-0 flex-col gap-4">
              <LocationPill />
              <FeaturedArticle className="flex-1" />
              <TopSearches />
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-4">
                <SkinomicFocus className="flex-1" />
                <GoalsRail className="mt-8 shrink-0" />
              </div>
              <IngredientCard className="flex-1" />
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-4">
          <SkinPerformance />
          <TewlTrend />
        </div>
      </div>
    </div>
  );
}