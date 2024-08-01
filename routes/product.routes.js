const router = require('express').Router();
const Product = require('../models/Product.model');

router.post('/api/product', async (req, res, next) => {
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
router.get('/api/product', async (req, res, next) => {
  try {
    const allProducts = await Product.find();

    res.status(200).json(allProducts);
  } catch (error) {
    console.error(error);
  }
});

//Get by id (single product)
router.get('/products/:productId', async (req, res, next) => {
  try {
    const { productId } = req.params;
    const singleProduct = await Project.findById(productId).populate('product');
    res.status(200).json(singleProduct);
  } catch (error) {
    console.error(error);
  }
});

//FALTA O GET PARA A SEARCH

//DELETE product
router.delete('/api/product/:productId', async (req, res, next) => {
  try {
    const { productId } = req.params;
    await Product.findOneAndDelete(productId);
    res.status(204).send();
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
