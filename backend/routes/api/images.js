const { Booking, Review, User, Spot, Image } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

const express = require("express");
const router = express.Router();

router.delete("/:imageId", requireAuth, async (req, res, next) => {
  const imageToDelete = await Image.findByPk(req.params.imageId);
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
