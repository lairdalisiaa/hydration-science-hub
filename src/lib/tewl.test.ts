import { describe, expect, it } from "vitest";
import { classifyTewl, tewlMarkerPosition } from "./tewl";

describe("TEWL bands", () => {
  it("treats 14.2 g/m²/h as healthy", () => {
    expect(classifyTewl(14.2)).toBe("Healthy");
  });
  it("treats 9.4 g/m²/h as healthy (5–15 range)", () => {
    expect(classifyTewl(9.4)).toBe("Healthy");
  });
  it("treats values above 15 as no longer healthy", () => {
    expect(classifyTewl(15.8)).toBe("Normal");
  });
  it("places 14.2 near the end of the healthy segment", () => {
    expect(tewlMarkerPosition(14.2)).toBeCloseTo(0.48, 2);
  });
});
