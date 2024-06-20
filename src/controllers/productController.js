import Product from '../models/product.model.js';

export const getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, ...query } = req.query;
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10)
    };
    const products = await Product.paginate(query, options);
    res.status(200).json({ status: 'success', payload: products });
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).json({ status: 'error', message: 'Error al obtener los productos' });
  }
};
export const addProduct = async (req, res) => {
    try {
      const newProduct = new Product(req.body);
      await newProduct.save();
      res.status(201).json({ status: 'success', payload: newProduct });
    } catch (error) {
      console.error('Error al agregar producto:', error);
      res.status(500).json({ status: 'error', message: 'Error al agregar producto' });
    }
  };
  