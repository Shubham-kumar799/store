const Coupon = require('../models/coupon');
const User = require('../models/user');
const Cart = require('../models/cart');

const create = async (req, res) => {
  try {
    const { name, expiryDate, discount } = req.body;
    const coupon = await new Coupon({ name, expiryDate, discount }).save();
    res.status(201).json({
      success: true,
      payload: coupon,
    });
  } catch (error) {
    console.log('error creating coupon', error);
    res.status(400).json({
      success: false,
    });
  }
};

const remove = async (req, res) => {
  try {
    await Coupon.findByIdAndDelete(req.params.couponId);
    res.status(201).json({
      success: true,
    });
  } catch (error) {
    console.log('error removing coupon', error);
    res.status(400).json({
      success: false,
    });
  }
};

const list = async (req, res) => {
  try {
    const coupons = await Coupon.find({}).sort({ createdAt: -1 });
    res.status(201).json({
      success: true,
      payload: coupons,
    });
  } catch (error) {
    console.log('error listing coupons', error);
    res.status(400).json({
      success: false,
    });
  }
};

const applyCouponToUserCart = async (req, res) => {
  try {
    const coupon = await Coupon.findOne({
      name: req.body.coupon.toUpperCase(),
    });

    if (!coupon) {
      return res.status(400).json({
        success: true,
        payload: 'Invalid coupon',
      });
    }
    const user = await User.findOne({ email: req.user.email });
    const cart = await Cart.findOne({ owner: user._id }).populate(
      'products.product',
      '_id title price'
    );

    const cartTotalAfterDiscount = (
      (cart.cartTotal * (100 - coupon.discount)) /
      100
    ).toFixed(2);
    await Cart.findOneAndUpdate(
      { owner: user._id },
      {
        cartTotalAfterDiscount,
      },
      { new: true }
    );

    res.status(201).json({
      success: true,
      payload: {
        discountedPrice: cartTotalAfterDiscount,
        originalPrice: cart.cartTotal,
      },
    });
  } catch (error) {
    console.log('error in apply coupon to user cart', error);
    res.status(400).json({
      success: false,
      payload: 'Error applying coupon',
    });
  }
};

module.exports = {
  create,
  list,
  remove,
  applyCouponToUserCart,
};
