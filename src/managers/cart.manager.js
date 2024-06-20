import Cart from '../models/cart.model.js';
import Product from '../models/product.model.js'; 

class CartManager {
  async getCarts() {
    try {
      const carts = await Cart.find().populate('items.productId');
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
            return newCart;
        } catch (error) {
            console.error('Error al agregar carrito:', error);
        }
    }

    async updateCart(cartId, items) {
        try {
            await Cart.findByIdAndUpdate(cartId, { items });
        } catch (error) {
            console.error('Error al actualizar carrito:', error);
        }
    }

    async deleteCart(cartId) {
        try {
            await Cart.findByIdAndDelete(cartId);
        } catch (error) {
            console.error('Error al eliminar carrito:', error);
        }
    }

    async deleteProductFromCart(cartId, productId) {
        try {
          const cart = await Cart.findById(cartId);
          const productIndex = cart.items.findIndex(item => item.productId.toString() === productId);
          if (productIndex !== -1) {
            const product = await Product.findById(productId); // Si es necesario, ajusta esto según tu modelo de producto
            cart.total -= cart.items[productIndex].quantity * product.price; // Ajusta el cálculo según tu modelo de producto
            cart.items.splice(productIndex, 1);
            await cart.save();
          }
        } catch (error) {
          console.error('Error al eliminar producto del carrito:', error);
        }
      }
    async updateProductQuantity(cartId, productId, quantity) {
        try {
            const cart = await Cart.findById(cartId);
            const product = cart.items.find(item => item.productId.toString() === productId);
            if (product) {
                const productDetails = await Product.findById(productId);
                cart.total -= product.quantity * productDetails.price;
                product.quantity = quantity;
                cart.total += quantity * productDetails.price;
                await cart.save();
            }
        } catch (error) {
            console.error('Error al actualizar cantidad de producto en el carrito:', error);
        }
    }
}

export default CartManager;
