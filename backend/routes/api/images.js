const { Booking, Review, User, Spot, Image } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

const express = require("express");
const router = express.Router();
const invalidIdError = function () {
  const err = new Error("Image couldn't be found");
  err.message = "Image couldn't be found";
  err.status = 404;
  throw err;
};
router.delete("/:imageId", requireAuth, async (req, res, next) => {
  if (!parseInt(req.params.imageId)) {
    invalidIdError();
  }
  const imageToDelete = await Image.findByPk(req.params.imageId);
  if (!imageToDelete) {
    const err = new Error("Forbidden");
    err.message = "Image couldn't be found";
    err.status = 404;
    next(err);
  }
  if (imageToDelete.userId === req.user.id) {
    await imageToDelete.destroy();
    res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });
  } else {
    const err = new Error("Forbidden");
    err.message = "Forbidden";
    err.status = 403;
    next(err);
  }
});

module.exports = router;
