const { body, param, query, validationResult } = require("express-validator");
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed",
      errors: errors.array().map((error) => ({
        field: error.path,
        message: error.msg,
        value: error.value,
      })),
    });
  }
  next();
};
const validateSignup = [
  body("userName")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Username must be between 2 and 50 characters")
    .matches(/^[a-zA-Z0-9_\s]+$/)
    .withMessage(
      "Username can only contain letters, numbers, spaces, and underscores"
    ),

  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please provide a valid email address"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),

  body("role")
    .optional()
    .isIn(["client", "admin"])
    .withMessage("Role must be either client or admin"),

  handleValidationErrors,
];
const validateLogin = [
  body("identifier").notEmpty().withMessage("Email or username is required"),
  body("password").notEmpty().withMessage("Password is required"),
  handleValidationErrors,
];
const validateBooking = [
  body("roomId").isMongoId().withMessage("Please provide a valid room ID"),

  body("checkInDate")
    .isISO8601()
    .withMessage("Please provide a valid check-in date")
    .custom((value) => {
      const date = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (date < today) {
        throw new Error("Check-in date cannot be in the past");
      }
      return true;
    }),

  body("checkOutDate")
    .isISO8601()
    .withMessage("Please provide a valid check-out date")
    .custom((value, { req }) => {
      const checkOutDate = new Date(value);
      const checkInDate = new Date(req.body.checkInDate);
      if (checkOutDate <= checkInDate) {
        throw new Error("Check-out date must be after check-in date");
      }
      return true;
    }),

  body("guests")
    .isInt({ min: 1, max: 10 })
    .withMessage("Number of guests must be between 1 and 10"),

  handleValidationErrors,
];
const validateRoom = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Room name must be between 2 and 100 characters"),

  body("description")
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage("Description must be between 10 and 1000 characters"),

  body("price")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  body("capacity")
    .isInt({ min: 1, max: 10 })
    .withMessage("Capacity must be between 1 and 10"),

  body("amenities")
    .optional()
    .isArray()
    .withMessage("Amenities must be an array"),

  handleValidationErrors,
];
const validateObjectId = [
  param("id").isMongoId().withMessage("Please provide a valid ID"),

  handleValidationErrors,
];
const validatePagination = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100"),

  handleValidationErrors,
];

module.exports = {
  handleValidationErrors,
  validateSignup,
  validateLogin,
  validateBooking,
  validateRoom,
  validateObjectId,
  validatePagination,
};
