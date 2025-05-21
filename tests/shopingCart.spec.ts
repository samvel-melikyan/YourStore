import { test, expect } from '@playwright/test';

test.describe('Shopping Cart', () => {

    let cartText: () => Promise<string | null>;

    test.beforeEach(async ({ page }) => {
        await page.goto(''); // await page.goto('https://tutorialsninja.com/demo/index.php');
        cartText = async () => await page.locator('#cart-total').textContent();
    });


    test('Add to cart', async ({ page }) => {
        const cartCount = async () => Number((await cartText())?.trim().split(' ')[0].trim());
        const cartPrice = async () => Number((await cartText())?.split('$')[1].trim());

        await expect(await cartCount()).toBe(0);
        await expect(await cartPrice()).toBe(0);

        await page.getByRole('button', { name: ' Add to Cart' }).first().click();
        await expect(await cartCount()).toBe(1);
        await expect(await page.locator('p.price').nth(0)).toContainText(`$${await cartPrice()}`);
        await expect(await page.locator(".alert.alert-success.alert-dismissible")).toBeVisible();

    });


    test('Cart persists after page reload', async ({ page }) => {
        const cartCount = async () => Number((await cartText())?.trim().split(' ')[0].trim());
        await expect(await cartCount()).toBe(0);
        
        await page.getByRole('button', { name: 'Add to Cart' }).first().click();
        await expect(await cartCount()).toBe(1);

        await page.reload();
        await expect(await cartCount()).toBe(1);
    });


    test('Add same item twice', async ({ page }) => {
        const cartCount = async () => Number((await cartText())?.trim().split(' ')[0].trim());
        await expect(await cartCount()).toBe(0);
        
        const addToCartButton = await page.getByRole('button', { name: 'Add to Cart' }).first();
        await addToCartButton.click();
        await page.waitForTimeout(1000);
        await addToCartButton.click();

        await expect(await cartCount()).toBe(2);
    });


    test('Proceed to checkout from cart', async ({ page }) => {
        await page.getByRole('button', { name: 'Add to Cart' }).first().click();
        await page.locator('#cart-total').click();
        await page.locator('.dropdown-menu.pull-right p.text-right a').filter({ hasText: 'Checkout' }).click();
        await expect(await page.url()).toContain('route=checkout');
    });

    
    test('Proceed to view the cart', async ({ page }) => {
        await page.getByRole('button', { name: 'Add to Cart' }).first().click();
        await page.locator('#cart-total').click();
        await page.locator('.dropdown-menu.pull-right p.text-right a').filter({ hasText: 'View Cart' }).click();
        await expect(await page.url()).toContain('route=checkout/cart');
    });


    test('Cart shows empty message after removing all items', async ({ page }) => {
        await page.getByRole('button', { name: 'Add to Cart' }).first().click();
        await page.locator('#cart-total').click();
        await page.getByRole('button', { name: '' }).click();

        await expect(page.locator('#cart p')).toContainText('Your shopping cart is empty!');
    });



    test('Success alert message is correct after adding item', async ({ page }) => {
        await page.getByRole('button', { name: 'Add to Cart' }).first().click();
        const alert = await page.locator(".alert-success").textContent();
        expect(alert).toContain('Success:');
    });


    test('Cart dropdown shows correct item details', async ({ page }) => {
        const productName = await page.locator('.product-thumb').first().locator('h4 a').textContent();
        await page.getByRole('button', { name: 'Add to Cart' }).first().click();

        await page.locator('#cart-total').click();
        const itemInCart = await page.locator('#cart ul.dropdown-menu li').nth(0).textContent();

        expect(itemInCart).toContain(productName?.trim() || '');
    });


    test('Add to cart, Remove, Add another', async ({ page }) => {
        const cartCount = async () => Number((await cartText())?.trim().split(' ')[0].trim());
        const cartPrice = async () => Number((await cartText())?.split('$')[1].trim());

        await expect(await cartCount()).toBe(0);
        await expect(await cartPrice()).toBe(0);

        await page.getByRole('button', { name: ' Add to Cart' }).first().click(); // first item
        await expect(await cartCount()).toBe(1);

        const itemPrice = await page.locator('p.price').nth(0);
        const successAlert = await page.locator(".alert.alert-success.alert-dismissible");
        await expect(itemPrice).toContainText(`$${await cartPrice()}`);
        await expect(successAlert).toBeVisible();

        await page.locator('#cart-total').click();
        await page.getByRole('button', { name: '' }).click(); // remove item from cart

        await expect(await cartCount()).toBe(0);
        await expect(await cartPrice()).toBe(0);

        await page.getByRole('button', { name: ' Add to Cart' }).nth(1).click();    // second item
        await expect(await cartCount()).toBe(1);

        const itemPrice2 = await page.locator('p.price').nth(1);
        await expect(itemPrice2).toContainText(`$${await cartPrice()}`);
        await expect(successAlert).toBeVisible();
    });


    test('Add to cart Multiple items', async ({ page }) => {
        const cartCount = async () => Number((await cartText())?.trim().split(' ')[0].trim());

        await expect(await cartCount()).toBe(0);

        await page.getByRole('button', { name: 'Add to Cart' }).first().click();   // first item add to cart
        await expect(await cartCount()).toBe(1);

        await page.getByRole('button', { name: 'Add to Cart' }).nth(1).click();    // second item add to cart
        await expect(await cartCount()).toBe(2);
    });


    test('Add to cart Multiple items : check price', async ({ page }) => {
        const cartCount = async () => Number((await cartText())?.trim().split(' ')[0].trim());
        const cartPrice = async () => Number((await cartText())?.split('$')[1].trim());

        await expect(await cartCount()).toBe(0);
        await expect(await cartPrice()).toBe(0);

        await page.getByRole('button', { name: 'Add to Cart' }).first().click();   // first item add to cart        
        await page.getByRole('button', { name: 'Add to Cart' }).nth(1).click();    // second item add to cart

        let price = 0;
        for (let i = 0; i < 2; i++) {
            let priceText = await page.locator('.product-thumb.transition').nth(i).locator('.price').textContent();
            let p = priceText ? priceText.split(' ')[0] : '';
            price += Number(p.replace('$', ''));
        }
        expect(price).toBeGreaterThan(0);
        await page.waitForTimeout(2000);
        await expect(await cartPrice()).toBe(price);
    });

});
