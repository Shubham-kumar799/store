const express = require('express');

//controllers
const {
  create,
  remove,
  list,
  listByParentId,
} = require('../controllers/subCategory');

//middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

const router = express.Router();

//routes
//get all subcategories
router.get('/subcategory/all', list);

//get all subcategories that belong to the parentId
router.get('/subcategory/:parentId', listByParentId);

//create subcategory
router.post('/subcategory', authCheck, adminCheck, create);

//delete subcategory
router.post('/subcategory/:slug', authCheck, adminCheck, remove);

module.exports = router;
