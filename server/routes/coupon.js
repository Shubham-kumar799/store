const express = require('express');

//controllers
const {
  create,
  remove,
  list,
  applyCouponToUserCart,
} = require('../controllers/coupon');

//middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

const router = express.Router();

router.post('/coupon', authCheck, adminCheck, create);
router.get('/coupons', list);
router.delete('/coupon/:couponId', authCheck, adminCheck, remove);
router.post('/coupon/apply', authCheck, applyCouponToUserCart);

module.exports = router;
