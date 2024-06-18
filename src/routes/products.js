import express from 'express';
import ProductManager from '../managers/product.manager.js';

const router = express.Router();
const productManager = new ProductManager();

// Ruta para obtener productos con filtros, paginación y ordenamiento
router.get('/', async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;
    
    // Convertir limit y page a números
    const limitNum = parseInt(limit);
    const pageNum = parseInt(page);

    // Obtener los productos
    const products = await productManager.getProducts();

    // Aplicar filtros
    let filteredProducts = products;
    if (query) {
      filteredProducts = products.filter(product => 
        product.category.includes(query) || product.status.includes(query)
      );
    }

    // Ordenar los productos
    if (sort) {
      filteredProducts.sort((a, b) => sort === 'asc' ? a.price - b.price : b.price - a.price);
    }

    // Paginar los productos
    const totalProducts = filteredProducts.length;
    const totalPages = Math.ceil(totalProducts / limitNum);
    const startIndex = (pageNum - 1) * limitNum;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + limitNum);

    // Responder con los productos paginados
    res.json({
      status: 'success',
      payload: paginatedProducts,
      totalPages,
      prevPage: pageNum > 1 ? pageNum - 1 : null,
      nextPage: pageNum < totalPages ? pageNum + 1 : null,
      page: pageNum,
      hasPrevPage: pageNum > 1,
      hasNextPage: pageNum < totalPages,
      prevLink: pageNum > 1 ? `/api/products?limit=${limitNum}&page=${pageNum - 1}&sort=${sort}&query=${query}` : null,
      nextLink: pageNum < totalPages ? `/api/products?limit=${limitNum}&page=${pageNum + 1}&sort=${sort}&query=${query}` : null
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

// Agrega más rutas según sea necesario

export default router;
