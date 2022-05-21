const express = require('express');

//controllers
const { add, remove , getCart } = require('../controllers/cart');

//middlewares
const { authCheck } = require('../middlewares/auth');

const router = express.Router();

//ROUTES

//get user cart
router.get('/cart' , authCheck , getCart)

//add product to cart
router.put('/cart/add/:productId', authCheck, add);

//remove product from cart
router.put('/cart/remove/:productId', authCheck, remove);

module.exports = router;
