import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  status: {
    type: String,
    enum: ['active', 'processing', 'completed'],
    default: 'active',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  total: {
    type: Number,
    required: true,
    default: 0,
  },
  shippingInfo: {
    address: String,
    city: String,
    postalCode: String,
    country: String,
  },
});

cartSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
