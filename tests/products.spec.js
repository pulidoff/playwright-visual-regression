const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager');

test.describe('Products Page Visual Regression', () => {
  let poManager;

  test.beforeEach(async ({ page }) => {
    poManager = new POManager(page);
    await poManager.getProductsPage().navigate();
  });

  test('products search results snapshot', async ({ page }) => {
    const productsPage = poManager.getProductsPage();
    await productsPage.searchProduct('top');
    await productsPage.productsList.waitFor({ state: 'visible' });
    await expect(productsPage.productsList).toHaveScreenshot('products-search-top.png', { maxDiffPixels: 200 });
  });
});
