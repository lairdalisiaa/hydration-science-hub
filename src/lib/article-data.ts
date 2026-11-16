export const article = {
  section: "Ingredient Intelligence · How-to",
  breadcrumb: ["Articles", "Ingredient Intelligence"],
  title: "Green Tea for Glass Skin",
  dek: "Why a familiar tea-leaf antioxidant is showing up in the move from instant glow to hydrated, resilient, translucent-looking skin.",
  author: { name: "Addottee", bio: "Hydration Science Hub" },
  readTime: "3 min read",
  date: "16 Nov 2026",
};

export const toc = [
  { id: "why-green-tea", label: "Why green tea belongs" },
  { id: "key-takeaways", label: "Key takeaways" },
  { id: "long-term-care", label: "From instant glow to long-term care" },
  { id: "routine", label: "Where it fits in a routine" },
  { id: "ingredient-intelligence", label: "Ingredient intelligence" },
  { id: "products", label: "Products with green tea" },
];

export const takeaways = [
  { title: "Antioxidant protection comes first", body: "EGCG helps defend skin against everyday oxidative stress." },
  { title: "A clearer, calmer feel", body: "Tannins give green tea its light, refining astringency." },
  { title: "Conditioning support", body: "Theobromine and theophylline help skin feel smooth and conditioned." },
];

export const routineSteps = [
  { step: "Cleanser", greenTea: true },
  { step: "Toner", greenTea: true },
  { step: "Essence / Serum", greenTea: true },
  { step: "Gel cream", greenTea: true },
  { step: "Sheet mask", greenTea: true },
];

export const relatedArticles = [
  { title: "Coming soon" },
];

/** Product ids from products-data that contain green tea. */
export const greenTeaProductIds = ["pdrn-serum", "lip-treatment", "cleanser"];

export const articleCategories = ["All", "Trends", "Ingredients", "Products", "Science", "Market"] as const;
export type ArticleCategory = (typeof articleCategories)[number];
export const articlePreviews = [
  { id: "green-tea", title: article.title, category: "Ingredients", label: "Ingredient Intelligence", available: true },
  { id: "trend-preview", title: "Coming soon", category: "Trends", label: "Trend Report", available: false },
  { id: "product-preview", title: "Coming soon", category: "Products", label: "Product Review", available: false },
  { id: "market-preview", title: "Coming soon", category: "Market", label: "Market Analysis", available: false },
] as const;

export function filterArticlePreviews(query: string, category: ArticleCategory, sort: string) {
  const filtered = articlePreviews.filter((item) =>
    (category === "All" || item.category === category) &&
    `${item.title} ${item.label}`.toLowerCase().includes(query.trim().toLowerCase()),
  );
  return sort === "title" ? [...filtered].sort((a, b) => Number(b.available) - Number(a.available) || a.title.localeCompare(b.title)) : filtered;
}
