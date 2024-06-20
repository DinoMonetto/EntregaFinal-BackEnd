import Product from '../models/product.model.js';
import Cart from '../models/cart.js';

export const getProductView = async (req, res) => {
    try {
        const products = await Product.find({});
        res.render('home', { products });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const getCartView = async (req, res) => {
    const { cid } = req.params;
    try {
        const cart = await Cart.findById(cid).populate('products.product');
        res.render('cart', { cart });
    } catch (error) {
        res.status(500).send(error.message);
    }
};
