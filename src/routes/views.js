import { Router } from 'express';
import { getProductView, getCartView } from '../controllers/viewController.js';

const router = Router();

router.get('/products', getProductView);
router.get('/carts/:cid', getCartView);

export default router;
