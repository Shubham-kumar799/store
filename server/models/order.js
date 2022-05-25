const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema(
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
    paymentIntent: {},
    orderStatus: {
      type: String,
      default: 'Not Processed',
      enum: [
        'Not_Processed',
        'Fulfilled',
        'Processing',
        'Out_For_Delivery',
        'Cancelled',
      ],
    },
    orderedBy: {
      type: ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
