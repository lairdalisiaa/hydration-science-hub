export const hubs = [
  { city: "New York", share: 100 },
  { city: "Madrid", share: 64.2 },
  { city: "Frankfurt", share: 61.8 },
  { city: "Paris", share: 58.6 },
  { city: "Hong Kong", share: 52.4 },
  { city: "Korea", share: 44.8 },
  { city: "Tokyo", share: 41.2 },
];

export const topSearches = [
  { brand: "CeraVe", product: "Hydrating Facial Cleanser", change: 8.4 },
  { brand: "Rhode", product: "Peptide Lip Treatment", change: 16.2, rising: true },
  { brand: "La Roche-Posay", product: "Toleriane Double Repair", change: 5.1 },
  { brand: "Rare Beauty", product: "Soft Pinch Liquid Blush", change: -3.8 },
  { brand: "Charlotte Tilbury", product: "Hollywood Flawless Filter", change: -6.5 },
];

export const skinomicFocus = [
  { concern: "Acne", score: 96, query: "salicylic acid for acne" },
  { concern: "Glass Skin", score: 90, query: "korean glass skin routine" },
  { concern: "Dark Spots", score: 86, query: "how to fade dark spots" },
  { concern: "Wrinkles", score: 82, query: "retinol for wrinkles" },
];

export const goals = [
  { value: 75, label: "Weekly report" },
  { value: 57, label: "7 hubs" },
  { value: 40, label: "Monthly review" },
];

export const ticker = [
  { sym: "HERA", change: 22.0 },
  { sym: "RHDE", change: 16.2 },
  { sym: "CRVE", change: 8.4 },
  { sym: "LRP", change: 5.1 },
  { sym: "RARE", change: -3.8 },
  { sym: "CTIL", change: -6.5 },
  { sym: "EGCG", change: 18.1 },
  { sym: "PDRN", change: 25.1 },
  { sym: "NIAC", change: 5.2 },
  { sym: "RETN", change: -3.6 },
  { sym: "AZEL", change: 10.1 },
  { sym: "HA", change: 3.5 },
];

// Sample data: weekly average TEWL for the New York panel, weeks 35–46.
export const tewlTrend = [
  { week: "W35", tewl: 17.8 },
  { week: "W36", tewl: 17.2 },
  { week: "W37", tewl: 16.6 },
  { week: "W38", tewl: 16.9 },
  { week: "W39", tewl: 15.9 },
  { week: "W40", tewl: 15.3 },
  { week: "W41", tewl: 15.6 },
  { week: "W42", tewl: 14.9 },
  { week: "W43", tewl: 14.5 },
  { week: "W44", tewl: 14.8 },
  { week: "W45", tewl: 14.3 },
  { week: "W46", tewl: 14.2 },
];

export const skinPerformance = [
  { label: "Hydration", value: 62, unit: "%" },
  { label: "Barrier", value: 76 },
  { label: "Brightening", value: 82 },
  { label: "Soothing", value: 64 },
  { label: "Oil", value: 38, unit: "%" },
];
