export type ReportType = "Ingredient overview" | "Bioinformatics" | "Trend signal" | "Product analysis" | "Skincare guide" | "How-to guide";
export type Evidence = "High" | "Medium" | "Emerging";
export type ReportStatus = "Published" | "Coming soon";

export type ReportEntry = {
  title: string;
  summary: string;
  types: ReportType[];
  concerns: string[];
  evidence: Evidence;
  status: ReportStatus;
  date?: string;
  signal?: number;
  readers?: string;
  products?: number;
  to?: "/reports/egcg" | "/reports/eye-serum" | "/reports/eye-serum/bioinformatics" | "/theory" | "/theory/trend-signal";
};

export const reportTypes: ReportType[] = ["Ingredient overview", "Bioinformatics", "Trend signal", "Product analysis", "Skincare guide", "How-to guide"];
export const reportConcerns = ["Barrier care", "Hydration", "Brightening", "Soothing", "Firming", "Clarifying"];

export const featuredReport = { title: "EGCG Ingredient Overview", published: "16 Nov 2026", tags: ["Ingredient overview", "Bioinformatics", "Trend signal"], signal: 78, change: 18.1 };

// Sample report index (Week 46).
export const reports: ReportEntry[] = [
  { title: "Epigallocatechin Gallate", summary: "Green-tea catechin for antioxidant and soothing care", types: ["Ingredient overview", "Bioinformatics", "Trend signal"], concerns: ["Soothing", "Brightening"], evidence: "High", status: "Published", date: "16 Nov 2026", signal: 78, readers: "1.2K", products: 128, to: "/reports/egcg" },
  { title: "PDRN", summary: "", types: ["Trend signal"], concerns: ["Hydration", "Firming"], evidence: "Medium", status: "Coming soon" },
  { title: "Azelaic Acid", summary: "", types: ["Ingredient overview", "Trend signal"], concerns: ["Brightening", "Clarifying"], evidence: "High", status: "Coming soon" },
  { title: "Caffeine 5% + EGCG Eye Serum", summary: "", types: ["Skincare guide", "Product analysis", "Bioinformatics"], concerns: ["Firming", "Soothing"], evidence: "Medium", status: "Coming soon" },
  { title: "Tannin", summary: "", types: ["Ingredient overview"], concerns: ["Clarifying"], evidence: "Emerging", status: "Coming soon" },
  { title: "Theobromine & Theophylline", summary: "", types: ["Ingredient overview"], concerns: ["Firming"], evidence: "Emerging", status: "Coming soon" },
];

export const howToGuides: { kicker: string; title: string; to?: "/reports/eye-serum" }[] = [
  { kicker: "Guide", title: "Building an AM routine" },
  { kicker: "Guide · Skincare guide report", title: "Your eye cream routine" },
  { kicker: "Guide", title: "Reading an ingredient list" },
];

export type ReportFilters = { query: string; types: ReportType[]; concerns: string[]; evidence: Evidence[]; status: ReportStatus[] };

export function filterReports(list: ReportEntry[], f: ReportFilters) {
  const q = f.query.trim().toLowerCase();
  return list.filter(
    (r) =>
      (!q || `${r.title} ${r.summary}`.toLowerCase().includes(q)) &&
      (f.types.length === 0 || r.types.some((t) => f.types.includes(t))) &&
      (f.concerns.length === 0 || r.concerns.some((c) => f.concerns.includes(c))) &&
      (f.evidence.length === 0 || f.evidence.includes(r.evidence)) &&
      (f.status.length === 0 || f.status.includes(r.status)),
  );
}

// ——— Caffeine 5% + EGCG Eye Serum (report detail) ———

export const marketStrip = [
  { label: "Top search", value: "CeraVe", extra: "+8.4%" },
  { label: "Skinomic peak", value: "96", extra: "pts · Acne" },
  { label: "Fastest rising", value: "Rhode", extra: "+16.2%" },
  { label: "Global hubs", value: "7", extra: "tracked" },
  { label: "Hydration", value: "62", extra: "%" },
  { label: "Oil", value: "38", extra: "%" },
];

export const eyeSerum = {
  name: "Caffeine 5% + EGCG Eye Serum",
  brand: "The Ordinary",
  country: "Canada",
  category: "Serum",
  kicker: "Eye cream · Serum · 26 ingredients",
  tags: ["Caffeine 5%", "EGCG glucoside", "Hyaluronic acid"],
  use: "AM & PM",
  left: 22,
  opened: "Sep 3, 2026",
  pao: "6 months · expires Mar 2027",
  dayOf: { day: 73, total: 180 },
};

