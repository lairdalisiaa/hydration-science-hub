import { createFileRoute } from "@tanstack/react-router";
import { CellSimulation } from "@/components/theory/CellSimulation";
import { MobileCellSimulation } from "@/components/theory/MobileTheory";

export const Route = createFileRoute("/theory/")({
  head: () => ({
    meta: [
      { title: "Cell Simulation — Addottee Theory" },
      { name: "description", content: "Explore Epigallocatechin gallate (EGCG), sample delivery and TEWL readings, molecular weight, pKa, solubility and log Kp." },
      { property: "og:title", content: "Cell Simulation — Addottee Theory" },
      { property: "og:description", content: "Explore Epigallocatechin gallate (EGCG), sample delivery and TEWL readings, molecular weight, pKa, solubility and log Kp." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (<><div className="hidden lg:block"><CellSimulation /></div><MobileCellSimulation /></>),
});
