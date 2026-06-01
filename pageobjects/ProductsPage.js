class ProductsPage {
  constructor(page) {
    this.page = page;
    this.productsList = page.locator('.features_items');
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.productCards = page.locator('.product-image-wrapper');
    this.firstViewProduct = page.locator('.choose a').first();
  }

  async navigate() {
    await this.page.goto('/products');
  }

  async searchProduct(name) {
    await this.searchInput.fill(name);
    await this.searchButton.click();
  }

  async viewFirstProduct() {
    await this.firstViewProduct.click();
  }

  async addFirstProductToCart() {
    await this.productCards.first().hover();
    await this.productCards.first().locator('.add-to-cart').first().click();
  }
}

module.exports = { ProductsPage };
