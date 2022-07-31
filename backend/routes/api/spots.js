const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { requireAuth } = require("../../utils/auth");
const { Spot } = require("../../db/models");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  // need to add avgReview and previewImage once implemented
  const spots = await Spot.findAll();
  res.json({ Spots: spots });
});

module.exports = router;
