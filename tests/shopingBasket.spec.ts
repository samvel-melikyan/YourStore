import { test, expect } from '@playwright/test'





test.describe('A full testing of the shopping basket', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('');
    });

    // Helper to add a product to the cart
    async function addToCart(page, keyword = 'mac', index = 0) {
        await page.locator('.form-control.input-lg').fill(keyword);
        await page.getByRole('button', { name: '' }).click();
        await page.getByRole('button', { name: /Add to Cart/ }).nth(index).click();
        await page.waitForTimeout(500); // slight delay for cart update
    }
    
    // 1️⃣ Cart button changes accordingly
    test('Cart button updates after adding item', async ({ page }) => {
        await addToCart(page);
        await expect(page.getByRole('button', { name: /1 item\(s\)/ })).toBeVisible();
    });
    
    // 2️⃣ Cart dropdown shows correct item
    test('Cart dropdown shows correct added item', async ({ page }) => {
        await addToCart(page);
        await page.getByRole('button', { name: /1 item\(s\)/ }).click();
        await expect(page.locator('#cart').getByText('iMac')).toBeVisible();
    });
    
    // 3️⃣ Delete item from cart dropdown
    test('Delete item from cart', async ({ page }) => {
        await addToCart(page);
        await page.getByRole('button', { name: /1 item\(s\)/ }).click();
        await page.getByRole('button', { name: '' }).click();
        await page.getByRole('button', { name: /0 item\(s\)/ }).click();
        await expect(page.locator('#cart')).toContainText('Your shopping cart is empty!');
    });
    
    // 4️⃣ Add multiple items and check names
    test('Add multiple items and verify names', async ({ page }) => {
        await addToCart(page, 'imac');
        await addToCart(page, 'macbook');
        await page.getByRole('button', { name: /2 item\(s\)/ }).click();
        await expect(page.locator('#cart').getByText('iMac')).toBeVisible();
        await expect(page.locator('#cart').getByText('MacBook')).toBeVisible();
    });
    
    // 5️⃣ Amount of items is correct
    test('Correct number of items in cart', async ({ page }) => {
        await addToCart(page, 'imac');
        await addToCart(page, 'macbook');
        const text = await page.getByRole('button', { name: /2 item\(s\)/ }).innerText();
        expect(text).toContain('2 item(s)');
    });
    
    // 6️⃣ Check calculation (assumes total = subtotal)
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
    
    // 7️⃣ View Cart link works
    test('View Cart link redirects correctly', async ({ page }) => {
        await addToCart(page);
        await page.getByRole('button', { name: /1 item\(s\)/ }).click();
        await page.locator('#cart').getByText('View Cart').click();
        await expect(page).toHaveURL(/route=checkout\/cart/);
    });
    
    // 8️⃣ Checkout link works
    test('Checkout link redirects correctly', async ({ page }) => {
        await addToCart(page);
        await page.getByRole('button', { name: /1 item\(s\)/ }).click();
        await page.locator('#cart').getByText('Checkout').click();
        await expect(page).toHaveURL(/route=checkout\/cart/);
    });
    
    // 9️⃣ Cart item is clickable
    test('Item in cart dropdown is clickable', async ({ page }) => {
        await addToCart(page);
        await page.getByRole('button', { name: /1 item\(s\)/ }).click();
        await page.locator('#cart').getByText('iMac').click();
        const itmeTitle = page.locator('.col-sm-4').nth(1).locator('h1')
        await expect(itmeTitle).toHaveText('iMac');
    });




});