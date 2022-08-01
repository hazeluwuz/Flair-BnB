const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth, verifyOwner } = require("../../utils/auth");
const { Review, User, Spot, Image } = require("../../db/models");

const express = require("express");
const router = express.Router();
router.get("/current", requireAuth, async (req, res, next) => {
  const userId = req.user.id;
  const reviews = await Review.findAll({
    where: {
      userId,
    },
    include: [
      { model: User, attributes: ["id", "firstName", "lastName"] },
      { model: Spot.scope("reviews") },
      { model: Image },
    ],
  });
  res.json({ Reviews: reviews });
});

router.post("/:reviewId/images", requireAuth, async (req, res, next) => {
  const review = await Review.findByPk(req.params.reviewId);
  if (!review) {
    const err = new Error("Invalid review id");
    err.message = "Review couldn't be found";
    err.status = 404;
    next(err);
  }
  const { url } = req.body;
  if (req.user.id === review.userId) {
    const image = await review.createImage({
      url: url,
      previewImage: false,
      spotId: review.spotId,
      reviewId: review.id,
      userId: req.user.id,
    });
    res.json({
      id: image.id,
      spotId: image.spotId,
      reviewId: image.spotId,
      url,
    });
  }
});

module.exports = router;
