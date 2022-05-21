const User = require('../models/user');
const Cart = require('../models/cart');
const Product = require('../models/product');

const add = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    console.log('productId', req.params.productId);
    const product = await Product.findById(req.params.productId);
    const cartExists = await Cart.findOne({ owner: user._id });
    let userCart;
    if (cartExists) {
      const productExists = cartExists.products.find(
        p => p.product == req.params.productId
      );
      if (productExists) {
        return res.status(200).json({
          success: true,
          payload: 'Item already in cart',
        });
      }

      await Cart.findOneAndUpdate(
        { owner: user._id },
        {
          $addToSet: { products: { product: product._id, count: 1 } },
          $set: { cartTotal: cartExists.cartTotal + product.price },
        },
        { new: true }
      );
    } else {
      userCart = await new Cart({
        owner: user._id,
        cartTotal: product.price,
        products: [
          {
            product: product._id,
            count: 1,
          },
        ],
      }).save();
    }
    await User.findOneAndUpdate(
      { email: req.user.email },
      {
        $set: { cartCount: user.cartCount + 1 },
      }
    );
    res.status(200).json({
      success: true,
      payload: 'Item added to cart',
    });
  } catch (error) {
    console.log('error in add product', error);
    res.status(400).json({
      success: false,
      error: 'Some Error Occured. Try Again.',
    });
  }
};

const remove = async (req, res) => {
  try {
  } catch (error) {}
};

const getCart = async (_, res) => {
  try {
    const userCart = await Cart.findOne({ owner: user._id });
    res.status(200).json({
      success: true,
      payload: userCart,
    });
  } catch (error) {
    console.log('error in getCart', error);
    res.status(400).json({
      success: false,
      error: 'Some Error Occured.',
    });
  }
};

module.exports = { add, remove, getCart };
