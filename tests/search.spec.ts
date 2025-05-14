import { test, expect } from '@playwright/test';

test.describe('Search functionality on TutorialNinja', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('');
  });

  test('should find results for a valid search term', async ({ page }) => {
    // Type in the search bar and submit
    await page.locator('input[name="search"]').fill('MacBook');
    await page.locator('button.btn.btn-default.btn-lg').click();

    // Check that results contain the search term
    const result = page.locator('.product-thumb h4 a');
    await expect(result).toContainText('MacBook');
  });

  test('should show no results for invalid search term', async ({ page }) => {
    await page.locator('input[name="search"]').fill('nonexistingitem123');
    await page.locator('button.btn.btn-default.btn-lg').click();

    const noResultText = page.locator('#content p');
    await expect(noResultText).toHaveText('There is no product that matches the search criteria.');
  });

  test('should find multiple items with generic term', async ({ page }) => {
    await page.locator('input[name="search"]').fill('phone');
    await page.locator('button.btn.btn-default.btn-lg').click();

    const results = page.locator('.product-thumb');
    // await expect(results).toHaveCount(count => count > 0);
  });
});
