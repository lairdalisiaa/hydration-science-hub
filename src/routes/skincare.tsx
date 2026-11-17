import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { MobileSkincare } from "@/components/skincare/MobileSkincare";
import { IngredientLibrary } from "@/components/skincare/IngredientLibrary";

export const Route = createFileRoute("/skincare")({
  head: () => ({
    meta: [
      { title: "Skincare Ingredient Library — Addottee" },
      { name: "description", content: "Explore Epigallocatechin gallate, its ingredient report and product count. More skincare ingredients coming soon." },
      { property: "og:title", content: "Skincare Ingredient Library — Addottee" },
      { property: "og:description", content: "Explore Epigallocatechin gallate, its ingredient report and product count. More skincare ingredients coming soon." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SkincarePage,
});

function SkincarePage() {
  return (
    <PageShell>
      <div className="hidden lg:block"><IngredientLibrary /></div>
      <MobileSkincare />
    </PageShell>
  );
}
