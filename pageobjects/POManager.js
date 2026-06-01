const { HomePage } = require('./HomePage');
const { ProductsPage } = require('./ProductsPage');
const { CartPage } = require('./CartPage');

class POManager {
  constructor(page) {
    this.page = page;
    this.homePage = new HomePage(page);
    this.productsPage = new ProductsPage(page);
    this.cartPage = new CartPage(page);
  }

  getHomePage() {
    return this.homePage;
  }

  getProductsPage() {
    return this.productsPage;
  }

  getCartPage() {
    return this.cartPage;
  }
}

module.exports = { POManager };
