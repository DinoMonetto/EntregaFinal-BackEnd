// managers/product.manager.js
import Product from '../models/product.model.js';

class ProductManager {
  async getProducts() {
    try {
      return await Product.find({});
    } catch (error) {
      console.error('Error getting products:', error);
      throw error;
    }
  }

  async addProduct(product) {
    try {
      const newProduct = new Product(product);
      await newProduct.save();
      return newProduct;
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  }

  async deleteProduct(productId) {
    try {
      return await Product.findByIdAndDelete(productId);
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }
  async countProducts(query) {
    try {
      return await Product.countDocuments(query);
    } catch (error) {
      console.error('Error counting products:', error);
      throw error;
    }
  }
}


export default ProductManager;
