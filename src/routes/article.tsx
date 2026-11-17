import { createFileRoute } from "@tanstack/react-router";
import { ArticlePage } from "@/components/article/ArticlePage";
import { MobileArticle } from "@/components/article/MobileArticle";
import { PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/article")({
  head: () => ({
    meta: [
      { title: "Green Tea for Glass Skin — Addottee" },
      { name: "description", content: "Why green tea and its antioxidant EGCG are part of the shift from instant glow to hydrated, resilient glass skin." },
      { property: "og:title", content: "Green Tea for Glass Skin — Addottee" },
      { property: "og:description", content: "Why green tea and its antioxidant EGCG are part of the shift from instant glow to hydrated, resilient glass skin." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <PageShell>
      <div className="hidden lg:block"><ArticlePage /></div>
      <MobileArticle />
    </PageShell>
  ),
});
