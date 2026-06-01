const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager');

test.describe('Products Page Visual Regression', () => {
  let poManager;

  test.beforeEach(async ({ page }) => {
    poManager = new POManager(page);
    await poManager.getProductsPage().navigate();
  });

  test('products page full snapshot', async ({ page }) => {
    await expect(page).toHaveScreenshot('products-full.png', { fullPage: true, timeout: 15000, maxDiffPixels: 100 });
  });

  test('products list snapshot', async ({ page }) => {
    const productsPage = poManager.getProductsPage();
    await expect(productsPage.productsList).toHaveScreenshot('products-list.png');
  });

  test('products search results snapshot', async ({ page }) => {
    const productsPage = poManager.getProductsPage();
    await productsPage.searchProduct('top');
    await expect(productsPage.productsList).toHaveScreenshot('products-search-top.png');
  });
});
