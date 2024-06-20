import express from 'express';
import Cart from '../models/cart.model.js';
import Product from '../models/product.model.js';
import { addProductToCart, deleteProductFromCart, updateCart, updateProductQuantity, deleteAllProductsFromCart, getCartWithProducts } from '../controllers/cartController.js';

const router = express.Router();

// Añadir producto al carrito
router.post('/:cid/products/:pid', addProductToCart);

// Eliminar producto del carrito
router.delete('/:cid/products/:pid', deleteProductFromCart);

// Actualizar carrito con un arreglo de productos
router.put('/:cid', updateCart);

// Actualizar cantidad de un producto en el carrito
router.put('/:cid/products/:pid', updateProductQuantity);

// Eliminar todos los productos del carrito
router.delete('/:cid', deleteAllProductsFromCart);

// Obtener carrito con productos completos (populate)
router.get('/:cid', getCartWithProducts);

// Listado de carritos
router.get('/', (req, res) => {
  res.send('Listado de carritos');
});

export default router;
