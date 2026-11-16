import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { IngredientLibrary } from "@/components/skincare/IngredientLibrary";

export const Route = createFileRoute("/skincare")({
  head: () => ({
    meta: [
      { title: "Skincare Ingredient Library — Addottee" },
      { name: "description", content: "Search 248 tracked skincare ingredients by what they do for skin, with trend scores, searches and product counts." },
      { property: "og:title", content: "Skincare Ingredient Library — Addottee" },
      { property: "og:description", content: "Search 248 tracked skincare ingredients by what they do for skin, with trend scores, searches and product counts." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SkincarePage,
});

function SkincarePage() {
  return (
    <PageShell>
      <IngredientLibrary />
    </PageShell>
  );
}
