import { test, expect } from '@playwright/test';
test.describe('Day One Scenarios', () => {
  test('Checkout Two Items', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveTitle(/Swag Labs/);
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page
      .locator('[data-test="add-to-cart-sauce-labs-bike-light"]')
      .click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill('NG');
    await page.locator('[data-test="lastName"]').fill('R');
    await page.locator('[data-test="postalCode"]').fill('3216');
    await page.locator('[data-test="continue"]').click();
    await page.locator('[data-test="finish"]').click();
  });

  test('Remove Items for Checkout', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await page
      .locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]')
      .click();
    await page
      .locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]')
      .click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill('NG');
    await page.locator('[data-test="lastName"]').fill('R');
    await page.locator('[data-test="postalCode"]').fill('3216');
    await expect(page.getByRole('button', { name: 'Continue' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
    await page.locator('[data-test="continue"]').click();
    await page.locator('[data-test="cancel"]').click();
    await page.locator('[data-test="remove-sauce-labs-bolt-t-shirt"]').click();
    await page.locator('[data-test="remove-sauce-labs-fleece-jacket"]').click();
  });

  test('Cancel the Checkout', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page
      .locator(
        '[data-test="add-to-cart-test\\.allthethings\\(\\)-t-shirt-\\(red\\)"]',
      )
      .click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    await expect(
      page.getByText('Test.allTheThings() T-Shirt (Red)'),
    ).toBeVisible();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill('NG');
    await page.locator('[data-test="lastName"]').fill('R');
    await page.locator('[data-test="postalCode"]').fill('3216');
    await page.locator('[data-test="cancel"]').click();
  });

  test('Add more items during checkout', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').click();
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="password"]').press('Enter');
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page
      .locator('[data-test="add-to-cart-sauce-labs-bike-light"]')
      .click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(
      page.getByRole('button', { name: 'Continue Shopping' }),
    ).toBeVisible();
    await page.locator('[data-test="continue-shopping"]').click();
    await page
      .locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]')
      .click();

    //Learned something new here - I can write an expect to be visible assertion for a page locator. Is this a better approach or use getByRole as above?

    await expect(
      page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]'),
    ).toBeVisible();
    await page
      .locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]')
      .click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill('NG');
    await page.locator('[data-test="lastName"]').fill('R');
    await page.locator('[data-test="postalCode"]').fill('3216');
    await page.locator('[data-test="continue"]').click();
    await page.locator('[data-test="finish"]').click();
  });

  test('Cannot checkout without complete information', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="password"]').press('Enter');
    await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();
    await page
      .locator(
        '[data-test="add-to-cart-test\\.allthethings\\(\\)-t-shirt-\\(red\\)"]',
      )
      .click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="continue"]').click();
    // Added the new line of code below to check the error message
    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });
});
