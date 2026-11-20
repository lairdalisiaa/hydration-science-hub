import { topSearches, skinomicFocus } from "./dashboard-data";

type TopSearch = (typeof topSearches)[number];
type Focus = (typeof skinomicFocus)[number];

// SAMPLE DATA: replace with real numbers. Add one entry per hub:
// Madrid, Frankfurt, Paris, Hong Kong, Korea, Tokyo.
export const cityTopSearches: Record<string, TopSearch[]> = {
  Madrid: [
    { brand: "Isdin", product: "Fusion Water SPF 50", change: 9.1 },
    { brand: "Sesderma", product: "C-Vit Serum", change: 6.3 },
    { brand: "Cantabria Labs", product: "Heliocare 360", change: -2.4 },
  ],
  Paris: [
    { brand: "Caudalie", product: "Vinoperfect Serum", change: 7.7 },
    { brand: "Bioderma", product: "Sensibio H2O", change: 4.2 },
    { brand: "Nuxe", product: "Huile Prodigieuse", change: -1.9 },
  ],
};

export const cityFocus: Record<string, Focus[]> = {
  Madrid: [
    { concern: "Sun care", score: 94, query: "spf 50 face fluid" },
    { concern: "Dark Spots", score: 84, query: "vitamin c for dark spots" },
  ],
  Paris: [
    { concern: "Sensitive", score: 92, query: "serum for sensitive skin" },
    { concern: "Wrinkles", score: 80, query: "retinol night cream" },
  ],
};

export const getTopSearches = (city: string): TopSearch[] => cityTopSearches[city] ?? topSearches;
export const getFocus = (city: string): Focus[] => cityFocus[city] ?? skinomicFocus;
