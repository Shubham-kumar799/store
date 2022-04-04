const SubCategory = require('../models/subCategory');
const slugify = require('slugify');
const mongoose = require('mongoose');

const create = async (req, res) => {
  try {
    const { name, parent } = req.body;
    const subCategory = await new SubCategory({
      name,
      slug: slugify(name).toLowerCase(),
      parent: mongoose.Types.ObjectId(parent),
    }).save();
    res.status(201).json({
      success: true,
      payload: subCategory,
    });
  } catch (error) {
    console.log('error in creat subCategory', error);
    res.status(400).json({
      success: false,
      error: 'Internal Server Error',
    });
  }
};

const list = async (_, res) => {
  try {
    const subCategories = await SubCategory.find();
    res.status(200).json({
      success: true,
      payload: subCategories,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: 'Internal Server Error',
    });
  }
};

const listByParentId = async (req, res) => {
  try {
    const { parentId } = req.params;
    console.log('parentId', parentId);
    const subCategories = await SubCategory.find({ parent: parentId });
    res.status(200).json({
      success: true,
      payload: subCategories,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: 'Internal Server Error',
    });
  }
};

const read = async (req, res) => {
  try {
    const { slug } = req.params;

    const subCategory = await SubCategory.find({ slug });
    res.status(200).json({
      success: true,
      payload: subCategory,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: 'Internal Server Error',
    });
  }
};

const update = async (req, res) => {
  try {
    const { slug } = req.params;
    const { name, parent } = req.body;
    const subCategory = await SubCategory.findOneAndUpdate(
      { slug },
      { name, slug: slugify(name), parent },
      { new: true }
    );
    res.status(200).json({
      success: true,
      payload: subCategory,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: 'Internal Server Error',
    });
  }
};

const remove = async (req, res) => {
  try {
    const { slug } = req.params;

    const subCategory = await SubCategory.findOneAndDelete({ slug });
    res.status(200).json({
      success: true,
      payload: subCategory,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: 'Internal Server Error',
    });
  }
};

module.exports = {
  create,
  update,
  list,
  remove,
  read,
  listByParentId,
};
