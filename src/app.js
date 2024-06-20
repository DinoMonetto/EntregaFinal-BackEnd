import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import exphbs from 'express-handlebars';
import mongoose from 'mongoose';
import productRouter from './routes/products.js';
import cartRouter from './routes/carts.js';
import ProductManager from './managers/product.manager.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = createServer(app);
const io = new Server(server);

// Conectar a MongoDB
const mongoUri = 'mongodb+srv://dinolmonetto:123456dD.@monetto.iz9zzbq.mongodb.net/?retryWrites=true&w=majority&appName=Monetto';
mongoose.connect(mongoUri).then(() => {
  console.log('Conectado a MongoDB');
}).catch((error) => {
  console.error('Error al conectar a MongoDB:', error);
});

const productManager = new ProductManager();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, 'public')));

// Configurar Handlebars
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  layoutsDir: join(__dirname, 'views', 'layouts'),
  // Opción para deshabilitar la comprobación de acceso al prototipo
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  }
}));
app.set('view engine', 'handlebars');
app.set('views', join(__dirname, 'views'));

// Rutas
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

// Página de inicio
app.get('/', async (req, res) => {
  try {
    const products = await productManager.getProducts();
    console.log('Productos obtenidos:', products); // Mensaje de depuración para verificar los productos obtenidos
    res.render('home', { products });
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).send('Error interno al obtener productos');
  }
});

// Página de productos en tiempo real
app.get('/realtimeproducts', async (req, res) => {
  const products = await productManager.getProducts();
  res.render('realTimeProducts', { products });
});

// Configurar WebSocket
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');
  productManager.getProducts().then(products => {
    socket.emit('products', products);
  });

  socket.on('addProduct', async (product) => {
    await productManager.addProduct(product);
    const products = await productManager.getProducts();
    io.emit('products', products);
  });

  socket.on('deleteProduct', async (productId) => {
    await productManager.deleteProduct(productId);
    const products = await productManager.getProducts();
    io.emit('products', products);
  });
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
