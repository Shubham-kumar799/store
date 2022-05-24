const Coupon = require('../models/coupon');

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

module.exports = {
  create,
  list,
  remove,
};
