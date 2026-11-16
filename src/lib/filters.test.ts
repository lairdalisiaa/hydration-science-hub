import { describe, expect, it } from "vitest";
import { filterIngredients, libraryIngredients } from "./ingredients-data";
import { filterReports, reports } from "./reports-data";

describe("ingredient library filters", () => {
  it("shows only hydration ingredients when Hydration is picked", () => {
    const names = filterIngredients(libraryIngredients, "", "Hydration", "Trending").map((i) => i.name);
    expect(names).toEqual(["PDRN", "Hyaluronic Acid"]);
  });

  it("puts new ingredients without a score last when sorted by trend", () => {
    const list = filterIngredients(libraryIngredients, "", "All", "Trending");
    expect(list[0]?.name).toBe("PDRN");
    expect(list.slice(-2).every((i) => i.score === null)).toBe(true);
  });

  it("matches search on INCI name", () => {
    expect(filterIngredients(libraryIngredients, "sodium dna", "All", "A–Z").map((i) => i.name)).toEqual(["PDRN"]);
  });
});

describe("report filters", () => {
  const none = { query: "", types: [], concerns: [], evidence: [], status: [] };

  it("hides coming-soon reports when only Published is picked", () => {
    const shown = filterReports(reports, { ...none, status: ["Published"] });
    expect(shown.every((r) => r.status === "Published")).toBe(true);
    expect(shown).toHaveLength(4);
  });

  it("finds the eye serum guide under Skincare guide", () => {
    expect(filterReports(reports, { ...none, types: ["Skincare guide"] }).map((r) => r.title)).toEqual(["Caffeine 5% + EGCG Eye Serum"]);
  });
});
