import pdrnImg from "@/assets/product-pdrn-serum.jpg";
import lipImg from "@/assets/product-lip-treatment.jpg";
import cleanserImg from "@/assets/product-cleanser.jpg";
import moisturizerImg from "@/assets/product-moisturizer.jpg";
import blushImg from "@/assets/product-blush.jpg";

export type ProductCategory = "Serum" | "Cleanser" | "Moisturizer" | "Lip";

export type TrendingProduct = {
  id: string;
  name: string;
  brand: string;
  country: string;
  category: ProductCategory;
  price: string;
  change: number;
  unitsPerWeek: string;
  ingredient: string;
  ingredientScore: number;
  image: string;
  estSales?: string;
};

// Trending in New York this week (sample data from the mockups).
export const trendingProducts: TrendingProduct[] = [
  { id: "pdrn-serum", name: "PDRN Hyaluronic Serum", brand: "Hera", country: "South Korea", category: "Serum", price: "$58", change: 22, unitsPerWeek: "9.8k", ingredient: "PDRN", ingredientScore: 84, image: pdrnImg, estSales: "$568k" },
  { id: "lip-treatment", name: "Peptide Lip Treatment", brand: "Rhode", country: "United States", category: "Lip", price: "$18", change: 16.2, unitsPerWeek: "8.1k", ingredient: "Peptides", ingredientScore: 58, image: lipImg },
  { id: "cleanser", name: "Hydrating Facial Cleanser", brand: "CeraVe", country: "United States", category: "Cleanser", price: "$17.99", change: 8.4, unitsPerWeek: "12.4k", ingredient: "Ceramides", ingredientScore: 72, image: cleanserImg },
  { id: "toleriane", name: "Toleriane Double Repair", brand: "La Roche-Posay", country: "France", category: "Moisturizer", price: "$24", change: 5.1, unitsPerWeek: "6.9k", ingredient: "Niacinamide", ingredientScore: 61, image: moisturizerImg },
  { id: "soft-pinch", name: "Soft Pinch Liquid Blush", brand: "Rare Beauty", country: "United States", category: "Lip", price: "$23", change: -3.8, unitsPerWeek: "4.1k", ingredient: "Glycerin", ingredientScore: 44, image: blushImg },
];

export const productById = (id: string) => trendingProducts.find((p) => p.id === id);
