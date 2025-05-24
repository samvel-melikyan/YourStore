import {test, expect} from '@playwright/test';

function generateEmail(): string {
    return `user${Date.now()}@gmail.com`;
}

function generatePhone(): string {
    const prefix = '+7';
    const number = Math.floor(100000000 + Math.random() * 900000000);
    return `${prefix}${number}`;
}

const password = 'StrongPass123!';

async function fillForm(page, firstName: string, lastName: string, email: string, phone: string, password: string) {
    await page.getByRole('textbox', { name: '* First Name' }).fill(firstName);
    await page.getByRole('textbox', { name: '* Last Name' }).fill(lastName);
    await page.getByRole('textbox', { name: '* E-Mail' }).fill(email);
    await page.getByRole('textbox', { name: '* Telephone' }).fill(phone);
    await page.getByRole('textbox', { name: '* Password', exact: true }).fill(password);
    await page.getByRole('textbox', { name: '* Password Confirm' }).fill(password);
}

test.describe('User Registration ', () => {
    test.beforeEach(async ({ page }, testInfo) => {
        if (testInfo.title !== 'Register with valid data') 
            await page.goto('?route=account/register');
    });


    // Positive: Successful registration
    test('Register with valid data', async ({ page }) => {
        await page.goto('https://tutorialsninja.com/demo/index.php?route=common/home');
        await page.getByText('My Account Register Login').click();
        await page.getByRole('link', { name: 'Register' }).click();

        await page.getByRole('textbox', { name: '* First Name' }).fill('Pablo');
        await page.getByRole('textbox', { name: '* Last Name' }).fill('Parablo');
        await page.getByRole('textbox', { name: '* E-Mail' }).fill(generateEmail());
        await page.getByRole('textbox', { name: '* Telephone' }).fill(generatePhone());
        await page.getByRole('textbox', { name: '* Password', exact: true }).fill(password);
        await page.getByRole('textbox', { name: '* Password Confirm' }).fill(password);
        await page.getByRole('radio', { name: 'No' }).check();
        await page.getByRole('checkbox').check();
        await page.getByRole('button', { name: 'Continue' }).click();
        await expect(page.getByRole('heading', { name: 'Your Account Has Been Created!' })).toBeVisible();
    });

    // Negative: Required fields empty
    test('Should show error when required fields are empty', async ({ page }) => {
        await page.getByRole('checkbox').check();
        await page.getByRole('button', { name: 'Continue' }).click();
        await expect(await page.locator('.text-danger').count()).toBeGreaterThan(0);
    });


    
    // Negative: Invalid email format
    test.describe('Invalid email format', () => {
        const invalidEmails = [
            '', // Empty string
            'plainaddress',
            '@missingusername.com',
            'username@.com',
            'username@domain..com',
            'username@domain,com',
            'username@domain.c',
        ]
        for (let email of invalidEmails){
            test(`should show error using email: ${email}`, async ({ page }) => {
                const url = await page.url();
                await fillForm(page, 'Lena', 'Joy', email, generatePhone(), password);
                await page.getByRole('checkbox').check();
                await page.getByRole('button', { name: 'Continue' }).click();
                await expect(page.url()).toBe(url);
                await expect(page.getByRole('heading', { name: 'Your Account Has Been Created!' })).not.toBeVisible();
            });
        }
    });


    // Negative: Passwords do not match
    test('Should show error for mismatched passwords', async ({ page }) => {
        await page.getByRole('textbox', { name: '* First Name' }).fill('Pablo');
        await page.getByRole('textbox', { name: '* Last Name' }).fill('Parablo');
        await page.getByRole('textbox', { name: '* E-Mail' }).fill(generateEmail());
        await page.getByRole('textbox', { name: '* Telephone' }).fill(generatePhone());
        await page.getByRole('textbox', { name: '* Password', exact: true }).fill(password);
        await page.getByRole('textbox', { name: '* Password Confirm' }).fill('WrongPassword123');
        await page.getByRole('checkbox').check();
        await page.getByRole('button', { name: 'Continue' }).click();
        await expect(await page.locator('.text-danger').count()).toBe(1);
        await expect(page.getByText('Password confirmation does not match password!')).toBeVisible();
    });


    // Negative: Telephone
    test.describe('Invalid telephone format', () => {
        const invalidPhoneNumbers = [
            '', // Empty string
            '+12345678901234567890', // Too long
            '+123-456-7890', // Contains dashes
            '+123.456.7890', // Contains dots
            '+1234567890abc', // Contains letters
            '+abc1234567', // Starts with '+' and letters
            'abc1234567', // Starts with letters
            '1234abc567', // Starts with numbers, but contains letters
            '+123456789', // Missing digits
            '1234567890', // Missing country code
        ]
        for (let phone of invalidPhoneNumbers){
            test(`should show error using phone number: ${phone}`, async ({ page }) => {
                const url = await page.url();
                await fillForm(page, 'Lena', 'Joy', generateEmail(), phone, password);
                await page.getByRole('checkbox').check();
                await page.getByRole('button', { name: 'Continue' }).click();
                await expect(page.url()).toBe(url);
                await expect(page.getByRole('heading', { name: 'Your Account Has Been Created!' })).not.toBeVisible();
            });
        }
    });


    // Negative: Privacy policy not checked
    test('Should block submission if privacy policy not checked', async ({ page }) => {
        await fillForm(page, 'Chris', 'Bugfounder', generateEmail(), generatePhone(), password);
        await page.getByRole('button', { name: 'Continue' }).click();
        await expect(page.url()).toContain('route=account/register');
        await expect(page.getByText('Warning: You must agree to the Privacy Policy!')).toBeVisible();
    });

});

