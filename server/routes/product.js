const express = require('express');

//controllers
const { create, list, remove } = require('../controllers/product');

//middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

const router = express.Router();

//routes
//create a product
router.post('/product', authCheck, adminCheck, create);

//get all products
router.get('/product', list);

//delete a category
router.post('/product/:id', authCheck, adminCheck, remove);

module.exports = router;
