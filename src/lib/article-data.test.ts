import { describe, expect, it } from "vitest";
import { relatedArticles, routineSteps } from "./article-data";

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