const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth");
const { Review, User } = require("../../db/models");

const express = require("express");
const router = express.Router();
router.get("/current", requireAuth, async (req, res, next) => {
  const userId = req.user.id;
  const reviews = Review.findAll({
    where: {
      userId,
    },
  });
  res.json({ Reviews: reviews });
});


module.exports = router;
