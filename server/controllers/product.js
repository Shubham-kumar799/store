const Product = require('../models/product');
const slugify = require('slugify');

const create = async (req, res) => {
  try {
    console.log('Product', req.body.product);
    req.body.slug = slugify(req.body.product.name);
    const product = await new Product(req.body.product).save();
    res.status(201).json({
      success: true,
      payload: product,
    });
  } catch (error) {
    console.log('error creating product', error);
    res.status(400).json({
      success: false,
      payload: 'Internal server error',
    });
  }
};

const list = async (_, res) => {
  try {
    const products = await Product.find();
    res.status(201).json({
      success: true,
      payload: products,
    });
  } catch (error) {
    console.log('error listing product', error);
    res.status(400).json({
      success: false,
      payload: 'Internal server error',
    });
  }
};

module.exports = {
  create,
  list,
};
