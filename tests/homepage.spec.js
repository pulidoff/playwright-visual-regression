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

  test('homepage slider snapshot', async ({ page }) => {
    const homePage = poManager.getHomePage();
    await expect(homePage.slider).toHaveScreenshot('homepage-slider.png', { maxDiffPixels: 200 });
  });

  test('homepage featured items snapshot', async ({ page }) => {
    const homePage = poManager.getHomePage();
    await expect(homePage.featuredItems).toHaveScreenshot('homepage-featured-items.png', { maxDiffPixels: 200 });
  });
});
