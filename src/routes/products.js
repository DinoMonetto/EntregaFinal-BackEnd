import { Router } from 'express';
import ProductManager from '../managers/product.manager.js';

const router = Router();
const productManager = new ProductManager('./src/data/products.json');

router.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    res.json(products);
});

router.post('/', async (req, res) => {
    const product = req.body;
    await productManager.addProduct(product);
    res.status(201).json({ message: 'Producto agregado' });
});

router.delete('/:id', async (req, res) => {
    const productId = req.params.id;
    await productManager.deleteProduct(productId);
    res.status(200).json({ message: 'Producto eliminado' });
});

export default router;
