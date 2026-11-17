import { describe, expect, it } from "vitest";
import { featuredIngredient, goals, skinPerformance } from "./dashboard-data";

describe("shared dashboard values", () => {
  it("keeps four performance indicators, including one glass skin barrier score", () => {
    expect(skinPerformance.map(item => item.label)).toEqual(["Brightening", "Anti-aging", "Glass skin barrier", "Sebum / oil"]);
  });
  it("keeps the requested goal percentages in both layouts", () => {
    expect(goals).toEqual([{ label: "Weekly reports", value: 100 }, { label: "Distinctive hubs", value: 50 }, { label: "TEWL score", value: 75 }]);
  });
  it("shares the single EGCG product across phone and desktop", () => {
    expect(featuredIngredient.name).toBe("Epigallocatechin gallate");
    expect(featuredIngredient.products).toBe(1);
  });
});