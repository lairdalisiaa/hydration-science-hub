import { createFileRoute } from "@tanstack/react-router";
import { CellSimulation } from "@/components/theory/CellSimulation";

export const Route = createFileRoute("/reports/egcg/cell-simulation")({
  head: () => ({ meta: [
    { title: "EGCG Cell Simulation — Addottee Report" },
    { name: "description", content: "EGCG sample delivery simulation, TEWL readings and molecular performance measurements." },
    { property: "og:title", content: "EGCG Cell Simulation — Addottee Report" },
    { property: "og:description", content: "EGCG sample delivery simulation, TEWL readings and molecular measurements." },
    { property: "og:type", content: "article" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: CellSimulation,
});