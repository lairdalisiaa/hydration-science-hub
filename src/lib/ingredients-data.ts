export type Concern = "Barrier care" | "Hydration" | "Brightening" | "Soothing" | "Firming" | "Clarifying" | "De-puffing";

export type LibraryIngredient = {
  name: string;
  inci: string;
  formula: string;
  /** 0–100 trend score; null for newly tracked ingredients. */
  score: number | null;
  change: number | null;
  concerns: Concern[];
  searches: string;
  saves: string;
  products: number;
  isNew?: boolean;
  /** Internal page with the full report, when one exists. */
  report?: "/reports/egcg" | "/theory";
};

/** Library totals across all 248 tracked ingredients. */
export const libraryTotals = { all: 248, "Barrier care": 41, Hydration: 37, Brightening: 52, Soothing: 33, Firming: 28, Clarifying: 29 } as const;

// First page of the ingredient library (sample data from the mockups).
export const libraryIngredients: LibraryIngredient[] = [
  { name: "Green Tea Extract", inci: "Camellia Sinensis Leaf Extract", formula: "C. sinensis", score: 72, change: 6.4, concerns: ["Soothing", "Barrier care"], searches: "18.4K", saves: "1.2K", products: 312 },
  { name: "Epigallocatechin Gallate", inci: "EGCG", formula: "C22H18O11", score: 78, change: 18.1, concerns: ["Soothing", "Brightening"], searches: "9.6K", saves: "840", products: 128, report: "/reports/egcg" },
  { name: "PDRN", inci: "Sodium DNA", formula: "DNA fragments", score: 84, change: 25.1, concerns: ["Hydration", "Firming"], searches: "22.1K", saves: "2.4K", products: 96 },
  { name: "Azelaic Acid", inci: "Azelaic Acid", formula: "C9H16O4", score: 66, change: 10.1, concerns: ["Brightening", "Clarifying"], searches: "11.2K", saves: "980", products: 74, report: "/theory" },
  { name: "Niacinamide", inci: "Niacinamide", formula: "C6H6N2O", score: 61, change: 5.2, concerns: ["Brightening", "Barrier care"], searches: "14.8K", saves: "1.6K", products: 486 },
  { name: "Hyaluronic Acid", inci: "Sodium Hyaluronate", formula: "(C14H21NO11)n", score: 58, change: 3.5, concerns: ["Hydration"], searches: "16.0K", saves: "1.9K", products: 612 },
  { name: "Ceramides", inci: "Ceramide NP", formula: "C36H73NO4", score: 55, change: 2.1, concerns: ["Barrier care"], searches: "8.3K", saves: "760", products: 274 },
  { name: "Centella Asiatica", inci: "Centella Asiatica Extract", formula: "C. asiatica", score: 52, change: 1.8, concerns: ["Soothing"], searches: "7.9K", saves: "690", products: 198 },
  { name: "Retinol", inci: "Retinol", formula: "C20H30O", score: 48, change: -3.6, concerns: ["Firming", "Clarifying"], searches: "19.5K", saves: "2.0K", products: 540 },
  { name: "Tannin", inci: "Tannic Acid", formula: "C76H52O46", score: null, change: null, concerns: ["Clarifying"], searches: "1.1K", saves: "90", products: 22, isNew: true },
  { name: "Theobromine & Theophylline", inci: "Theobromine · Theophylline", formula: "C7H8N4O2", score: null, change: null, concerns: ["Firming"], searches: "640", saves: "48", products: 14, isNew: true },
  { name: "Caffeine", inci: "Caffeine", formula: "C8H10N4O2", score: 57, change: 4.0, concerns: ["Firming", "De-puffing"], searches: "10.4K", saves: "910", products: 236 },
];

export type LibrarySort = "Trending" | "Most searched" | "A–Z";

const parseK = (v: string) => (v.endsWith("K") ? parseFloat(v) * 1000 : parseFloat(v));

export function filterIngredients(list: LibraryIngredient[], query: string, concern: Concern | "All", sort: LibrarySort) {
  const q = query.trim().toLowerCase();
  const out = list.filter(
    (i) =>
      (concern === "All" || i.concerns.includes(concern)) &&
      (!q || [i.name, i.inci, ...i.concerns].some((s) => s.toLowerCase().includes(q))),
  );
  return out.sort((a, b) => {
    if (sort === "A–Z") return a.name.localeCompare(b.name);
    if (sort === "Most searched") return parseK(b.searches) - parseK(a.searches);
    return (b.score ?? -1) - (a.score ?? -1);
  });
}
