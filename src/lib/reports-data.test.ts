import { describe, expect, it } from "vitest";
import { eyeSerum, featuredReport, howToGuides, reports } from "./reports-data";

describe("report availability", () => {
  it("lists exactly 1 product for EGCG", () => {
    expect(reports.find((r) => r.title === "Epigallocatechin Gallate")?.products).toBe(1);
  });

  it("keeps the EGCG signal at 78", () => {
    expect(reports.find((r) => r.title === "Epigallocatechin Gallate")?.signal).toBe(78);
    expect(featuredReport.signal).toBe(78);
  });

  it("lists 0 readers for EGCG", () => {
    expect(reports.find((r) => r.title === "Epigallocatechin Gallate")?.readers).toBe("0");
  });

  it("only offers the EGCG report to open", () => {
    expect(reports.filter((r) => r.to).map((r) => [r.title, r.to])).toEqual([
      ["Epigallocatechin Gallate", "/reports/egcg"],
    ]);
    expect(howToGuides.filter((g) => g.to)).toHaveLength(0);
  });

  it("keeps all five other reports coming soon without numbers or publication dates", () => {
    const upcoming = reports.filter((r) => r.title !== "Epigallocatechin Gallate");
    expect(upcoming).toHaveLength(5);
    for (const r of upcoming) {
      expect(r.status).toBe("Coming soon");
      expect(r.date).toBeUndefined();
      expect(r.signal).toBeUndefined();
      expect(r.readers).toBeUndefined();
      expect(r.products).toBeUndefined();
    }
  });

  it("uses 16 November 2026 as today's EGCG publication date", () => {
    expect(featuredReport.published).toBe("16 Nov 2026");
    expect(reports.find((r) => r.title === "Epigallocatechin Gallate")?.date).toBe("16 Nov 2026");
  });
});

describe("EGCG featured product", () => {
  it("uses The Ordinary Caffeine 5% + EGCG eye serum", () => {
    expect(eyeSerum.brand).toBe("The Ordinary");
    expect(eyeSerum.name).toBe("Caffeine 5% + EGCG Eye Serum");
    expect(eyeSerum.tags).toContain("Caffeine 5%");
    expect(eyeSerum.tags).toContain("EGCG glucoside");
  });
});