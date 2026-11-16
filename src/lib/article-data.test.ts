import { describe, expect, it } from "vitest";
import { articlePreviews, filterArticlePreviews, relatedArticles, routineSteps } from "./article-data";

describe("green tea routine options", () => {
  it("includes cleanser as a green tea option", () => {
    expect(routineSteps.find((step) => step.step === "Cleanser")?.greenTea).toBe(true);
  });

  it("includes gel cream as a green tea option", () => {
    expect(routineSteps.find((step) => step.step === "Gel cream")?.greenTea).toBe(true);
  });
});

describe("related articles availability", () => {
  it("contains only one entry", () => {
    expect(relatedArticles).toHaveLength(1);
  });
});

describe("article library", () => {
  it("offers Green Tea for Glass Skin as the only available article", () => {
    expect(articlePreviews.filter((item) => item.available).map((item) => item.title)).toEqual(["Green Tea for Glass Skin"]);
  });
  it("marks all other articles coming soon", () => {
    expect(articlePreviews.filter((item) => !item.available).map((item) => item.title)).toEqual(["Coming soon", "Coming soon", "Coming soon"]);
  });
  it("filters by search and category", () => {
    expect(filterArticlePreviews("green tea", "Ingredients", "recent").map((item) => item.id)).toEqual(["green-tea"]);
    expect(filterArticlePreviews("green tea", "Products", "recent")).toEqual([]);
  });
});