const { check } = require("express-validator");
const {
  handleValidationErrors,
  validateReviewData,
  validateSpotData,
} = require("../../utils/validation");
const { requireAuth, verifyOwner } = require("../../utils/auth");
const { Review, User, Spot, Image, sequelize } = require("../../db/models");

const express = require("express");
const router = express.Router();

const invalidIdError = function () {
  const err = new Error("Review couldn't be found");
  err.message = "Review couldn't be found";
  err.status = 404;
  throw err;
};

// Get the Current User's Reviews
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
    const spot = await review.getSpot({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    const images = await review.getImages({
      attributes: ["id", ["reviewId", "imageableId"], "url"],
    });
    review.dataValues.User = owner.toJSON();
    review.dataValues.Spot = spot.toJSON();
    review.dataValues.Images = images;
  }
  res.json({ Reviews: reviews });
});

// Create a new Image for a Review by reviewId
router.post("/:reviewId/images", requireAuth, async (req, res, next) => {
  if (!parseInt(req.params.reviewId)) {
    invalidIdError();
  }
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
    return next(err);
  }
  const { url, previewImage } = req.body;
  if (req.user.id === review.userId) {
    const image = await review.createImage({
      url: url,
      previewImage: previewImage,
      reviewId: review.id,
      userId: req.user.id,
    });
    res.json({
      id: image.id,
      imageableId: image.reviewId,
      url,
    });
  } else {
    const err = new Error("Forbidden");
    err.message = "Forbidden";
    err.status = 403;
    return next(err);
  }
});

// Edit an existing Review by reviewId
router.put(
  "/:reviewId",
  requireAuth,
  validateReviewData,
  async (req, res, next) => {
    if (!parseInt(req.params.reviewId)) {
      invalidIdError();
    }
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
      const err = new Error("Forbidden");
      err.message = "Forbidden";
      err.status = 403;
      return next(err);
    }

    await review.set(req.body);

    await review.save();

    res.json(review);
  }
);

// Delete an existing Review by reviewId
router.delete("/:reviewId", requireAuth, async (req, res, next) => {
  if (!parseInt(req.params.reviewId)) {
    invalidIdError();
  }
  const review = await Review.findByPk(req.params.reviewId);
  if (!review) {
    res.status(403);
    res.json({
      message: "Review couldn't be found",
      statusCode: 404,
    });
  }
  if (req.user.id !== review.userId) {
    const err = new Error("Forbidden");
    err.message = "Forbidden";
    err.status = 403;
    return next(err);
  }

  await review.destroy();
  res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});

module.exports = router;
