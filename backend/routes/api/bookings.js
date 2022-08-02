const {
  Booking,
  Spot,
  User,
  Image,
  Review,
  sequelize,
} = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

const express = require("express");
const router = express.Router();

router.get("/current", requireAuth, async (req, res, next) => {
  const { user } = req;
  const bookings = await Booking.findAll({
    where: {
      userId: user.id,
    },
  });
  res.json(bookings);
});

module.exports = router;
