const {
  Booking,
  Spot,
  User,
  Image,
  Review,
  sequelize,
} = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { validateBookingData } = require("../../utils/validation");
const { Op, EmptyResultError } = require("sequelize");

const express = require("express");
const router = express.Router();

const invalidIdError = function () {
  const err = new Error("Booking couldn't be found");
  err.message = "Booking couldn't be found";
  err.status = 404;
  throw err;
};

// Get the Current User's Bookings
router.get("/current", requireAuth, async (req, res, next) => {
  const { user } = req;
  const bookings = await Booking.findAll({
    where: {
      userId: user.id,
    },
  });
  for (let booking of bookings) {
    const spot = await booking.getSpot();
    const prevImg = await spot.getImages({
      where: {
        previewImage: true,
      },
    });
    if (prevImg.length) {
      spot.dataValues.previewImage = prevImg[0].dataValues.url;
    }
    booking.dataValues.Spot = spot;
  }
  res.json({ Bookings: bookings });
});

// Edit an existing Booking by bookingId
router.put(
  "/:bookingId",
  requireAuth,
  validateBookingData,
  async (req, res, next) => {
    if (!parseInt(req.params.bookingId)) {
      invalidIdError();
    }
    const booking = await Booking.findByPk(req.params.bookingId);
    const { startDate, endDate } = req.body;
    if (!booking) {
      const err = new Error("Booking couldn't be found");
      err.message = "Booking couldn't be found";
      err.status = 404;
      next(err);
    }
    const now = Date.now();
    if (now > new Date(booking.endDate)) {
      const err = new Error("Past bookings can't be modified");
      err.message = "Past bookings can't be modified";
      err.status = 403;
      next(err);
    }
    if (booking.userId !== req.user.id) {
      const err = new Error("Forbidden");
      err.message = "Forbidden";
      err.status = 403;
      next(err);
    }
    const spotId = booking.spotId;

    // doesn't work need to fix
    const currentSpotBookings = await Booking.findAll({
      where: {
        spotId: spotId,
        [Op.and]: [
          {
            startDate: {
              [Op.lte]: endDate,
            },
          },
          {
            endDate: {
              [Op.gte]: startDate,
            },
          },
        ],
      },
    });
    if (currentSpotBookings.length) {
      const err = new Error(
        "Sorry, this spot is already booked for the specified dates"
      );
      err.status = 403;
      err.message =
        "Sorry, this spot is already booked for the specified dates";
      err.errors = {
        startDate: "Start date conflicts with an existing booking",
        endDate: "End date conflicts with an existing booking",
      };
      return next(err);
    }

    await booking.set(req.body);
    await booking.validate();
    await booking.save();
    res.json(booking);
  }
);

// Delete an existing Booking by bookingId
router.delete("/:bookingId", requireAuth, async (req, res, next) => {
  if (!parseInt(req.params.bookingId)) {
    invalidIdError();
  }
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

  const now = Date.now();
  if (now > new Date(booking.startDate)) {
    const err = new Error("Bookings that have been started can't be deleted");
    err.message = "Bookings that have been started can't be deleted";
    err.status = 403;
    next(err);
  }

  await booking.destroy();
  res.json({
    message: "Successfully deleted",
    statusCode: 200,
  });
});

module.exports = router;
