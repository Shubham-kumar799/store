const User = require('../models/user');
const Order = require('../models/order');
const Cart = require('../models/cart');

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

// const create = async (req, res) => {
//   try {

//   } catch (error) {
//     res.status(400).json({
//       success: false,
//     })
//   }
// }
// const create = async (req, res) => {
//   try {

//   } catch (error) {
//     res.status(400).json({
//       success: false,
//     })
//   }
// }
// const create = async (req, res) => {
//   try {

//   } catch (error) {
//     res.status(400).json({
//       success: false,
//     })
//   }
// }

module.exports = { create };