export const scheduleCategories = ["Cleanser", "Serum", "Eye cream", "Moisturizer", "SPF", "Exfoliant", "Treatment"];

export const morningRoutine = [
  { name: "Soothing Oat Cleanser", kind: "Cleanser" },
  { name: "Niacinamide Serum", kind: "Serum" },
  { name: "Caffeine + EGCG Eye Serum", kind: "Eye cream", current: true },
  { name: "Barrier Moisturizer", kind: "Moisturizer" },
  { name: "Superscreen SPF 40", kind: "SPF" },
];

export const nightRoutine = [
  { name: "Soothing Oat Cleanser", kind: "Cleanser" },
  { name: "Caffeine + EGCG Eye Serum", kind: "Eye cream", current: true },
  { name: "Retinal 0.05%", kind: "Treatment", note: "not around the eyes" },
  { name: "Barrier Moisturizer", kind: "Moisturizer" },
];

export type IngredientGroup =
  | "Solvent"
  | "Actives"
  | "Antioxidants & supporting"
  | "Humectants & hydration"
  | "Texture & film-formers"
  | "Delivery & solvents"
  | "Acids & pH"
  | "Chelator"
  | "Preservative system";

export const inci: { n: number; name: string; group: IngredientGroup }[] = [
  { n: 1, name: "Aqua/Water/Eau", group: "Solvent" },
  { n: 2, name: "Caffeine", group: "Actives" },
  { n: 3, name: "Maltodextrin", group: "Texture & film-formers" },
  { n: 4, name: "Glycerin", group: "Humectants & hydration" },
  { n: 5, name: "Propanediol", group: "Humectants & hydration" },
  { n: 6, name: "Epigallocatechin Gallatyl Glucoside", group: "Actives" },
  { n: 7, name: "Gallyl Glucoside", group: "Actives" },
  { n: 8, name: "Hyaluronic Acid", group: "Humectants & hydration" },
  { n: 9, name: "Oxidized Glutathione", group: "Antioxidants & supporting" },
  { n: 10, name: "Melanin", group: "Antioxidants & supporting" },
  { n: 11, name: "Glycine Soja (Soybean) Seed Extract", group: "Antioxidants & supporting" },
  { n: 12, name: "Hydroxyethylcellulose", group: "Texture & film-formers" },
  { n: 13, name: "Polyacrylate Crosspolymer-6", group: "Texture & film-formers" },
  { n: 14, name: "Xanthan Gum", group: "Texture & film-formers" },
  { n: 15, name: "Propyl Gallate", group: "Antioxidants & supporting" },
  { n: 16, name: "Trisodium Ethylenediamine Disuccinate", group: "Chelator" },
  { n: 17, name: "Pentylene Glycol", group: "Humectants & hydration" },
  { n: 18, name: "Dimethyl Isosorbide", group: "Delivery & solvents" },
  { n: 19, name: "Lactic Acid", group: "Acids & pH" },
  { n: 20, name: "Salicylic Acid", group: "Acids & pH" },
  { n: 21, name: "Dehydroacetic Acid", group: "Preservative system" },
  { n: 22, name: "Benzyl Alcohol", group: "Preservative system" },
  { n: 23, name: "1,2-Hexanediol", group: "Preservative system" },
  { n: 24, name: "Ethylhexylglycerin", group: "Preservative system" },
  { n: 25, name: "Phenoxyethanol", group: "Preservative system" },
  { n: 26, name: "Caprylyl Glycol", group: "Preservative system" },
];

export const groupOrder: IngredientGroup[] = [
  "Solvent",
  "Actives",
  "Antioxidants & supporting",
  "Humectants & hydration",
  "Texture & film-formers",
  "Delivery & solvents",
  "Acids & pH",
  "Chelator",
  "Preservative system",
];

export const keyActives = [
  { n: 2, name: "Caffeine", role: "De-puffing" },
  { n: 6, name: "EGCG glucoside", role: "Antioxidant" },
  { n: 8, name: "Hyaluronic acid", role: "Hydration" },
];

export const interactions = [
  { name: "Retinol", note: "Keep retinal off the eye area", verdict: "Space apart", ok: false },
  { name: "Vitamin C serum", note: "No conflict in the same routine", verdict: "Fine together", ok: true },
  { name: "Niacinamide", note: "No conflict in the same routine", verdict: "Fine together", ok: true },
];

export const otherEyeCreams = [
  { name: "Peptide Eye Cream", price: "$32", score: 71 },
  { name: "Retinal Eye Balm", price: "$46", score: 64 },
  { name: "Vitamin C Eye Gel", price: "$28", score: 58 },
];

