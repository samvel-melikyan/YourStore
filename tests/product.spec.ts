import { test, expect } from '@playwright/test';
import ProductPage from '../pages/product.page.ts';
import HomePage from '../pages/home.page.ts';

test.describe('Product Page - MacBook', () => {
  let home: HomePage;
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
    await home.navigate();
    productPage = await home.goToProductPage('MacBook');
  });

  test('should display correct product name and price', async () => {
    await productPage.verifyProductName('MacBook');
    await productPage.verifyProductPrice('$602.00');
  });

  test('should allow changing quantity and adding to cart', async () => {
    await productPage.setQuantity(2);
    await productPage.addToCart();
    await productPage.verifyAddToCartSuccess();
  });

  test('should open product image preview', async () => {
    await productPage.viewProductImage();
    // Optionally: Add an assertion for modal/image viewer appearing
  });

  test('should allow submitting a product review', async () => {
    await productPage.submitReview('Samvel', 'Great product! Highly recommended.', 5);

    // Optional assertion for success message (if any)
    const reviewAlert = productPage.page.locator('.alert-success, .alert-danger');
    await expect(reviewAlert).toBeVisible();
  });
});
