const { check } = require("express-validator");
const {
  handleValidationErrors,
  validateReviewData,
  validateSpotData,
} = require("../../utils/validation");
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
  });
  for (let review of reviews) {
    const owner = await review.getUser({
      attributes: ["id", "firstName", "lastName"],
    });
    const spot = await review.getSpot();
    const images = await review.getImages({
      attributes: ["id", "reviewId", "url"],
    });
    review.dataValues.User = owner.toJSON();
    review.dataValues.Spot = spot.toJSON();
    review.dataValues.Images = images;
  }
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
  const images = await review.getImages();
  if (images.length >= 10) {
    const err = new Error(
      "Maximum number of images for this resource was reached"
    );
    err.message = "Maximum number of images for this resource was reached";
    err.status = 403;
    next(err);
  }
  const { url } = req.body;
  if (req.user.id === review.userId) {
    const image = await review.createImage({
      url: url,
      previewImage: false,
      reviewId: review.id,
      userId: req.user.id,
    });
    res.json({
      id: image.id,
      reviewId: image.reviewId,
      url,
    });
  } else {
    res.status(403);
    res.json({
      message: "Forbidden",
      statusCode: 403,
    });
  }
});

router.put(
  "/:reviewId",
  requireAuth,
  validateReviewData,
  async (req, res, next) => {
    const review = await Review.findByPk(req.params.reviewId).catch((e) => {
      res.status(404);
      res.json({
        message: "Review couldn't be found",
        statusCode: 404,
      });
    });
    const userId = req.user.id;
    if (!review) {
      res.status(404);
      res.json({
        message: "Review couldn't be found",
        statusCode: 404,
      });
    }
    if (userId !== review.userId) {
      res.status(403);
      res.json({
        message: "Forbidden",
        statusCode: 403,
      });
    }

    await review.set(req.body);

    await review.save();

    res.json(review);
  }
);

router.delete("/:reviewId", requireAuth, async (req, res, next) => {
  const review = await Review.findByPk(req.params.reviewId);
  if (!review) {
    res.status(403);
    res.json({
      message: "Review couldn't be found",
      statusCode: 404,
    });
  }
  if (req.user.id !== review.userId) {
    res.status(403);
    res.json({
      message: "Forbidden",
      statusCode: 403,
    });
  }

  await review.destroy();
  res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});

module.exports = router;
