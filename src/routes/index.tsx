import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { DesktopDashboard } from "@/components/dashboard/DesktopDashboard";
import { MobileDashboard } from "@/components/dashboard/MobileDashboard";
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
      <main className="pb-14">
        <DesktopDashboard />
        <MobileDashboard />
      <main>
    </PageShell>
  );
}
