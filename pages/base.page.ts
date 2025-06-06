import { Page, expect } from '@playwright/test';

export default class BasePage {
  readonly page: Page;
  readonly url: string;
  


  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string) {
    await this.page.goto(url);
  }

  async getTitle() {
    return this.page.title();
  }

  async verifyUrlContains(path: string) {
    await expect(this.page).toHaveURL(new RegExp(path));
  }

  async reloadPage() {
    await this.page.reload();
  }

  async goBack() {
    await this.page.goBack();
  }

  async goForward() {
    await this.page.goForward();
  }

  async waitForLoad() {
    await this.page.waitForLoadState('load');
  }

  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
  }

  async isElementVisible(selector: string) {
    return await this.page.locator(selector).isVisible();
  }

  async clickElement(selector: string) {
    await this.page.locator(selector).click();
  }
}
