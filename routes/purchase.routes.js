const router = require('express').Router();
const Purchase = require('../models/Purchase.model');
const Product = require('../models/Product.model');
const User = require('../models/User.model');

router.post('/purchase', async (req, res, next) => {
  try {
    const { total, address, products, userId } = req.body;

    let productIds = products.map((product) => product.productId);

    const purchasedProducts = await Product.find({
      _id: {
        $in: productIds,
      },
    });

    for (let i = 0; i < purchasedProducts.length; i++) {
      if (products[i].quantity > purchasedProducts[i].quantity) {
        res.status(401).json({
          message: `Item ${purchasedProducts[i].title} doesn't have the requested amount`,
        });
        return;
      }
    }
    const newPurchase = await Purchase.create({
      user: userId || null,
      total,
      address,
      products,
    });

    purchasedProducts.forEach(async (product, index) => {
      product.quantity -= products[index].quantity;
      await product.save();
    });

    if (userId) {
      await User.findByIdAndUpdate(
        userId,
        {
          //$set will either add or remove the id depending if it's there already
          // push to push, pull to remove
          $push: {
            purchases: newPurchase._id,
          },
        },
        { new: true },
      );
    }

    res.status(201).json(newPurchase);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
