import { test, expect } from '@playwright/test';

test.describe('Search functionality on TutorialNinja', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('');
  });

  test('should find results for a valid search term', async ({ page }) => {
    const searchText = 'Mac';

    await page.locator('#search').locator('input[name="search"]').fill(searchText);
    await page.locator('#search').locator('button[type="button"]').click();

    const result = page.locator('#search').locator('input[name="search"]');
    await expect(result).toHaveValue(searchText);

    let products = await page.locator('.caption h4 a').allTextContents();
    for (const product of products) {
      expect(product.toLowerCase()).toContain(searchText.toLowerCase());
    }

  });

  test.only('should show no results for invalid search term', async ({ page }) => {
    const searchText = 'nonexistingitem123';

    await page.locator('#search').locator('input[name="search"]').fill(searchText);
    await page.locator('#search').locator('button[type="button"]').click();

    const result = page.locator('#search').locator('input[name="search"]');
    await expect(result).toHaveValue(searchText);
    await expect (page.getByText('There is no product that matches the search criteria.')).toBeVisible();

  });


});
