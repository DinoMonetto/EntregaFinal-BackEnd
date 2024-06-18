import express from 'express';
import CartManager from '../managers/cart.manager.js';

const router = express.Router();
const cartManager = new CartManager();

// Ruta para eliminar un producto del carrito
router.delete('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  try {
    await cartManager.removeProductFromCart(cid, pid);
    res.json({ status: 'success', message: 'Producto eliminado del carrito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto del carrito' });
  }
});

// Ruta para actualizar el carrito con un arreglo de productos
router.put('/:cid', async (req, res) => {
  const { cid } = req.params;
  const products = req.body.products;
  try {
    await cartManager.updateCart(cid, products);
    res.json({ status: 'success', message: 'Carrito actualizado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el carrito' });
  }
});

// Ruta para actualizar la cantidad de un producto en el carrito
router.put('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  try {
    await cartManager.updateProductQuantity(cid, pid, quantity);
    res.json({ status: 'success', message: 'Cantidad del producto actualizada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la cantidad del producto' });
  }
});

// Ruta para eliminar todos los productos del carrito
router.delete('/:cid', async (req, res) => {
  const { cid } = req.params;
  try {
    await cartManager.clearCart(cid);
    res.json({ status: 'success', message: 'Carrito limpiado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al limpiar el carrito' });
  }
});

export default router;
