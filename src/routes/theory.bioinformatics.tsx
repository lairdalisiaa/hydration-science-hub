import { createFileRoute } from "@tanstack/react-router";
import { Bioinformatics } from "@/components/theory/Bioinformatics";
import { MobileBioinformatics } from "@/components/theory/MobileTheory";

export const Route = createFileRoute("/theory/bioinformatics")({
  head: () => ({
    meta: [
      { title: "Bioinformatics — Addottee Theory" },
      { name: "description", content: "Azelaic Acid at ingredient level: activity profile, in vitro assays, mechanisms of action, synergies and literature." },
      { property: "og:title", content: "Bioinformatics — Addottee Theory" },
      { property: "og:description", content: "Azelaic Acid at ingredient level: activity profile, in vitro assays, mechanisms of action, synergies and literature." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (<><div className="hidden lg:block"><Bioinformatics /></div><MobileBioinformatics /></>),
});
