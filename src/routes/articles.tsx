import { createFileRoute } from "@tanstack/react-router";
import { ArticlesIndex } from "@/components/article/ArticlesIndex";
import { PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/articles")({
  head: () => ({ meta: [
    { title: "Articles — Addottee Skincare Science" },
    { name: "description", content: "Explore Green Tea for Glass Skin and upcoming skincare articles on ingredients, trends, products and science." },
    { property: "og:title", content: "Articles — Addottee Skincare Science" },
    { property: "og:description", content: "Explore Green Tea for Glass Skin and upcoming skincare articles on ingredients, trends, products and science." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <PageShell><ArticlesIndex /></PageShell>,
});