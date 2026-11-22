import { describe, expect, it } from "vitest";
import { site } from "./site";

describe("site config", () => {
  it("uses absolute https urls", () => {
    expect(site.url).toMatch(/^https:\/\//);
    for (const href of Object.values(site.links)) {
      expect(href).toMatch(/^https:\/\//);
    }
  });

  it("keeps the description within search snippet length", () => {
    expect(site.description.length).toBeLessThanOrEqual(160);
  });
});
