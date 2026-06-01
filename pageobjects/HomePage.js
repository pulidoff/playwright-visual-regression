class HomePage {
  constructor(page) {
    this.page = page;
    this.logo = page.locator('#header .logo');
    this.navBar = page.locator('#header .nav');
    this.productsLink = page.getByRole('link', { name: 'Products' });
    this.cartLink = page.getByRole('link', { name: 'Cart' });
    this.slider = page.locator('#slider');
    this.featuredItems = page.locator('.features_items');
  }

  async navigate() {
    await this.page.goto('/');
  }

  async goToProducts() {
    await this.productsLink.click();
  }

  async goToCart() {
    await this.cartLink.click();
  }
}

module.exports = { HomePage };
