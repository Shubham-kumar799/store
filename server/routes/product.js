const express = require('express');

//controllers
const {
  create,
  list,
  remove,
  readBySlug,
  postRating,
} = require('../controllers/product');

//middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

const router = express.Router();

//routes
//create a product
router.post('/product', authCheck, adminCheck, create);

//get all products
router.get('/product', list);

//get single product by slug
router.get('/product/:slug', readBySlug);

//delete a category
router.post('/product/:id', authCheck, adminCheck, remove);

//post a rating
router.put('/product/rate/:productId', authCheck, postRating);

module.exports = router;
