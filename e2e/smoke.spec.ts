import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = [
  { path: "/", heading: /already in production/i },
  { path: "/work", heading: /finished properly/i },
  { path: "/work/registered-accounts-optimizer", heading: "Registered Accounts Optimizer" },
  { path: "/work/stock-market-dashboard", heading: "Stock Market Dashboard" },
  { path: "/work/portfolio", heading: "This Portfolio" },
  { path: "/about", heading: /engineer next/i },
  { path: "/resume", heading: /every line earned/i },
  { path: "/contact", heading: /build something/i },
];

for (const route of routes) {
  test.describe(route.path, () => {
    test("renders one h1 with the expected text", async ({ page }) => {
      await page.goto(route.path);
      const h1 = page.getByRole("heading", { level: 1 });
      await expect(h1).toHaveCount(1);
      await expect(h1).toHaveText(route.heading);
    });

    test("has a canonical url and open graph image", async ({ page }) => {
      await page.goto(route.path);
      await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
      await expect(page.locator('meta[property="og:image"]').first()).toHaveAttribute(
        "content",
        /opengraph-image/,
      );
    });

    test("has no detectable accessibility violations", async ({ page }) => {
      // entrance animations fade text in; audit the settled, reduced motion render
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(route.path);
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
      expect(results.violations).toEqual([]);
    });
  });
}

test("navigation moves between pages and marks the current one", async ({ page, isMobile }) => {
  await page.goto("/");
  const navName = isMobile ? "Primary mobile" : "Primary";
  const nav = page.getByRole("navigation", { name: navName, exact: true });
  await nav.getByRole("link", { name: /About/ }).click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(nav.getByRole("link", { name: /About/ })).toHaveAttribute("aria-current", "page");
});

test("mobile tab bar is visible only on phones", async ({ page, isMobile }) => {
  await page.goto("/");
  const tabBar = page.getByRole("navigation", { name: "Primary mobile" });
  if (isMobile) await expect(tabBar).toBeVisible();
  else await expect(tabBar).toBeHidden();
});

test("resume pdf is served as a pdf", async ({ request }) => {
  const response = await request.get("/resume.pdf");
  expect(response.ok()).toBe(true);
  expect(response.headers()["content-type"]).toContain("application/pdf");
});

test("unknown routes render the 404 sheet", async ({ page }) => {
  const response = await page.goto("/this-does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("missing");
});

test("robots, sitemap and manifest are served", async ({ request }) => {
  for (const path of ["/robots.txt", "/sitemap.xml", "/manifest.webmanifest"]) {
    expect((await request.get(path)).ok(), path).toBe(true);
  }
});

test("structured data describes the person", async ({ page }) => {
  await page.goto("/");
  const json = await page.locator('script[type="application/ld+json"]').textContent();
  expect(json).toContain('"@type":"Person"');
  expect(json).toContain("github.com/Vishwapat");
});
