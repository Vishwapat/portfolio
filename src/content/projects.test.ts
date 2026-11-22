import { describe, expect, it } from "vitest";
import { getAdjacentProjects, getProject, projects } from "./projects";

describe("projects", () => {
  it("has unique, url safe slugs", () => {
    const slugs = projects.map((project) => project.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it("keeps summaries short enough for meta descriptions", () => {
    for (const project of projects) expect(project.summary.length).toBeLessThanOrEqual(160);
  });

  it("gives every image meaningful alt text", () => {
    for (const project of projects) {
      for (const image of [project.cover, ...(project.gallery ?? [])]) {
        if (image) expect(image.alt.length).toBeGreaterThan(20);
      }
    }
  });

  it("only links to https urls", () => {
    for (const project of projects) {
      for (const link of project.links) expect(link.href).toMatch(/^https:\/\//);
    }
  });

  it("resolves neighbours at the edges", () => {
    const first = projects[0]!.slug;
    const last = projects.at(-1)!.slug;
    expect(getAdjacentProjects(first).previous).toBeUndefined();
    expect(getAdjacentProjects(last).next).toBeUndefined();
    expect(getProject("missing")).toBeUndefined();
  });
});
