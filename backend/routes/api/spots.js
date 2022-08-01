const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { requireAuth } = require("../../utils/auth");
const { Spot, User, Image } = require("../../db/models");
const express = require("express");
const router = express.Router();
const validateSpotData = [
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Street address is required"),
  check("city")
    .exists({ checkFalsy: true })
    .withMessage("City is required"),
  check("state")
    .exists({ checkFalsy: true })
    .withMessage("State is required"),
  check("country")
    .exists({ checkFalsy: true })
    .withMessage("Country is required"),
  check("lat")
    .exists({ checkFalsy: true })
    .isDecimal()
    .withMessage("Latitude is not valid"),
  check("lng")
    .exists({checkFalsy:true})
    .isDecimal()
    .withMessage("Longitude is not valid"),
  check("name")
    .exists({checkFalsy:true})
    .isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters"),
  check("description")
    .exists({checkFalsy:true})
    .withMessage("Description is required"),
   check("price")
    .exists({checkFalsy:true})
    .withMessage("Price per day is required"),
  handleValidationErrors,
];

router.get("/", async (req, res, next) => {
  // need to add avgReview and previewImage once implemented
  const spots = await Spot.findAll();
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
    include: [
      {
        model: Image,
      },
      {
        model: User,
        as: "Owner",
        attributes: ["id", "firstName", "lastName"],
      },
    ],
  });
  if (!spot) {
    const err = new Error("Spot couldn't be found");
    err.message = "Spot couldn't be found";
    err.status = 404;
    return next(err);
  } else {
    res.json(spot);
  }
});

router.post("/", requireAuth, validateSpotData, async (req, res, next) => {
  const id = req.user.id;
  const spotData = Object.assign({ ownerId: id }, req.body);
  const newSpot = await Spot.create(spotData);
  res.json(newSpot);
});

module.exports = router;
