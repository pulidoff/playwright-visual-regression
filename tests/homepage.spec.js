const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager');

test.describe('Homepage Visual Regression', () => {
  let poManager;

  test.beforeEach(async ({ page }) => {
    poManager = new POManager(page);
    await poManager.getHomePage().navigate();
  });

  test('homepage full page snapshot', async ({ page }) => {
    await expect(page).toHaveScreenshot('homepage-full.png', { fullPage: true });
  });

  test('homepage header snapshot', async ({ page }) => {
    const homePage = poManager.getHomePage();
    await expect(homePage.navBar).toHaveScreenshot('homepage-header.png');
  });

  test('homepage slider snapshot', async ({ page }) => {
    const homePage = poManager.getHomePage();
    await expect(homePage.slider).toHaveScreenshot('homepage-slider.png');
  });

  test('homepage featured items snapshot', async ({ page }) => {
    const homePage = poManager.getHomePage();
    await expect(homePage.featuredItems).toHaveScreenshot('homepage-featured-items.png');
  });
});
