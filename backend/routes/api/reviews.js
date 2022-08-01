const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth");
const { Review, User, Spot, Image } = require("../../db/models");

const express = require("express");
const router = express.Router();
router.get("/current", requireAuth, async (req, res, next) => {
  const userId = req.user.id;
  const reviews = await Review.findAll({
    where: {
      userId,
    },
    include: [{ model: Spot.scope("reviews") }, { model: Image }],
  });
  res.json({ Reviews: reviews });
});

module.exports = router;
