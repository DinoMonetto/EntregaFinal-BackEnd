// routes/products.js
import { Router } from 'express';
import ProductManager from '../managers/product.manager.js';

const router = Router();
const productManager = new ProductManager();

router.get('/', async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.json({ status: 'success', payload: products });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const product = await productManager.addProduct(req.body);
    res.json({ status: 'success', payload: product });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await productManager.deleteProduct(req.params.id);
    res.json({ status: 'success' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

export default router;
