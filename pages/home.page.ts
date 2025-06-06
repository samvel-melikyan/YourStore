import { Locator, Page, expect } from '@playwright/test';
import ProductPage from './product.page';
import BasePage from './base.page';

export default class HomePage extends BasePage {
  readonly page: Page;
  readonly url: string = '?route=common/home'; 
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly currencyDropdown: Locator;
  readonly currencyOptions: Locator;
  readonly navMenu: Locator;
  readonly banner: Locator;
  readonly featuredProducts: Locator;
  readonly addToCartButtons: Locator;
  readonly productImages: Locator;
  readonly productTitles: Locator;
  

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.searchInput = page.locator('input[name="search"]');
    this.searchButton = page.locator('button.btn-default[type="button"]');
    this.currencyDropdown = page.locator('button.btn-link.dropdown-toggle');
    this.currencyOptions = page.locator('.dropdown-menu button');
    this.navMenu = page.locator('#menu .nav > li');
    this.banner = page.locator('#slideshow0');
    this.featuredProducts = page.locator('.product-layout');
    this.addToCartButtons = page.locator('.product-layout button[onclick*="cart.add"]');
  }

  async navigate() {
    await this.page.goto(this.url);
  }

  async searchForProduct(keyword: string) {
    await this.searchInput.fill(keyword);
    await this.searchButton.click();
  }

  async changeCurrency(currencyCode: string) {
    await this.currencyDropdown.click();
    await this.currencyOptions.locator(`text=${currencyCode}`).click();
  }

  async clickNavLink(linkText: string) {
    await this.navMenu.locator(`text=${linkText}`).first().click();
  }

  async verifyBannerVisible() {
    await expect(this.banner).toBeVisible();
  }

  async verifyFeaturedProductVisible(productName: string) {
    await expect(this.featuredProducts.locator(`text=${productName}`)).toBeVisible();
  }

  async addFirstFeaturedProductToCart() {
    await this.addToCartButtons.first().click();
  }

async goToProductPage(productName: string): Promise<ProductPage> {
    const product = this.featuredProducts.locator(`text=${productName}`);
    await product.click();
    let url = await this.page.url();
    const productPage = new ProductPage(this.page, url.split('=').pop()!);
    await productPage.navigate();
    return productPage;
}


}
