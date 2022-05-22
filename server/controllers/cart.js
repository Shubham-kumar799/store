const User = require('../models/user');
const Cart = require('../models/cart');
const Product = require('../models/product');
const product = require('../models/product');

const add = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });

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
    const user = await User.findOne({ email: req.user.email });
    const cart = await Cart.findOne({ owner: user._id }).populate({
      path: 'products',
      populate: {
        path: 'product',
        model: 'Product',
      },
    });

    const productToDelete = cart.products.find(
      p => p.product._id == req.params.productId
    );

    await Cart.findOneAndUpdate(
      { owner: user._id },
      {
        $pull: { products: { product: req.params.productId } },
        cartTotal:
          cart.cartTotal -
          productToDelete.count * productToDelete.product.price,
      },
      { new: true }
    );
    await User.findByIdAndUpdate(user._id, {
      cartCount: user.cartCount - 1,
    });

    res.status(201).json({
      success: true,
    });
  } catch (error) {
    console.log('error in remove from cart', error);
    res.status(400).json({
      success: false,
      payload: 'Some Error Occured. Try Again',
    });
  }
};

const getCart = async (req, res) => {
  try {
    const userCart = await Cart.findOne({
      owner: req.params.userId,
    }).populate({
      path: 'products',
      populate: {
        path: 'product',
        model: 'Product',
      },
    });

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

const increment = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    const product = await Product.findById(req.params.productId);
    const cart = await Cart.findOneAndUpdate(
      { owner: user._id, 'products.product': req.params.productId },
      {
        $inc: { 'products.$.count': 1 },
      },
      { new: true }
    );

    await Cart.findOneAndUpdate(
      { owner: user._id },
      {
        cartTotal: cart.cartTotal + product.price,
      },
      { new: true }
    );

    res.status(201).json({
      success: true,
    });
  } catch (error) {
    console.log('error in increment cart product', error);
    res.status(400).json({
      success: false,
      payload: 'Some error occurd. Try Again',
    });
  }
};

const decrement = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    const product = await Product.findById(req.params.productId);
    const cart = await Cart.findOneAndUpdate(
      { owner: user._id, 'products.product': req.params.productId },
      {
        $inc: { 'products.$.count': -1 },
      },
      { new: true }
    );

    await Cart.findOneAndUpdate(
      { owner: user._id },
      {
        cartTotal: cart.cartTotal - product.price,
      },
      { new: true }
    );
    res.status(201).json({
      success: true,
    });
  } catch (error) {
    console.log('error in decrement cart product', error);
    res.status(400).json({
      success: false,
    });
  }
};

module.exports = { add, remove, getCart, increment, decrement };
