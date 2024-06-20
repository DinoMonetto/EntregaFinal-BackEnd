import Cart from '../models/cart.model.js';

class CartManager {
    async getCarts() {
    try {
        const carts = await Cart.find().populate('products.productId');
        return carts;
    } catch (error) {
        console.error('Error al obtener los carritos:', error);
        return [];
    }
    }

    async addCart(cart) {
    try {
        const newCart = new Cart(cart);
        await newCart.save();
    } catch (error) {
        console.error('Error al agregar carrito:', error);
    }
    }

    async updateCart(cartId, products) {
    try {
        await Cart.findByIdAndUpdate(cartId, { products });
    } catch (error) {
        console.error('Error al actualizar:', error);
    }
    }

    async deleteCart(cartId) {
    try {
        await Cart.findByIdAndDelete(cartId);
    } catch (error) {
        console.error('Error al eliminar:', error);
    }
    }

    async deleteProductFromCart(cartId, productId) {
    try {
        const cart = await Cart.findById(cartId);
        cart.products = cart.products.filter(product => product.productId.toString() !== productId);
        await cart.save();
    } catch (error) {
        console.error('Error al eliminar producto:', error);
    }
    }

    async updateProductQuantity(cartId, productId, quantity) {
    try {
        const cart = await Cart.findById(cartId);
        const product = cart.products.find(product => product.productId.toString() === productId);
        if (product) {
        product.quantity = quantity;
        await cart.save();
        }
    } catch (error) {
        console.error('Error al actualizar cantidad:', error);
    }
    }
}

export default CartManager;
