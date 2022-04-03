const express = require('express');

//controllers
const {
  create,
  read,
  update,
  remove,
  list,
} = require('../controllers/category');

//middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

const router = express.Router();

//routes
router.post('/category', authCheck, adminCheck, create);
router.get('/category/all', list);
router.get('/category/:slug', authCheck, adminCheck, read);
router.put('/category/:slug', authCheck, adminCheck, update);
router.post('/category/:slug', authCheck, adminCheck, remove);

module.exports = router;
