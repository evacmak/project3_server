const router = require('express').Router();
const Product = require('../models/Product.model');
const User = require('../models/User.model');

router.post('/product', async (req, res, next) => {
  try {
    const { title, description, subtitle, color } = req.body;
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

//Get by id (single product)
router.get('/product/:productId', async (req, res, next) => {
  try {
    const { productId } = req.params;
    const singleProduct = await Product.findById(productId);
    res.status(200).json(singleProduct);
  } catch (error) {
    console.error(error);
  }
});

//Get by id CART
router.get('/cart/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const userWithCart = await User.findById(userId).populate('cart');
    res.status(200).json(userWithCart);
  } catch (error) {
    console.error(error);
  }
});

router.get('/product/search', async (req, res, next) => {
  try {
    const { title, subtitle, description, color } = req.query;
    const searchProduct = await Product.find({
      title,
      subtitle,
      description,
      color,
    });

    res.status(200).json(searchProduct);
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

router.post('/review/:userId/:productId', async (req, res, next) => {
  try {
    const { userId, productId } = req.params;
    const { comment, rating, skinType, skinConcern } = req.body;
    const newReview = await Review.create({
      comment,
      rating,
      skinType,
      skinConcern,
      author: userId,
      product: productId,
    });
    res.status(201).json(newReview);
  } catch (error) {
    console.error(error);
  }
});
