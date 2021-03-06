const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const cartSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: 'Product',
        },
        count: { type: Number, default: 1 },
      },
    ],
    cartTotal: Number,
    cartTotalAfterDiscount: Number,
    owner: { type: ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cart', cartSchema);
