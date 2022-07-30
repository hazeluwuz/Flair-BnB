const { validationResult } = require("express-validator");

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    // const errors = validationErrors.array().map((error) => `${error.msg}`);
    const errors = {};
    validationErrors.array().forEach((e) => {
      errors[e.param] = e.msg;
    });
    const err = Error("Validation error");
    err.status = 400;
    err.errors = errors;
    err.title = "Validation error";
    next(err);
  }
  next();
};

module.exports = {
  handleValidationErrors,
};
