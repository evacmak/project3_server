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

    await User.findByIdAndUpdate(
      userId,
      {
        //$set will either add or remove the id depending if it's there already
        // push to push, pull to remove
        $push: {
          reviews: newReview._id,
        },
      },
      { new: true },
    );

    await Product.findByIdAndUpdate(
      productId,
      {
        //$set will either add or remove the id depending if it's there already
        // push to push, pull to remove
        $push: {
          reviews: newReview._id,
        },
      },
      { new: true },
    );
    res.status(201).json(newReview);
  } catch (error) {
    console.error(error);
  }
});

router.put('/review/:userId/:reviewId', async (req, res, next) => {
  try {
    const { userId, reviewId } = req.params;
    const { comment, rating, skinType, skinConcern } = req.body;

    const foundReview = await Review.findById(reviewId);
    if (foundReview.author !== userId) {
      res.status(403).json({ message: 'Unauthorized user' });
      return;
    }

    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      { comment, rating, skinType, skinConcern },
      { new: true },
    );
    res.status(201).json(updatedReview);
  } catch (error) {
    console.error(error);
  }
});

//COMPLETAR COM O EXEMPLO ACIMA DO USERID VERIFICAÇÃO
router.delete('/review/:userId/:reviewId', async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    await Review.findByIdAndDelete(reviewId);

    res.status(204).send();
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
