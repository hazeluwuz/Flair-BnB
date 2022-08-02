const express = require("express");
const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");
const { User } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validateLogin = [
  check("credential")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Email or username is required"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Password is required"),
  handleValidationErrors,
];

router.post("/", validateLogin, async (req, res, next) => {
  const { credential, password } = req.body;

  const user = await User.login({ credential, password });
  if (!user) {
    const err = new Error("Login failed");
    err.message = "Invalid credentials";
    err.status = 401;
    return next(err);
  }

  const token = setTokenCookie(res, user);
  const out = user.toJSON();
  res.status(201);
  return res.json({
    id: out.id,
    firstName: out.firstName,
    lastName: out.lastName,
    email: out.email,
    username: out.username,
    token,
  });
});

router.delete("/", (_req, res) => {
  res.clearCookie("token");
  return res.json({ message: "success" });
});

router.get("/", restoreUser, requireAuth, (req, res) => {
  const { user } = req;
  if (user) {
    return res.json(user.toSafeObject());
  } else return res.json({});
});

module.exports = router;
