const router = require('express').Router();
const Product = require('../models/Product.model');
const User = require('../models/User.model');

router.post('/product', async (req, res, next) => {
  try {
    const { title, description, subtitle, color, quantity } = req.body;
    const newProduct = await Product.create({
      title,
      subtitle,
      description,
      color,
      quantity,
      reviews: [],
    });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
  }
});

//GET all products
router.get('/product', async (req, res, next) => {
  try {
    const allProducts = await Product.find();

    res.status(200).json(allProducts);
  } catch (error) {
    console.error(error);
  }
});

//Search product
router.get('/product/search', async (req, res, next) => {
  try {
    const searchProduct = await Product.find({
      ...req.query,
    });

    res.status(200).json(searchProduct);
  } catch (error) {
    console.error(error);
  }
});

//Get by id (single product)
router.get('/product/:productId', async (req, res, next) => {
  try {
    const { productId } = req.params;
    const singleProduct = await Product.findById(productId).populate('reviews');
    res.status(200).json(singleProduct);
  } catch (error) {
    console.error(error);
  }
});

//DELETE product
router.delete('/product/:productId', async (req, res, next) => {
  try {
    const { productId } = req.params;
    await Product.findOneAndDelete(productId);
    res.status(204).send();
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
