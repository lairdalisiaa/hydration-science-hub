import { describe, expect, it } from "vitest";
import { deliveryModes, keyTakeaway, performanceSignal } from "./theory-data";

describe("EGCG cell simulation sample", () => {
  it("uses epigallocatechin gallate with its molecular formula", () => {
    expect(keyTakeaway.ingredient).toBe("Epigallocatechin gallate");
    expect(keyTakeaway.formula).toBe("C22H18O11");
  });

  it("provides the five requested numeric measurements with meters", () => {
    expect(performanceSignal.map(({ label }) => label)).toEqual(["MW", "pKa", "Solubility", "log Kp", "TEWL"]);
    expect(performanceSignal.find(({ label }) => label === "MW")?.unit).toBe("g/mol");
    expect(performanceSignal.find(({ label }) => label === "MW")?.value).toBe(458.37);
    for (const measurement of performanceSignal) {
      expect(Number.isFinite(measurement.value)).toBe(true);
      expect(measurement.meter).toBeGreaterThanOrEqual(0);
      expect(measurement.meter).toBeLessThanOrEqual(100);
    }
  });

  it("keeps the default TEWL measurement consistent with the serum sample", () => {
    expect(performanceSignal.find(({ label }) => label === "TEWL")?.value).toBe(deliveryModes["Leave-on serum"].tewl);
  });
});