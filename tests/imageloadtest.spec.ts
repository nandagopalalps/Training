import { test, expect } from "@playwright/test";

test("Images are loaded", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/broken_images");
  const imageElement = page.getByRole("img").nth(1);
  const naturalwidth = await imageElement.evaluate(
    (img: HTMLImageElement) => img.naturalWidth
  );
  console.log(`The naturalwidth is: ${naturalwidth}`);
});
