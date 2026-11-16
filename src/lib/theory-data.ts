// Theory pages: sample data for Azelaic Acid, taken from the mockups.

export const theoryIntro =
  "What people buy and what people talk about are rarely the same products. Our theory measures the gap between the two, then uses formulation chemistry and bioinformatics to explain why one product earns the sale while another only earns the conversation.";

export const keyTakeaway = {
  ingredient: "Azelaic Acid",
  formula: "C9H16O4",
  text: "Strong signals across brightening, barrier support and oil control make it a candidate for market confirmation.",
};

export const skinLayers = [
  { name: "Acid mantle", detail: "pH 4.5–5.5" },
  { name: "Stratum corneum", detail: "10–20 µm" },
  { name: "Living epidermis", detail: "50–100 µm" },
  { name: "Basal layer", detail: "cell renewal" },
];

/** How deep each product format carries the ingredient, and the TEWL reading it leaves. */
export const deliveryModes = {
  "Leave-on serum": { layer: 2, label: "Reaches the living epidermis", tewl: 9.4 },
  Cleanser: { layer: 1, label: "Rinsed off at the stratum corneum", tewl: 12.6 },
} as const;
export type DeliveryMode = keyof typeof deliveryModes;

export const profileCards = [
  {
    title: "Ingredient Profile",
    rows: [
      { label: "Toxicology", value: "Low irritation potential", info: "How likely the ingredient is to irritate skin at normal use levels." },
      { label: "Genotoxicity", value: "Ames test: negative", info: "Lab screen for whether an ingredient damages DNA. Negative is what you want." },
      { label: "Permeability", value: "Size efficiency: moderate", info: "How easily the molecule passes through the outer skin layer, based on its size." },
      { label: "TEWL", value: "5–15 g/m²/h in healthy skin, lower is better", info: "Trans-epidermal water loss: how much water escapes through the skin each hour." },
    ],
  },
  {
    title: "Product Overview",
    rows: [
      { label: "pH", value: "Formula pH 4–6", info: "The acidity range the formula needs to keep the ingredient stable and active." },
      { label: "Chemical class", value: "Dicarboxylic acid", info: "A small acid with two carboxyl groups, one at each end of the molecule." },
      { label: "Melting point", value: "~106 °C", info: "Temperature at which the solid ingredient melts; matters for manufacturing." },
      { label: "Solubility & boiling point", value: "Low water solubility; needs a suitable base", info: "Poorly soluble in water, so formulators dissolve it in glycols or use it as a suspension." },
    ],
  },
  {
    title: "Formulation Signal",
    rows: [
      { label: "Safety concentration", value: "Low irritation up to 10%", info: "The highest level shown to stay comfortable on most skin." },
      { label: "Receptor & enzyme efficiency", value: "IC50 12.4 µM · Ki 8.1 µM", info: "How little ingredient is needed to block its target enzyme. Lower numbers mean more potent." },
      { label: "Vehicle-enhanced flux & log Kp", value: "log Kp −2.9 cm/h", info: "How quickly the ingredient moves into skin from the formula base." },
    ],
    note: "Safety, efficacy and stability together show whether a trend can become a real formula.",
  },
];

export const targetMechanisms = [
  { layer: "Living epidermis", target: "Cell proliferation & differentiation" },
  { layer: "Outer layer", target: "Stratum corneum" },
  { layer: "Surface · pH 4.5–5.5", target: "Acid mantle" },
];

export const performanceSignal = [
  { label: "pKa", value: 92 },
  { label: "pH", value: 84 },
  { label: "Differentiation", value: 76 },
];

export const skinCompatibility = [
  { label: "Acne", value: 96 },
  { label: "Dark spots", value: 86 },
  { label: "Redness", value: 71 },
];

export const compatibilityRings = [
  { label: "Brightening", value: 82 },
  { label: "Barrier", value: 76 },
  { label: "Oil control", value: 71 },
  { label: "Soothing", value: 64 },
];

// Tab 02 — Ingredient Trend Signal
export const trendStats = [
  { eyebrow: "Rising trend", value: "+29%", note: "vs last 6 months", positive: true },
  { eyebrow: "Top market", value: "Global", note: "Active interest across all 7 hubs" },
  { eyebrow: "Most common format", value: "Serum", note: "Serum products featuring Azelaic Acid are growing" },
  { eyebrow: "12-month forecast", value: "+18%", note: "Gaining market attention" },
];

export type TrendRange = "12 months" | "30 days" | "7 days";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const monthValues = [38, 39, 41, 41, 44, 47, 49, 52, 55, 59, 63, 67];

/** Search-interest index; points after "now" are forecast. Sample data. */
export const trendSeries: Record<TrendRange, { label: string; actual?: number; forecast?: number }[]> = {
  "12 months": months.map((m, i) => ({
    label: m,
    actual: i <= 10 ? monthValues[i] : undefined,
    forecast: i >= 10 ? monthValues[i] : undefined,
  })),
  "30 days": Array.from({ length: 30 }, (_, i) => {
    const v = Math.round((55 + i * 0.28 + Math.sin(i / 2.3) * 1.6) * 10) / 10;
    return { label: `${i + 1}`, actual: i <= 26 ? v : undefined, forecast: i >= 26 ? v : undefined };
  }),
  "7 days": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => {
    const v = [61.2, 61.8, 62.1, 61.9, 62.6, 63.0, 63.4][i]!;
    return { label: d, actual: i <= 5 ? v : undefined, forecast: i >= 5 ? v : undefined };
  }),
};

