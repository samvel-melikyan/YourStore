import { test, expect } from '@playwright/test'


test.describe('A full testing of the shopping basket', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('');
    });

    // Helper to add a product to the cart
    async function addToCart(page, keyword = 'mac', index = 0, amount = 1) {
        await page.locator('.form-control.input-lg').fill(keyword);
        
        await page.getByRole('button', { name: '' }).click();
        for (let i=0; i < amount; i++) {
            await page.getByRole('button', { name: /Add to Cart/ }).nth(index).click(); 
        }
        await page.waitForTimeout(500); // slight delay for cart update
    }
    

    test('Cart button updates after adding item', async ({ page }) => {
        await addToCart(page);
        await expect(page.getByRole('button', { name: /1 item\(s\)/ })).toBeVisible();
    });
    

    test('Cart dropdown shows correct added item', async ({ page }) => {
        await addToCart(page);
        await page.getByRole('button', { name: /1 item\(s\)/ }).click();
        await expect(page.locator('#cart').getByText('iMac')).toBeVisible();
    });
    

    test('Delete item from cart', async ({ page }) => {
        await addToCart(page);
        await page.getByRole('button', { name: /1 item\(s\)/ }).click();
        await page.getByRole('button', { name: '' }).click();
        await page.getByRole('button', { name: /0 item\(s\)/ }).click();
        await expect(page.locator('#cart')).toContainText('Your shopping cart is empty!');
    });
    

    test('Add multiple items and verify names', async ({ page }) => {
        await addToCart(page, 'imac');
        await addToCart(page, 'macbook');
        await page.getByRole('button', { name: /2 item\(s\)/ }).click();
        await expect(page.locator('#cart').getByText('iMac')).toBeVisible();
        await expect(page.locator('#cart').getByText('MacBook')).toBeVisible();
    });
    

    test('Correct number of items in cart', async ({ page }) => {
        await addToCart(page, 'imac');
        await addToCart(page, 'macbook');
        const text = await page.getByRole('button', { name: /2 item\(s\)/ }).innerText();
        expect(text).toContain('2 item(s)');
    });
    

    test('Check subtotal and total in cart', async ({ page }) => {
        await addToCart(page);
        await page.getByRole('button', { name: /1 item\(s\)/ }).click();
        const prices = page.locator('.table.table-bordered');
        let total = 0.0;
        for (let i = 0; i < 3; i++) {
            let str = await prices.locator('tr').nth(i).locator('td').nth(1).innerText();
            total += parseFloat(str.replace('$', ''));
            console.log(total); 
        }
        const totalPrice = parseFloat((await prices.locator('tr').nth(3).locator('td').nth(1).innerText()).replace('$', ''));
        expect(total).toBeCloseTo(totalPrice, 2);
    });
    

    test('View Cart link redirects correctly', async ({ page }) => {
        await addToCart(page);
        await page.getByRole('button', { name: /1 item\(s\)/ }).click();
        await page.locator('#cart').getByText('View Cart').click();
        await expect(page).toHaveURL(/route=checkout\/cart/);
    });
    

    test('Checkout link redirects correctly', async ({ page }) => {
        await addToCart(page);
        await page.getByRole('button', { name: /1 item\(s\)/ }).click();
        await page.locator('#cart').getByText('Checkout').click();
        await expect(page).toHaveURL(/route=checkout\/cart/);
    });
    

    test('Item in cart dropdown is clickable', async ({ page }) => {
        await addToCart(page);
        await page.getByRole('button', { name: /1 item\(s\)/ }).click();
        await page.locator('#cart').getByText('iMac').click();
        const itmeTitle = page.locator('.col-sm-4').nth(1).locator('h1')
        await expect(itmeTitle).toHaveText('iMac');
    });


    test('Adding same item twice functions currectly', async ({ page }) => {
        await addToCart(page, 'mac', 0, 2); // Add 2 iMacs
        const text = await page.getByRole('button', { name: /2 item\(s\)/ }).innerText();
        expect(text).toContain('2 item(s)');

        // Verify the cart dropdown shows the correct item and quantity
        await page.getByRole('button', { name: /2 item\(s\)/ }).click();
        const itemTitle = await page.locator('.caption').first().locator('h4').textContent() || '';
        await expect(page.locator('#cart').getByText(itemTitle)).toBeVisible();
        await expect(page.locator('#cart').getByText('x2')).toBeVisible();

        // Verify the price is calculated correct
        const totalnPrice = await page.getByRole('cell', { name: '$' }).first().textContent() || '';
        const itemPrice = await page.locator('.price').first().textContent() || '';
        await expect(parseFloat(totalnPrice.replace('$', '')) / 2).toBeCloseTo(parseFloat(itemPrice.replace('$', '')), 2);
    });





});