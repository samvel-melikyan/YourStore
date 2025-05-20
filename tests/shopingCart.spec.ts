import {test, expect} from '@playwright/test';
import { log } from 'console';

test.describe('Cart', () => {

    let cartText: () => Promise<string | null>;
    let cartCount: () => Promise<number>;
    let cartPrice: () => Promise<number>;

    test.beforeEach(async ({page}) => {
        await page.goto('');
        // await page.goto('https://tutorialsninja.com/demo/index.php');

        cartText = async () => await page.locator('#cart-total').textContent();
        cartCount = async () => Number((await cartText())?.trim().split(' ')[0].trim());
        cartPrice = async () => Number((await cartText())?.split('$')[1].trim());
    });


    test('Add to cart', async ({page}) => {
        await expect (await cartCount()).toBe(0);
        await expect (await cartPrice()).toBe(0);

        await page.getByRole('button', { name: ' Add to Cart' }).first().click();
        await expect(await cartCount()).toBe(1);
        await expect (await page.locator('p.price').nth(0)).toContainText(`$${await cartPrice()}`); 
        await expect (await page.locator(".alert.alert-success.alert-dismissible")).toBeVisible();
        
    });


    test('Add to cart 2 times', async ({page}) => {
        await expect (await cartCount()).toBe(0);
        await expect (await cartPrice()).toBe(0);

        await page.getByRole('button', { name: ' Add to Cart' }).first().click(); // first item
        await expect(await cartCount()).toBe(1);
        await expect (await page.locator('p.price').nth(0)).toContainText(`$${await cartPrice()}`);  // await expect(await page.locator(`p:has-text("$${await cartPrice()}")`)).toBeVisible(); 
        await expect (await page.locator(".alert.alert-success.alert-dismissible")).toBeVisible();

        await page.locator('#cart-total').click();
        await page.getByRole('button', { name: '' }).click();

        await expect (await cartCount()).toBe(0);
        await expect (await cartPrice()).toBe(0);

        await page.getByRole('button', { name: ' Add to Cart' }).nth(1).click();    // second item
        await expect(await cartCount()).toBe(1);
        await expect (await page.locator('p.price').nth(1)).toContainText(`$${await cartPrice()}`);
        await expect (await page.locator(".alert.alert-success.alert-dismissible")).toBeVisible();
    });


    test.only('Add to cart Multiple items', async ({page}) => {
        await expect (await cartCount()).toBe(0);
        await expect (await cartPrice()).toBe(0);

        await page.getByRole('button', { name: 'Add to Cart' }).first().click(); // first item
        await expect(await cartCount()).toBe(1);        

        await page.getByRole('button', { name: 'Add to Cart' }).nth(1).click();    // second item
        await expect(await cartCount()).toBe(2);

        await page.getByRole('button', { name: 'Add to Cart' }).nth(2).click();    // third item
        expect(await cartCount()).toBe(3);
    });

    
    

});
