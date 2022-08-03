const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

// Initializing express router
const express = require("express");
const router = express.Router();

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Invalid email"),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Username is required"),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("First Name is required"),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Last Name is required"),
  handleValidationErrors,
];

router.post("/", validateSignup, async (req, res, next) => {
  const { firstName, lastName, username, password, email } = req.body;
  const user = await User.signup({
    firstName,
    lastName,
    username,
    password,
    email,
  });
  if (user) {
    const out = await user.toJSON();
    const token = setTokenCookie(res, user);
    return res.json({
      id: out.id,
      firstName: out.firstName,
      lastName: out.lastName,
      email: out.email,
      username: out.username,
      token,
    });
  }
});

module.exports = router;
