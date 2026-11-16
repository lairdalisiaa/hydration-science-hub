import { describe, expect, it } from "vitest";
import { filterIngredients, libraryIngredients } from "./ingredients-data";
import { filterReports, reports } from "./reports-data";

describe("ingredient library filters", () => {
  it("shows only available soothing ingredients when Soothing is picked", () => {
    const names = filterIngredients(libraryIngredients, "", "Soothing", "Trending").map((i) => i.name);
    expect(names).toEqual(["Epigallocatechin Gallate"]);
  });

  it("puts new ingredients without a score last when sorted by trend", () => {
    const list = filterIngredients(libraryIngredients, "", "All", "Trending");
    expect(list[0]?.name).toBe("Epigallocatechin Gallate");
    expect(list.slice(1).every((i) => i.score === null)).toBe(true);
  });

  it("matches search on INCI name", () => {
    expect(filterIngredients(libraryIngredients, "egcg", "All", "A–Z").map((i) => i.name)).toEqual(["Epigallocatechin Gallate"]);
  });

  it("gives EGCG exactly 1 product and 0 saves", () => {
    const egcg = libraryIngredients.find((i) => i.name === "Epigallocatechin Gallate");
    expect(egcg?.products).toBe(1);
    expect(egcg?.saves).toBe("0");
  });

  it("keeps EGCG first in every sort and all other ingredients unavailable", () => {
    for (const sort of ["Trending", "Most searched", "A–Z"] as const) {
      expect(filterIngredients(libraryIngredients, "", "All", sort)[0]?.name).toBe("Epigallocatechin Gallate");
    }
    for (const item of libraryIngredients.slice(1)) {
      expect(item.comingSoon).toBe(true);
      expect(item.products).toBeNull();
      expect(item.score).toBeNull();
      expect(item.change).toBeNull();
      expect(item.report).toBeUndefined();
    }
  });
});

describe("report filters", () => {
  const none = { query: "", types: [], concerns: [], evidence: [], status: [] };

  it("hides coming-soon reports when only Published is picked", () => {
    const shown = filterReports(reports, { ...none, status: ["Published"] });
    expect(shown.every((r) => r.status === "Published")).toBe(true);
    expect(shown.map((r) => r.title)).toEqual(["Epigallocatechin Gallate"]);
  });

  it("finds the eye serum guide under Skincare guide", () => {
    expect(filterReports(reports, { ...none, types: ["Skincare guide"] }).map((r) => r.title)).toEqual(["Caffeine 5% + EGCG Eye Serum"]);
  });
});
