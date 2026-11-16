import { createFileRoute } from "@tanstack/react-router";
import { TrendingProducts } from "@/components/theory/TrendingProducts";

export const Route = createFileRoute("/theory/trending-products")({
  head: () => ({
    meta: [
      { title: "Trending Products in New York — Addottee Theory" },
      { name: "description", content: "How Addottee finds trending skincare products, from 12,000 tracked down to this week's top five in New York." },
      { property: "og:title", content: "Trending Products in New York — Addottee Theory" },
      { property: "og:description", content: "How Addottee finds trending skincare products, from 12,000 tracked down to this week's top five in New York." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TrendingProducts,
});
