import { describe, expect, it } from "vitest";
import { activeNav, nav } from "./nav";

describe("activeNav", () => {
  it("matches home only on the root path", () => {
    expect(activeNav("/")?.label).toBe("Home");
  });

  it("matches nested routes to their section", () => {
    expect(activeNav("/work/portfolio")?.label).toBe("Work");
  });

  it("returns undefined for unknown sections", () => {
    expect(activeNav("/nope")).toBeUndefined();
  });

  it("uses unique sheet numbers", () => {
    expect(new Set(nav.map((item) => item.sheet)).size).toBe(nav.length);
  });
});
