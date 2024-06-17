import { Router } from 'express';
import CartManager from '../managers/cart.manager.js';

const router = Router();
const cartManager = new CartManager('./src/data/carts.json');

router.get('/', async (req, res) => {
    const carts = await cartManager.getCarts();
    res.json(carts);
});

router.post('/', async (req, res) => {
    const cart = req.body;
    await cartManager.addCart(cart);
    res.status(201).json({ message: 'Carrito agregado' });
});

router.delete('/:id', async (req, res) => {
    const cartId = req.params.id;
    await cartManager.deleteCart(cartId);
    res.status(200).json({ message: 'Carrito eliminado' });
});

export default router;
