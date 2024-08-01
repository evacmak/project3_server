const router = require('express').Router();
const Product = require('../models/Product.model');
const User = require('../models/User.model');
const Review = require('../models/Review.model');

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

router.put('/review/:userId/:productId', async (req, res, next) => {
  try {
    const { productId, userId } = req.params;

    const getReview = await User.findByIdAndUpdate(
      userId,
      {
        //$set will either add or remove the id depending if it's there already
        // push to push, pull to remove
        $push: {
          productReview: productId,
        },
      },
      { new: true },
    );

    // for the review, do the same as above but also delete he review afterwards
    // await Review.findByIdAndDelete(reviewId)
    res.status(200).json(getReview);
  } catch (error) {
    console.error(error);
  }
});

router.delete('/review/:userId/:productId', async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    await Review.findByIdAndDelete(reviewId);

    res.status(204).send();
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
