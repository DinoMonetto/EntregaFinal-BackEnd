import Cart from '../models/cart.model.js';
import Product from '../models/product.model.js';

export const addProductToCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).send('Carrito no encontrado');
    
    const product = await Product.findById(pid);
    if (!product) return res.status(404).send('Producto no encontrado');

    cart.products.push({ product: pid, quantity: 1 });
    await cart.save();
    res.status(200).send('Producto agregado al carrito');
  } catch (error) {
    console.error('Error al agregar producto al carrito:', error);
    res.status(500).send('Error interno');
  }
};

export const deleteProductFromCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).send('Carrito no encontrado');

    cart.products = cart.products.filter(p => p.product.toString() !== pid);
    await cart.save();
    res.status(200).send('Producto eliminado del carrito');
  } catch (error) {
    console.error('Error al eliminar producto del carrito:', error);
    res.status(500).send('Error interno');
  }
};

export const updateCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const { products } = req.body;

    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).send('Carrito no encontrado');

    cart.products = products;
    await cart.save();
    res.status(200).send('Carrito actualizado');
  } catch (error) {
    console.error('Error al actualizar carrito:', error);
    res.status(500).send('Error interno');
  }
};

export const updateProductQuantity = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).send('Carrito no encontrado');

    const product = cart.products.find(p => p.product.toString() === pid);
    if (product) {
      product.quantity = quantity;
      await cart.save();
      res.status(200).send('Cantidad de producto actualizada');
    } else {
      res.status(404).send('Producto no encontrado en el carrito');
    }
  } catch (error) {
    console.error('Error al actualizar cantidad de producto:', error);
    res.status(500).send('Error interno');
  }
};

export const deleteAllProductsFromCart = async (req, res) => {
  try {
    const { cid } = req.params;

    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).send('Carrito no encontrado');

    cart.products = [];
    await cart.save();
    res.status(200).send('Todos los productos eliminados del carrito');
  } catch (error) {
    console.error('Error al eliminar todos los productos del carrito:', error);
    res.status(500).send('Error interno');
  }
};

export const getCartWithProducts = async (req, res) => {
  try {
    const { cid } = req.params;

    const cart = await Cart.findById(cid).populate('products.product');
    if (!cart) return res.status(404).send('Carrito no encontrado');

    res.status(200).json(cart);
  } catch (error) {
    console.error('Error al obtener carrito con productos:', error);
    res.status(500).send('Error interno');
  }
};
