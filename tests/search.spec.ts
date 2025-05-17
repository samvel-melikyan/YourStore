import { test, expect } from '@playwright/test';

test.describe('Search functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('');
  });


  test('should have currect placeholdern', async ({ page }) => {
    const searchInput = page.locator('#search').locator('input[name="search"]');
    await expect (searchInput).toHaveAttribute('placeholder', 'Search');
  });


  test('should find results for a valid search term', async ({ page }) => {
    const searchInput = page.locator('#search').locator('input[name="search"]')
    const searchButton = page.locator('#search').locator('button[type="button"]');

    await searchInput.fill('Mac');
    await searchButton.click();
    let products = await page.locator('.caption h4 a').allTextContents();
    for (const product of products) {
      expect(product.toLowerCase()).toContain('mac');
    }
    
    await searchInput.fill('phone');
    await searchButton.click();
    products = await page.locator('.caption h4 a').allTextContents();
    for (const product of products) {
      expect(product.toLowerCase()).toContain('phone');
    }
  });


  test('should show no results for invalid search term', async ({ page }) => {
    const searchText = 'nonexistingitem123';

    await page.locator('#search').locator('input[name="search"]').fill(searchText);
    await page.locator('#search').locator('button[type="button"]').click();

    const result = page.locator('#search').locator('input[name="search"]');
    await expect(result).toHaveValue(searchText);
    await expect (page.getByText('There is no product that matches the search criteria.')).toBeVisible();
  });


  test('should show no results for empty search term', async ({ page }) => {
    const searchText = '';

    await page.locator('#search').locator('input[name="search"]').fill(searchText);
    await page.locator('#search').locator('button[type="button"]').click();

    const result = page.locator('#search').locator('input[name="search"]');
    await expect(result).toHaveValue(searchText);
    await expect (page.getByText('There is no product that matches the search criteria.')).toBeVisible();
  });


  test('should be case insensitivity', async ({ page }) => {
    const searchText = 'macbook';
    await page.locator('#search').locator('input[name="search"]').fill(searchText); 
    await page.locator('#search').locator('button[type="button"]').click();
    let products = await page.locator('.caption h4 a').allTextContents();
    for (const product of products) {
      expect(product.toLowerCase()).toContain(searchText.toLowerCase());
    }
  });


  test('search term is trimmed before and after search', async ({ page }) => {
    const raw = '   Mac    ';
    const term = raw.trim().toLowerCase();
  
    const searchInput = page.locator('input[name="search"]');
    const searchButton = page.locator('#search').locator('button[type="button"]');
  
    await searchInput.fill(raw);
    await searchButton.click();
    // Check every product contains the trimmed term
    const products = await page.locator('.caption h4 a').allTextContents();
    for (const text of products) {
      await expect(text.toLowerCase()).toContain(term);
    }
    // Verify the search input value is trimmed
    await expect(searchInput).toHaveValue(raw.trim());
    await expect(page.locator('#input-search')).toHaveValue(raw.trim());
  });
  
});
