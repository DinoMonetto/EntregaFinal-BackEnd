import fs from 'fs/promises';
import { join } from 'path';

const productsFilePath = join(process.cwd(), 'src/data/products.json');

class ProductManager {
  async getProducts() {
    try {
      const data = await fs.readFile(productsFilePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error al leer los productos:', error);
      return [];
    }
  }

  async addProduct(product) {
    const products = await this.getProducts();
    products.push(product);
    await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2));
  }

  async deleteProduct(productId) {
    let products = await this.getProducts();
    products = products.filter(product => product.id !== productId);
    await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2));
  }
}

export default ProductManager;
