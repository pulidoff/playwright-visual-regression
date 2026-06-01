class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('#cart_info_table tbody tr');
    this.emptyCartMessage = page.locator('#empty_cart');
    this.proceedToCheckoutBtn = page.getByText('Proceed To Checkout');
  }

  async navigate() {
    await this.page.goto('/view_cart');
  }

  async getCartItemCount() {
    return this.cartItems.count();
  }

  async proceedToCheckout() {
    await this.proceedToCheckoutBtn.click();
  }
}

module.exports = { CartPage };
