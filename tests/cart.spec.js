const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager');

test.describe('Cart Page Visual Regression', () => {
  let poManager;

  test.beforeEach(async ({ page }) => {
    poManager = new POManager(page);
  });

  test('empty cart snapshot', async ({ page }) => {
    await poManager.getCartPage().navigate();
    await expect(page).toHaveScreenshot('cart-empty.png', { fullPage: true });
  });

  test('cart with one product snapshot', async ({ page }) => {
    const productsPage = poManager.getProductsPage();
    const cartPage = poManager.getCartPage();

    await productsPage.navigate();
    await productsPage.addFirstProductToCart();

    await page.getByRole('link', { name: 'View Cart' }).click();
    await expect(page).toHaveScreenshot('cart-one-product.png', { fullPage: true });

    const count = await cartPage.getCartItemCount();
    expect(count).toBeGreaterThan(0);
  });
});
