import { createFileRoute } from "@tanstack/react-router";
import { ArticlesIndex } from "@/components/article/ArticlesIndex";
import { PageShell } from "@/components/site/PageShell";
import mapBackground from "@/assets/articles-map.webp.asset.json";

export const Route = createFileRoute("/articles")({
  head: () => ({ meta: [
    { title: "Articles — Addottee Skincare Science" },
    { name: "description", content: "Explore Green Tea for Glass Skin and upcoming skincare articles on ingredients, trends, products and science." },
    { property: "og:title", content: "Articles — Addottee Skincare Science" },
    { property: "og:description", content: "Explore Green Tea for Glass Skin and upcoming skincare articles on ingredients, trends, products and science." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => (
    <PageShell className="relative isolate bg-none">
      <img src={mapBackground.url} alt="" aria-hidden className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover object-center" />
      <ArticlesIndex />
    </PageShell>
  ),
});