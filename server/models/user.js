const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      index: true,
    },
    role: {
      type: String,
      default: 'subscriber',
    },
    cartCount: {
      type: Number,
      default: 0,
    },
    address: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
