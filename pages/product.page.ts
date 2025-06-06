import { Locator, Page, expect } from '@playwright/test';
import BasePage from './base.page';

export default class ProductPage extends BasePage {
  readonly page: Page;
  readonly id: string; 
  readonly url: string; 
  readonly productTitle: Locator;
  readonly productPrice: Locator;
  readonly quantityInput: Locator;
  readonly addToCartButton: Locator;
  readonly successAlert: Locator;
  readonly productImage: Locator;
  readonly reviewTab: Locator;
  readonly reviewNameInput: Locator;
  readonly reviewTextInput: Locator;
  readonly reviewRating: Locator;
  readonly continueButton: Locator;
  

  constructor(page: Page, id: string = '43') {
    super(page);
    this.page = page;
    this.id = id;
    this.url = `?route=product/product&product_id=${this.id}`;
    this.productTitle = page.locator('div#content h1');
    this.productPrice = page.locator('.list-unstyled h2');
    this.quantityInput = page.locator('#input-quantity');
    this.addToCartButton = page.locator('#button-cart');
    this.successAlert = page.locator('.alert-success');
    this.productImage = page.locator('.thumbnails img');
    this.reviewTab = page.locator('a[href="#tab-review"]');
    this.reviewNameInput = page.locator('#input-name');
    this.reviewTextInput = page.locator('#input-review');
    this.reviewRating = page.locator('input[name="rating"][value="5"]'); // Can change value for different rating
    this.continueButton = page.locator('#button-review');
  }

  async navigate() {
    await this.page.goto(this.url);
  }

  async verifyProductName(expectedName: string) {
    await expect(this.productTitle).toHaveText(expectedName);
  }

  async verifyProductPrice(expectedPrice: string) {
    await expect(this.productPrice).toHaveText(expectedPrice);
  }

  async setQuantity(quantity: number) {
    await this.quantityInput.fill(quantity.toString());
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async verifyAddToCartSuccess() {
    await expect(this.successAlert).toBeVisible();
  }

  async viewProductImage() {
    await this.productImage.first().click(); // Opens image modal
  }

  async submitReview(name: string, review: string, rating: number = 5) {
    await this.reviewTab.click();
    await this.reviewNameInput.fill(name);
    await this.reviewTextInput.fill(review);
    await this.page.locator(`input[name="rating"][value="${rating}"]`).check();
    await this.continueButton.click();
  }
}
