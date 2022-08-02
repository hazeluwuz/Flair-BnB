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

router.put("/:bookingId", requireAuth, async (req, res, next) => {
  const booking = await Booking.findByPk(req.params.bookingId);
  if (!booking) {
    const err = new Error("Booking couldn't be found");
    err.message = "Booking couldn't be found";
    err.status = 404;
    next(err);
  }

  if (booking.userId !== req.user.id) {
    const err = new Error("Forbidden");
    err.message = "Forbidden";
    err.status = 403;
    next(err);
  }

  await booking.set(req.body);
  await booking.validate();
  await booking.save();
  res.json(booking);
});

module.exports = router;
