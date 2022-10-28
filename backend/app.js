const express = require("express");
require("express-async-errors");
const morgan = require("morgan");
const cors = require("cors");
const csurf = require("csurf");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const { environment } = require("./config");
const { ValidationError, UniqueConstraintError } = require("sequelize");

const isProduction = environment === "production";
const app = express();

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
// app.use(
//   fileUpload({
//     limits: { fileSize: 50 * 1024 * 1024 },
//   })
// );
// Security Middleware
if (!isProduction) {
  // enable cors only in development
  app.use(cors());
}

// helmet helps set a variety of headers to better secure your app
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin",
  })
);

// Set the _csrf token and create req.csrfToken method
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true,
    },
  })
);

app.use(routes);

app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err);
});

// Process sequelize errors
app.use((err, _req, _res, next) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    const errors = {};
    err.errors.forEach((e) => {
      errors[e.path] = e.message;
    });
    err.errors = errors;
    err.status = 403;
  }
  next(err);
});

app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    statusCode: err.status,
    errors: err.errors,
  });
});

module.exports = app;
