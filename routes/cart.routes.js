const router = require('express').Router();
const User = require('../models/User.model');

//Get by id
router.get('/cart/:productId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const getCartId = await User.findById(userId);
    res.status(200).json(getCartId);
  } catch (error) {
    console.error(error);
  }
});

//NÃO SEI O QUE FAZER A PARTIR DAQUI

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

router.delete('/cart/:userId/:productId', async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    await Review.findByIdAndDelete(reviewId);

    res.status(204).send();
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
