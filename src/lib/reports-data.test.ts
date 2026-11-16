import { describe, expect, it } from "vitest";
import { eyeSerum } from "./reports-data";

describe("EGCG featured product", () => {
  it("uses The Ordinary Caffeine 5% + EGCG eye serum", () => {
    expect(eyeSerum.brand).toBe("The Ordinary");
    expect(eyeSerum.name).toBe("Caffeine 5% + EGCG Eye Serum");
    expect(eyeSerum.tags).toContain("Caffeine 5%");
    expect(eyeSerum.tags).toContain("EGCG glucoside");
  });
});