export type Concern = "Barrier care" | "Hydration" | "Brightening" | "Soothing" | "Firming" | "Clarifying" | "De-puffing";

export type LibraryIngredient = {
  name: string;
  inci: string;
  formula: string;
  /** 0–100 sample trend score; null when unavailable. */
  score: number | null;
  change: number | null;
  concerns: Concern[];
  searches: string;
  saves: string;
  products: number | null;
  comingSoon?: boolean;
  searchesAreSample?: boolean;
  isNew?: boolean;
  /** Internal page with the full report, when one exists. */
  report?: "/reports/egcg" | "/theory";
};

// EGCG is the only available ingredient; other names are upcoming entries.
export const libraryIngredients: LibraryIngredient[] = [
  { name: "Epigallocatechin Gallate", inci: "EGCG", formula: "C22H18O11", score: 78, change: 18.1, concerns: ["Soothing", "Brightening"], searches: "9.6K", searchesAreSample: true, saves: "0", products: 1, report: "/reports/egcg" },
  ...["Green Tea Extract", "PDRN", "Azelaic Acid", "Niacinamide", "Hyaluronic Acid", "Ceramides", "Centella Asiatica", "Retinol", "Tannin", "Theobromine & Theophylline", "Caffeine"].map((name): LibraryIngredient => ({
    name, inci: "Coming soon", formula: "Coming soon", score: null, change: null, concerns: [], searches: "Coming soon", saves: "Coming soon", products: null, comingSoon: true,
  })),
];

export const libraryTotals = {
  all: libraryIngredients.length,
  available: libraryIngredients.filter((i) => !i.comingSoon).length,
  ...Object.fromEntries((["Barrier care", "Hydration", "Brightening", "Soothing", "Firming", "Clarifying"] as const).map((concern) => [concern, libraryIngredients.filter((i) => i.concerns.includes(concern)).length])),
} as { all: number; available: number } & Record<Exclude<Concern, "De-puffing">, number>;

export type LibrarySort = "Trending" | "Most searched" | "A–Z";

const parseK = (v: string) => (Number.parseFloat(v) || 0) * (v.endsWith("K") ? 1000 : 1);

export function filterIngredients(list: LibraryIngredient[], query: string, concern: Concern | "All", sort: LibrarySort) {
  const q = query.trim().toLowerCase();
  const out = list.filter(
    (i) =>
      (concern === "All" || i.concerns.includes(concern)) &&
      (!q || [i.name, i.inci, ...i.concerns].some((s) => s.toLowerCase().includes(q))),
  );
  return out.sort((a, b) => {
    if (a.comingSoon !== b.comingSoon) return Number(Boolean(a.comingSoon)) - Number(Boolean(b.comingSoon));
    if (sort === "A–Z") return a.name.localeCompare(b.name);
    if (sort === "Most searched") return parseK(b.searches) - parseK(a.searches);
    return (b.score ?? -1) - (a.score ?? -1);
  });
}