export const trendNow: Record<TrendRange, string> = { "12 months": "Nov", "30 days": "27", "7 days": "Sat" };

export const signalCards = [
  {
    title: "Ingredient Interest",
    note: "Interest is high and still climbing.",
    rows: [
      ["Interest level", "High"],
      ["Growth · 6 months", "+29%"],
      ["Momentum", "Rising"],
    ],
  },
  {
    title: "Category Signal",
    note: "Serums lead every other format for this ingredient.",
    rows: [
      ["Category", "Serum"],
      ["Category rank", "#1"],
      ["Growth · 6 months", "+22%"],
      ["Trend level", "Strong"],
    ],
  },
  {
    title: "Market Signal",
    note: "Active in all 7 hubs, strongest in Asia Pacific.",
    rows: [
      ["Market coverage", "Global"],
      ["Activity", "Active"],
      ["Top region", "Asia Pacific"],
    ],
  },
] as const;

export const signalScore = {
  total: 66,
  parts: [
    { label: "Search", value: 72 },
    { label: "Social", value: 60 },
    { label: "Launches", value: 58 },
    { label: "Market", value: 70 },
  ],
};

// Tab 03 — Bioinformatics
export const activityProfile = [
  { label: "LLE > 5", value: 86, level: "High" },
  { label: "cLogP < 3", value: 80, level: "High" },
  { label: "Activation window & unionised state 34–66", value: 55, level: "Medium" },
  { label: "Receptor efficacy 34–66", value: 50, level: "Medium" },
  { label: "Live TEWL 0–11", value: 15, level: "Low" },
] as const;

export const invitroAssays = [
  ["IC50", "12.4 µM"],
  ["Metabolic stability (half-life)", "48 min"],
  ["Tyrosinase inhibition", "62%"],
  ["Cell viability CC50", ">200 µM"],
  ["Antioxidant capacity (DPPH)", "41%"],
] as const;

export const mechanisms = [
  { name: "NHE1", code: "SLC9A1", note: "Proposed route to brightening", outcome: "Brightening" },
  { name: "Keratinization", code: "GO:0031424 · KRT1, KRT10, FLG", note: "Normalises how surface cells mature", outcome: "Clearer pores" },
  { name: "VEGFA", code: "Vascular signalling", note: "Linked to visible redness", outcome: "Less redness" },
  { name: "MMPs", code: "MMP1, MMP2, MMP9", note: "Enzymes that break down collagen", outcome: "Firmer skin" },
  { name: "Tyrosinase", code: "TYR", note: "Pigment and tone", outcome: "Brightening" },
];

export const synergies = [
  { pair: "Azelaic Acid + Niacinamide", note: "Complementary routes to even tone; well tolerated together.", level: "High" },
  { pair: "Azelaic Acid + Hyaluronic Acid", note: "Offsets the dryness an acid can bring.", level: "High" },
  { pair: "Azelaic Acid + Retinol", note: "Both support cell turnover; alternate nights.", level: "Medium" },
  { pair: "Azelaic Acid + Vitamin C", note: "Shared brightening target; watch total acidity.", level: "Medium" },
] as const;

export const literature = [
  { kind: "Clinical", count: 24, note: "Human trials on tone and blemishes" },
  { kind: "In vivo", count: 18, note: "Skin measurements after topical use" },
  { kind: "In vitro", count: 41, note: "Enzyme and cell assays" },
  { kind: "In silico", count: 9, note: "Docking and pathway models" },
];

// Tab 04 — Trending Products
export const funnel = [
  { n: "01", title: "Signals scanned", note: "Search, social, launches", value: "12,000", unit: "products tracked", fill: 100 },
  { n: "02", title: "Ingredient trend signal", note: "Rising demand", value: "180", unit: "ingredients rising", fill: 62 },
  { n: "03", title: "Science check", note: "Cell Simulation + Bioinformatics", value: "46", unit: "with lab evidence", fill: 40 },
  { n: "04", title: "Market confirmation", note: "Category and region", value: "12", unit: "confirmed", fill: 24 },
  { n: "05", title: "Product match", note: "Ranked by units and change", value: "5", unit: "shown below", fill: 12 },
];

export const scanner = {
  code: "AZELAIC.SYS",
  name: "Azelaic acid",
  formula: "C9H16O4",
  structure: "HOOC-(CH2)7-COOH",
  rings: [
    { label: "pKa", value: "4.55", fill: 65 },
    { label: "LogP", value: "1.57", fill: 45 },
    { label: "MW", value: "188.2", fill: 80 },
  ],
  chiral: "None",
  class: "Dicarboxylic acid",
  redox: [34, 52, 46, 70, 64, 88, 66, 42],
  atoms: [
    ["C", 9],
    ["H", 16],
    ["O", 4],
  ] as const,
};
