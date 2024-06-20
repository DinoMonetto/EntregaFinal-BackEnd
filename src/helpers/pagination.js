import Cart from '../models/cart.model.js';

// Eliminar un producto del carrito
export const deleteProductFromCart = async (req, res) => {
    const { cid, pid } = req.params;
    try {
        const cart = await Cart.findById(cid);
        cart.products.id(pid).remove();
        await cart.save();
        res.status(200).json({ status: 'success', message: 'Producto eliminado del carrito' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// Actualizar el carrito con un arreglo de productos
export const updateCart = async (req, res) => {
    const { cid } = req.params;
    const { products } = req.body;
    try {
        const cart = await Cart.findByIdAndUpdate(cid, { products }, { new: true });
        res.status(200).json({ status: 'success', payload: cart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// Actualizar la cantidad de un producto en el carrito
export const updateProductQuantity = async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    try {
        const cart = await Cart.findById(cid);
        const product = cart.products.id(pid);
        product.quantity = quantity;
        await cart.save();
        res.status(200).json({ status: 'success', payload: cart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// Eliminar todos los productos del carrito
export const deleteAllProductsFromCart = async (req, res) => {
    const { cid } = req.params;
    try {
        const cart = await Cart.findByIdAndUpdate(cid, { products: [] }, { new: true });
        res.status(200).json({ status: 'success', message: 'Todos los productos eliminados del carrito' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};
export const addProductToCart = async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;
  
      const cart = await Cart.findById(cid);
  
      if (!cart) {
        return res.status(404).json({ status: 'error', message: 'Cart not found' });
      }
  
      const product = cart.items.find(item => item.productId.toString() === pid);
  
      if (product) {
        product.quantity += quantity;
      } else {
        cart.items.push({ productId: pid, quantity });
      }
  
      await cart.save();
  
      res.json({ status: 'success', message: 'Product added to cart' });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  };