const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager');

test.describe('Homepage Visual Regression', () => {
  let poManager;

  test.beforeEach(async ({ page }) => {
    poManager = new POManager(page);
    await poManager.getHomePage().navigate();
  });

  test('homepage header snapshot', async ({ page }) => {
    const homePage = poManager.getHomePage();
    await expect(homePage.navBar).toHaveScreenshot('homepage-header.png', { maxDiffPixels: 200 });
  });
});
