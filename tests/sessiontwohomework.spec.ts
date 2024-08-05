import { test, expect } from '@playwright/test';

test('Scenario One', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  await page.locator('[data-test="login-button"]').click();
  await page
    .locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]')
    .click();
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText(
    '1',
  );
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText(
    '2',
  );
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page.locator('[data-test="title"]')).toContainText('Your Cart');
  await expect(
    page.locator(
      '[data-test="item-1-title-link"] [data-test="inventory-item-name"]',
    ),
  ).toContainText('Sauce Labs Bolt T-Shirt');
  await expect(
    page.locator(
      '[data-test="item-0-title-link"] [data-test="inventory-item-name"]',
    ),
  ).toContainText('Sauce Labs Bike Light');
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').fill('NG');
  await page.locator('[data-test="lastName"]').fill('R');
  await page.locator('[data-test="postalCode"]').fill('3216');
  await page.locator('[data-test="continue"]').click();
  await expect(page.locator('[data-test="title"]')).toContainText(
    'Checkout: Overview',
  );
  await expect(
    page.locator(
      '[data-test="item-1-title-link"] [data-test="inventory-item-name"]',
    ),
  ).toContainText('Sauce Labs Bolt T-Shirt');
  await expect(
    page.locator(
      '[data-test="item-0-title-link"] [data-test="inventory-item-name"]',
    ),
  ).toContainText('Sauce Labs Bike Light');
  await page.locator('[data-test="finish"]').click();
  await expect(page.locator('[data-test="pony-express"]')).toBeVisible();
  await expect(page.locator('[data-test="complete-header"]')).toContainText(
    'Thank you for your order!',
  );
  await expect(page.locator('[data-test="complete-text"]')).toContainText(
    'Your order has been dispatched, and will arrive just as fast as the pony can get there!',
  );
}),
  test('Scenario Two', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page
      .locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]')
      .click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator('[data-test="title"]')).toContainText(
      'Your Cart',
    );
    await expect(
      page.locator(
        '[data-test="item-4-title-link"] [data-test="inventory-item-name"]',
      ),
    ).toContainText('Sauce Labs Backpack');
    await expect(
      page.locator(
        '[data-test="item-5-title-link"] [data-test="inventory-item-name"]',
      ),
    ).toContainText('Sauce Labs Fleece Jacket');
    await expect(
      page.locator('[data-test="remove-sauce-labs-backpack"]'),
    ).toBeVisible();
    await expect(
      page.locator('[data-test="remove-sauce-labs-fleece-jacket"]'),
    ).toBeVisible();
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    await expect(
      page.locator('[data-test="shopping-cart-badge"]'),
    ).toContainText('1');
    await page.locator('[data-test="remove-sauce-labs-fleece-jacket"]').click();
    await expect(
      page.locator('[data-test="shopping-cart-badge"]'),
    ).toBeHidden();
  }),
  test('Scenario Three', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await expect(page.locator('[data-test="cancel"]')).toContainText('Cancel');
    await page.locator('[data-test="cancel"]').click();
  }),
  test('Scenario Four', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="cancel"]').click();
    await page.locator('[data-test="continue-shopping"]').click();
    await page
      .locator(
        '[data-test="add-to-cart-test\\.allthethings\\(\\)-t-shirt-\\(red\\)"]',
      )
      .click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(
      page.locator('[data-test="shopping-cart-badge"]'),
    ).toContainText('2');
  }),
  test('Scenario Five', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill('NG');
    await page.locator('[data-test="lastName"]').fill('R');
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('[data-test="error"]')).toContainText(
      'Error: Postal Code is required',
    );
    await page.locator('[data-test="error-button"]').click();
    await expect(page.locator('[data-test="error"]')).toBeHidden();
  });
