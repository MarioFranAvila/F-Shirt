class CartUI {
    constructor() {
        if (!CartUI.instance) {
            CartUI.instance = this;
        }
        return CartUI.instance;
    }

    updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('carrito')) || [];
        const cartCountElement = document.getElementById('cart-count');

        if (cart.length > 0) {
            cartCountElement.textContent = cart.length;
            cartCountElement.style.display = 'block';
        } else {
            cartCountElement.style.display = 'none';
        }
    }
}

// Crear una instancia única de CartUI
const cartUI = new CartUI();
Object.freeze(cartUI); // Para evitar modificaciones a la instancia


document.addEventListener('DOMContentLoaded', function() {
    cartUI.updateCartCount();
});