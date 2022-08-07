const { validationResult } = require("express-validator");
const { check, query } = require("express-validator");

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
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

const validateSpotData = [
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Street address is required"),
  check("city").exists({ checkFalsy: true }).withMessage("City is required"),
  check("state").exists({ checkFalsy: true }).withMessage("State is required"),
  check("country")
    .exists({ checkFalsy: true })
    .withMessage("Country is required"),
  check("lat")
    .exists({ checkFalsy: true })
    .isDecimal()
    .withMessage("Latitude is not valid"),
  check("lng")
    .exists({ checkFalsy: true })
    .isDecimal()
    .withMessage("Longitude is not valid"),
  check("name")
    .isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters"),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  check("price")
    .exists({ checkFalsy: true })
    .withMessage("Price per day is required"),
  handleValidationErrors,
];

const validateReviewData = [
  check("review")
    .exists({ checkFalsy: true })
    .withMessage("Review text is required"),
  check("stars")
    .exists({ checkFalsy: true })
    .isInt({ min: 1, max: 5 })
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors,
];

const validateImageData = [
  check("url")
    .exists({ checkFalsy: true })
    .withMessage("Invalid url provided")
    .isURL()
    .withMessage("Invalid url provided"),
  handleValidationErrors,
];

const validateBookingData = [
  check("startDate")
    .exists({ checkFalsy: true })
    .isDate()
    .withMessage("startDate must be a valid date!"),
  check("endDate")
    .exists({ checkFalsy: true })
    .isDate()
    .withMessage("endDate must be a valid date!"),
  handleValidationErrors,
];

const validateQueryParams = [
  query("page")
    .optional()
    .isInt({ min: 0, max: 10 })
    .withMessage("Page must be greater than or equal to 0"),
  query("size")
    .optional()
    .isInt({ min: 0, max: 20 })
    .withMessage("Page must be greater than or equal to 0"),
  query("maxLat")
    .optional()
    .isDecimal({ force_decimal: true })
    .withMessage("Maximum latitude is invalid"),
  query("minLat")
    .optional()
    .isDecimal({ force_decimal: true })
    .withMessage("Minimum latitude is invalid"),
  query("minLng")
    .optional()
    .isDecimal({ force_decimal: true })
    .withMessage("Minimum longitude is invalid"),
  query("maxLng")
    .optional()
    .isDecimal({ force_decimal: true })
    .withMessage("Maximum longitude is invalid"),
  query("minPrice")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Minimum price must be greater than or equal to 0"),
  query("maxPrice")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Maximum price must be greater than or equal to 0"),
  handleValidationErrors,
];

module.exports = {
  handleValidationErrors,
  validateReviewData,
  validateSpotData,
  validateImageData,
  validateBookingData,
  validateQueryParams,
};
