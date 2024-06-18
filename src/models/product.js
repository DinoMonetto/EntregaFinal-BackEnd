// src/models/product.model.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    stock: Number,
    category: String
});

const Product = mongoose.model('Product', productSchema);

export default Product;
