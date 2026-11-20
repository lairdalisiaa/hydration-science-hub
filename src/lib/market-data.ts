import { topSearches, skinomicFocus } from "./dashboard-data";

type TopSearch = (typeof topSearches)[number];
type Focus = (typeof skinomicFocus)[number];

// SAMPLE DATA: replace with real numbers. Add one entry per hub:
// Madrid, Frankfurt, Paris, Hong Kong, Korea, Tokyo.
export const cityFocus: Record<string, Focus[]> = {
  "New York": [
    { concern: "Acne", score: 96, query: "salicylic acid for acne" },
    { concern: "Glass Skin", score: 90, query: "korean glass skin routine" },
    { concern: "Dark Spots", score: 86, query: "how to fade dark spots" },
    { concern: "Wrinkles", score: 82, query: "retinol for wrinkles" },
    { concern: "Glow", score: 80, query: "how to get glowing skin" },
  ],
  Frankfurt: [
    { concern: "Acne", score: 93, query: "adult acne treatment" },
    { concern: "Wrinkles", score: 91, query: "best anti-aging cream" },
    { concern: "Dark Spots", score: 86, query: "remove facial dark spots" },
    { concern: "Dry Skin", score: 84, query: "dry skin face cream" },
    { concern: "Glass Skin", score: 80, query: "korean glass skin routine" },
  ],
  Madrid: [
    { concern: "Dark Spots", score: 94, query: "how to remove facial spots" },
    { concern: "Wrinkles", score: 91, query: "best anti-wrinkle cream" },
    { concern: "Acne", score: 88, query: "salicylic acid for acne" },
    { concern: "Glow", score: 84, query: "vitamin c for glowing skin" },
    { concern: "Glass Skin", score: 80, query: "korean glass skin routine" },
  ],
  Paris: [
    { concern: "Wrinkles", score: 95, query: "best anti-wrinkle cream" },
    { concern: "Glow", score: 91, query: "how to get a luminous complexion" },
    { concern: "Dark Spots", score: 88, query: "remove dark spots on face" },
    { concern: "Acne", score: 85, query: "hormonal acne treatment" },
    { concern: "Glass Skin", score: 82, query: "korean glass skin routine" },
  ],
  Tokyo: [
    { concern: "Glass Skin", score: 97, query: "korean glass skin routine steps" },
    { concern: "Large Pores", score: 94, query: "pore tightening serum recommendation" },
    { concern: "Acne", score: 89, query: "fast adult acne treatment" },
    { concern: "Dark Spots", score: 86, query: "blemish-clearing whitening serum" },
    { concern: "Wrinkles", score: 83, query: "wrinkle reduction retinol serum" },
  ],
  "Hong Kong": [
    { concern: "Glass Skin", score: 96, query: "korean glass skin skincare steps" },
    { concern: "Dark Spots", score: 92, query: "dark spot fading whitening serum" },
    { concern: "Acne", score: 89, query: "fastest way to clear closed comedones" },
    { concern: "Large Pores", score: 87, query: "pore-shrinking firming essence" },
    { concern: "Wrinkles", score: 84, query: "early anti-aging fine line eye cream" },
  ],
  Korea: [
    { concern: "Glass Skin", score: 99, query: "glass skin skincare routine" },
    { concern: "Large Pores", score: 95, query: "pore-minimizing ampoule recommendation" },
    { concern: "Acne", score: 91, query: "how to get rid of acne fast" },
    { concern: "Dark Spots", score: 88, query: "how to remove melasma and blemishes" },
    { concern: "Glow", score: 85, query: "inner-glow skin ampoule recommendation" },
  ],
};

