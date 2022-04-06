const express = require('express');

//controllers
const { create, list } = require('../controllers/product');

//middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

const router = express.Router();

//routes
router.post('/product', authCheck, adminCheck, create);
router.get('/product', list);

module.exports = router;
