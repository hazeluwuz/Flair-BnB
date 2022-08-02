const { check } = require("express-validator");
const {
  handleValidationErrors,
  validateReviewData,
  validateSpotData,
} = require("../../utils/validation");

const { requireAuth, verifyOwner } = require("../../utils/auth");
const { Spot, User, Image, Review, sequelize } = require("../../db/models");
const express = require("express");
const router = express.Router();

const spotFound = function (spot, next) {
  if (!spot) {
    const err = new Error("Spot couldn't be found");
    err.message = "Spot couldn't be found";
    err.status = 404;
    next(err);
    return err;
  } else {
    return true;
  }
};

router.get("/", async (req, res, next) => {
  // need to add avgReview and previewImage once implemented
  const spots = await Spot.findAll({
    attributes: {
      include: [
        [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"],
      ],
    },
    include: {
      model: Review,
      attributes: [],
    },
  });
  res.json({ Spots: spots });
});

router.get("/current", requireAuth, async (req, res, next) => {
  const { user } = req;
  const userId = user.dataValues.id;
  // need to add avgRating and previewImage once implemented
  const spots = await Spot.findAll({
    where: {
      ownerId: userId,
    },
  });
  res.json({ Spots: spots });
});

router.get("/:spotId", async (req, res, next) => {
  // must add numReviews, and avgStarRating once implemented.
  const spot = await Spot.findByPk(req.params.spotId, {
    attributes: {
      include: [
        [sequelize.fn("COUNT", sequelize.col("Reviews.id")), "numReviews"],
        [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgStarRating"],
      ],
    },
    include: [
      {
        model: Image,
        attributes: ["id", "url"],
        group: "id",
      },
      {
        model: User,
        as: "Owner",
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: Review,
        attributes: [],
      },
    ],
    group: "Spot.id",
  });
  if (spotFound(spot, next)) {
    res.json(spot);
  }
});

router.get("/:spotId/reviews", async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId);
  if (spotFound(spot, next)) {
    const reviews = await spot.getReviews({
      include: [
        { model: User, attributes: ["id", "firstName", "lastName"] },
        { model: Image.scope("reviews") },
      ],
    });
    res.json({ Reviews: reviews });
  }
});

router.post("/", requireAuth, validateSpotData, async (req, res, next) => {
  const id = req.user.id;
  const spotData = Object.assign({ ownerId: id }, req.body);
  const newSpot = await Spot.create(spotData);
  res.json(newSpot);
});

router.put(
  "/:spotId",
  requireAuth,
  validateSpotData,
  async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);
    // Check if we found the spot and that the current user is the spot owner
    if (spotFound(spot, next) && verifyOwner(req.user, spot, next)) {
      spot.set(req.body);
      await spot.save();
      res.json(spot);
    }
  }
);

router.delete("/:spotId", requireAuth, async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId);
  // Check if we found the spot and that the current user is the spot owner
  if (spotFound(spot, next) && verifyOwner(req.user, spot, next)) {
    await spot.destroy();
    res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  }
});

router.post(
  "/:spotId/reviews",
  requireAuth,
  validateReviewData,
  async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);
    if (spotFound(spot, next)) {
      const template = {
        userId: req.user.id,
        spotId: spot.id,
      };
      const reviewData = Object.assign(template, req.body);
      const newReview = await Review.create(reviewData).catch((e) => {
        res.status(403);
        res.json({
          message: "User already has a review for this spot",
          statusCode: 403,
        });
      });
      res.json(newReview);
    }
  }
);

module.exports = router;