export const cityTopSearches: Record<string, TopSearch[]> = {
  "New York": [
    { brand: "CeraVe", product: "Hydrating Facial Cleanser", change: 8.4 },
    { brand: "Rhode", product: "Peptide Lip Treatment", change: 16.2 },
    { brand: "La Roche-Posay", product: "Toleriane Double Repair Moisturizer", change: 5.1 },
    { brand: "Rare Beauty", product: "Soft Pinch Liquid Blush", change: -3.8 },
    { brand: "Charlotte Tilbury", product: "Hollywood Flawless Filter", change: -6.5 },
  ],
  Frankfurt: [
    { brand: "La Roche-Posay", product: "Toleriane Double Repair Moisturizer", change: 7.3 },
    { brand: "CeraVe", product: "Hydrating Facial Cleanser", change: 4.5 },
    { brand: "The Ordinary", product: "Niacinamide 10% + Zinc 1%", change: -2.9 },
    { brand: "Paula's Choice", product: "Skin Perfecting 2% BHA Liquid", change: 11.8 },
    { brand: "Bioderma", product: "Sensibio H2O Micellar Water", change: -4.1 },
  ],
  Madrid: [
    { brand: "Rare Beauty", product: "Soft Pinch Liquid Blush", change: 14.5 },
    { brand: "CeraVe", product: "Hydrating Facial Cleanser", change: 9.2 },
    { brand: "La Roche-Posay", product: "Toleriane Double Repair Moisturizer", change: 6.0 },
    { brand: "Sol de Janeiro", product: "Brazilian Bum Bum Cream", change: -5.4 },
    { brand: "The Ordinary", product: "Niacinamide 10% + Zinc 1%", change: 3.7 },
  ],
  Paris: [
    { brand: "La Roche-Posay", product: "Toleriane Double Repair Moisturizer", change: 6.8 },
    { brand: "Dior", product: "Addict Lip Glow Oil", change: 12.4 },
    { brand: "Chanel", product: "Les Beiges Water-Fresh Tint", change: -4.2 },
    { brand: "Bioderma", product: "Sensibio H2O Micellar Water", change: 3.1 },
    { brand: "CeraVe", product: "Hydrating Facial Cleanser", change: -2.8 },
  ],
  Tokyo: [
    { brand: "Cosrx", product: "Advanced Snail 96 Mucin Power Essence", change: 15.3 },
    { brand: "Anua", product: "Heartleaf 77% Soothing Toner", change: 18.7 },
    { brand: "Beauty of Joseon", product: "Relief Sun Rice + Probiotics SPF 50", change: 9.4 },
    { brand: "Torriden", product: "Dive-In Low Molecular Hyaluronic Serum", change: 21.0 },
    { brand: "Shiseido", product: "Ultimune Power Infusing Serum", change: -5.6 },
  ],
  "Hong Kong": [
    { brand: "Laneige", product: "Lip Sleeping Mask", change: 7.8 },
    { brand: "Dior", product: "Addict Lip Glow Oil", change: 11.2 },
    { brand: "Beauty of Joseon", product: "Relief Sun Rice + Probiotics SPF 50", change: 14.6 },
    { brand: "Charlotte Tilbury", product: "Hollywood Flawless Filter", change: -3.5 },
    { brand: "Rare Beauty", product: "Soft Pinch Liquid Blush", change: 5.9 },
  ],
  Korea: [
    { brand: "Anua", product: "Heartleaf 77% Soothing Toner", change: 24.1 },
    { brand: "Beauty of Joseon", product: "Relief Sun Rice + Probiotics SPF 50", change: 19.5 },
    { brand: "Medicube", product: "Zero Pore Pad 2.0", change: 16.8 },
    { brand: "Torriden", product: "Dive-In Low Molecular Hyaluronic Serum", change: 22.4 },
    { brand: "Cosrx", product: "Advanced Snail 96 Mucin Power Essence", change: -4.3 },
  ],
};

export const getTopSearches = (city: string): TopSearch[] => cityTopSearches[city] ?? topSearches;
export const getFocus = (city: string): Focus[] => cityFocus[city] ?? skinomicFocus;
