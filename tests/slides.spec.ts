import { test, expect } from '@playwright/test';

// URL of the site under test
test.describe('TutorialsNinja Home Slider', () => {

  const homeUrl = 'https://tutorialsninja.com/demo/index.php?route=common/home';

  test.skip( ({browserName})=> browserName === 'webkit', 'Skipping Webkit on Linux');

  test.beforeEach(async ({ page }) => {
    await page.goto(homeUrl);
    // Wait for slider to initialize (adjust selector to your slider container)
    await page.waitForSelector('.swiper-container, .owl-carousel, #slideshow0');
  });


  test('should display the first slide initially', async ({ page }) => {
    // Replace with your slider's active-slide selector
    const activeInRealSlider = page.locator('#slideshow0 .swiper-slide-active');
    await expect(activeInRealSlider).toBeVisible();
  });


  test('should navigate to next slide on clicking next arrow', async ({ page }) => {
    
    const activeImage = page.locator('#slideshow0 .swiper-slide-active img');
    const initialSrc = await activeImage.getAttribute('src') || '';

    
    await page.locator('.swiper-button-next').first().click();

    await expect(activeImage).not.toHaveAttribute('src',  initialSrc);

    await page.locator('.swiper-button-next').first().click();
    await expect(activeImage).toHaveAttribute('src', initialSrc);

  });


  test('should navigate back to previous slide', async ({ page }) => {

    const activeImage = page.locator('#slideshow0 .swiper-slide-active img');
    const initialSrc = await activeImage.getAttribute('src') || '';

    await page.locator('.swiper-button-prev').first().click();
    await expect(activeImage).not.toHaveAttribute('src', initialSrc);

    await page.locator('.swiper-button-prev').first().click();
    await expect(activeImage).toHaveAttribute('src', initialSrc);

  });



  test('should auto-play slides after a delay', async ({ page }) => {
    const activeImage = page.locator('#slideshow0 .swiper-slide-active img');
    const initialSrc = await activeImage.getAttribute('src') || '';

    // Wait for auto-play interval (adjust timeout based on slider settings)
    await page.waitForTimeout(6000);

    // Expect the slide to have changed automatically
    await expect(activeImage).not.toHaveAttribute('src', initialSrc);
  });
});