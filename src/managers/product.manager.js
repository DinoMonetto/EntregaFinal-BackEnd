import Product from '../models/product.js';

class ProductManager {
  async getProducts(query = {}, options = {}) {
    try {
      const products = await Product.find(query, null, options);
      return products;
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      return [];
    }
  }

  async addProduct(product) {
    try {
      const newProduct = new Product(product);
      await newProduct.save();
    } catch (error) {
      console.error('Error al agregar producto:', error);
    }
  }

  async deleteProduct(productId) {
    try {
      await Product.findByIdAndDelete(productId);
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  }
}

export default ProductManager;
