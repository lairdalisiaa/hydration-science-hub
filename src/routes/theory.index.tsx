import { createFileRoute } from "@tanstack/react-router";
import { CellSimulation } from "@/components/theory/CellSimulation";

export const Route = createFileRoute("/theory/")({
  head: () => ({
    meta: [
      { title: "Cell Simulation — Addottee Theory" },
      { name: "description", content: "See how deep Azelaic Acid travels into skin, its TEWL effect, ingredient profile and formulation signal." },
      { property: "og:title", content: "Cell Simulation — Addottee Theory" },
      { property: "og:description", content: "See how deep Azelaic Acid travels into skin, its TEWL effect, ingredient profile and formulation signal." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CellSimulation,
});
