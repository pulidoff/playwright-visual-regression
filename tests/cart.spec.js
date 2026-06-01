const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager');

test.describe('Cart Page Visual Regression', () => {
  let poManager;

  test.beforeEach(async ({ page }) => {
    poManager = new POManager(page);
  });

  test('empty cart snapshot', async ({ page }) => {
    const cartPage = poManager.getCartPage();
    await cartPage.navigate();
    await cartPage.cartInfo.waitFor({ state: 'visible' });
    await expect(cartPage.cartInfo).toHaveScreenshot('cart-empty.png', { maxDiffPixels: 200 });
  });
});