export const diary = [
  { label: "Puffiness", now: 2, last: 3 },
  { label: "Dark circles", now: 3, last: 3 },
  { label: "Fine lines", now: 2, last: 2 },
  { label: "Hydration", now: 4, last: 3 },
];

export const pathways = [
  { name: "Microcirculation / de-puffing", level: "High", ingredients: ["Caffeine"] },
  { name: "Antioxidant defence", level: "High", ingredients: ["EGCG glucoside", "Gallyl Glucoside", "Oxidized Glutathione", "Propyl Gallate"] },
  { name: "Hydration & barrier", level: "Medium", ingredients: ["Glycerin", "Hyaluronic Acid", "Propanediol"] },
  { name: "Tone & dark circles", level: "Medium", ingredients: ["Melanin", "Soybean Seed Extract"] },
  { name: "Soothing", level: "Low", ingredients: ["EGCG glucoside"] },
] as const;

export const bioderivative = {
  left: { name: "EGCG", sub: "Epigallocatechin gallate, green tea catechin" },
  right: { name: "Epigallocatechin Gallatyl Glucoside", sub: "The glucoside form used in this product" },
  rows: [
    { label: "Form", left: "Free catechin", right: "Glucoside derivative", winner: "right" },
    { label: "Water solubility", left: "Low", right: "High", winner: "right" },
    { label: "Stability in formula", left: "Oxidises readily", right: "More stable", winner: "right" },
    { label: "Oxidation / browning", left: "Prone to browning", right: "Resists browning", winner: "right" },
    { label: "How it reaches skin", left: "Active as applied", right: "Released by skin enzymes", winner: "left" },
    { label: "Typical use level", left: "0.10–2.00%", right: "0.5–2.0%", winner: "left" },
  ] as const,
};

export const productAnalysis = [
  ["Format", "Serum"],
  ["Key actives", "Caffeine 5% · EGCG glucoside"],
  ["Preservative system", "Dehydroacetic acid, benzyl alcohol, phenoxyethanol + glycols"],
  ["Exfoliating acids", "Low level: lactic, salicylic"],
  ["Best for", "Puffiness · dark circles"],
] as const;

export const productSignal = [
  { label: "Trend", value: "+22%", status: "Rising", positive: true },
  { label: "Brand ingredient", value: "EGCG", status: "Rising interest" },
  { label: "Category", value: "Eye serum", status: "Growing" },
  { label: "Market", value: "Global", status: "Active" },
];

// ——— EGCG ingredient overview ———

export const egcgOverview = {
  name: "Epigallocatechin Gallate",
  code: "EGCG",
  formula: "C22H18O11",
  overview:
    "EGCG is the most abundant catechin in green tea. In skincare it is used for its antioxidant and soothing properties, making it a common pick for redness-prone and oily skin and a frequent partner to hydrating routines.",
  facts: [
    { label: "Ingredient class", value: "Catechin (Polyphenol)" },
    { label: "Primary benefit", value: "Antioxidant · Soothing" },
    { label: "Skin compatibility", value: "All Skin Types" },
    { label: "Typical concentration", value: "0.10% – 2.00%" },
    { label: "Time to results", value: "4 – 8 Weeks" },
    { label: "Research signal", value: "Documented" },
  ],
  searchInterest: [
    { m: "Dec", v: 34 },
    { m: "Jan", v: 32 },
    { m: "Feb", v: 36 },
    { m: "Mar", v: 35 },
    { m: "Apr", v: 38 },
    { m: "May", v: 37 },
    { m: "Jun", v: 41 },
    { m: "Jul", v: 47 },
    { m: "Aug", v: 53 },
    { m: "Sep", v: 60 },
    { m: "Oct", v: 67 },
    { m: "Nov", v: 78 },
  ],
  trendSignal: { total: 78, parts: [{ label: "Search", value: 86 }, { label: "Social", value: 74 }, { label: "Launches", value: 68 }, { label: "Market", value: 81 }] },
  trendingProducts: 128,
  milestones: {
    "2026": [
      { date: "Feb 2026", text: "First serum launch tracked" },
      { date: "May 2026", text: "Search interest passes 50 pts" },
      { date: "Aug 2026", text: "Expansion into Seoul and Tokyo retail" },
      { date: "Nov 2026 · Now", text: "128 trending products feature it", now: true },
    ],
    "2025": [],
    "2024": [],
  } as Record<"2024" | "2025" | "2026", { date: string; text: string; now?: boolean }[]>,
};
