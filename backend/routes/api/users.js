const express = require("express");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

const router = express.Router();

router.post("/", async (req, res, next) => {
  const { username, password, email } = req.body;
  const user = await User.signup({ username, password, email });
  if (user) {
    await setTokenCookie(res, user);
    return res.json({
      user,
    });
  }
});

module.exports = router;
