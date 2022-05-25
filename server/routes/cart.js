const express = require('express');

//controllers
const {
  add,
  remove,
  getCart,
  increment,
  decrement,
  deleteCart,
} = require('../controllers/cart');

//middlewares
const { authCheck } = require('../middlewares/auth');

const router = express.Router();

//ROUTES

//get user cart
router.get('/cart/:userId', getCart);

//delete user cart
router.delete('/cart', authCheck, deleteCart);

//add product to cart
router.put('/cart/add/:productId', authCheck, add);

//remove product from cart
router.put('/cart/remove/:productId', authCheck, remove);

//increment product count in the cart
router.put('/cart/increment/:productId', authCheck, increment);

//decrement product count in the cart
router.put('/cart/decrement/:productId', authCheck, decrement);

module.exports = router;
