const User = require('../models/user');
const Cart = require('../models/cart');
const Product = require('../models/product');
const Coupon = require('../models/coupon');
const stripe = require('stripe')(process.env.STRIPE_SECRET);

const createPaymentIntent = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    const cart = await Cart.findOne({ owner: user._id });
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.couponApplied
        ? cart.cartTotalAfterDiscount * 100
        : cart.cartTotal * 100,
      currency: 'inr',
    });
    res.status(200).json({
      success: true,
      payload: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log('error creating payment intent', error);
    res.status(400).json({
      success: false,
    });
  }
};

module.exports = { createPaymentIntent };
