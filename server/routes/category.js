const express = require('express');

//controllers
const {
  create,
  read,
  update,
  remove,
  list,
  readById,
} = require('../controllers/category');

//middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

const router = express.Router();

//routes

//create category
router.post('/category', authCheck, adminCheck, create);

//get all categories
router.get('/category/all', list);

//get single category by id
router.get('/category/single/:id', readById);

//update a category
router.put('/category/:slug', authCheck, adminCheck, update);

//delete a category
router.post('/category/:slug', authCheck, adminCheck, remove);

module.exports = router;
