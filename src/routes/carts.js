import { Router } from 'express';
import Cart from '../models/cart.model.js';
import Product from '../models/product.model.js';

const router = Router();

// Ruta para agregar un producto al carrito
router.post('/:cartId/add', async (req, res) => {
    try {
        const { cartId } = req.params;
        const { productId, quantity } = req.body;

        // Encuentra el carrito por su ID
        const cart = await Cart.findById(cartId);
        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }

        // Encuentra el producto por su ID
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        // Agrega el producto al carrito
        cart.products.push({ product: productId, quantity });
        await cart.save();

        res.json({ message: 'Producto agregado al carrito', cart });
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar producto al carrito' });
    }
});

export default router;
