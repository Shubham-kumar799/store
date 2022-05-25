const User = require('../models/user');
const Order = require('../models/order');
const Cart = require('../models/cart');
const Product = require('../models/product');

const create = async (req, res) => {
  try {
    const paymentIntent = req.body.stripeResponse;
    const user = await User.findOne({ email: req.user.email });
    let { products } = await Cart.findOne({ owner: user._id });
    await new Order({
      products,
      paymentIntent,
      orderedBy: user._id,
    }).save();

    //YOY HAVEN'T TESTED THIS
    //decrement quantity of products in database
    const blukOption = products.map(item => {
      return {
        updateOne: {
          filter: { _id: item.product._id },
          update: {
            $inc: { quantity: -item.count, sold: item.count },
          },
        },
      };
    });

    await Product.bulkWrite(blukOption);

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log('error creating order', error);
    res.status(400).json({
      success: false,
    });
  }
};

const read = async (req, res) => {
  try {
    const orders = await Order.find({ orderedBy: req.params.userId }).populate(
      'products.product'
    );

    res.status(200).json({
      success: true,
      payload: orders,
    });
  } catch (error) {
    console.log('error reading order', error);
    res.status(400).json({
      success: false,
    });
  }
};
const readAll = async (req, res) => {
  try {
    const orders = await Order.find({})
      .sort('-createdAt')
      .populate('products.product');
    res.status(200).json({
      success: true,
      payload: orders,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
    });
  }
};
const updateStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;
    await Order.findByIdAndUpdate(req.params.orderId, {
      orderStatus,
    });
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log('error updating status of order', error);
    res.status(400).json({
      success: false,
    });
  }
};

module.exports = { create, read, readAll, updateStatus };
