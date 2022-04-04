const express = require('express');

//controllers
const {
  create,
  read,
  update,
  remove,
  list,
  listByParentId,
} = require('../controllers/subCategory');

//middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

const router = express.Router();

//routes
router.get('/subcategory/all', list);
router.get('/subcategory/:parentId', listByParentId);
router.post('/subcategory', authCheck, adminCheck, create);
router.put('/subcategory/:slug', authCheck, adminCheck, update);
router.post('/subcategory/:slug', authCheck, adminCheck, remove);

module.exports = router;
