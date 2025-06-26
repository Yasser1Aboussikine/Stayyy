const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const router = express.Router();

// Import route modules
const authRoutes = require("./auth.route");
const bookingsRoutes = require("./bookings.route");
const hotelsRoutes = require("./hotels.route");


// Security middleware
router.use(helmet());

// CORS configuration
const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200,
  // methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
};
router.use(cors(corsOptions));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});
router.use(limiter);

// Body parsing middleware
router.use(express.json({ limit: "10mb" }));
router.use(express.urlencoded({ extended: true, limit: "10mb" }));
// Cookie parser middleware
router.use(cookieParser());

// Request logging middleware
router.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
router.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Mount routes
router.use("/auth", authRoutes);
// router.use("/bookings", bookingsRoutes);
// router.use("/hotels", hotelsRoutes);


// 404 handler for API routes
router.use("*", (req, res) => {
  res.status(404).json({
    message: "API endpoint not found",
    path: req.originalUrl,
    method: req.method,
  });
});

// Error handling middleware
router.use((err, req, res, next) => {
  console.error("API Error:", err);

  // Handle specific error types
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation Error",
      errors: Object.values(err.errors).map((e) => e.message),
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      message: "Invalid ID format",
    });
  }

  if (err.code === 11000) {
    return res.status(409).json({
      message: "Duplicate key error",
    });
  }

  // Default error response
  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

module.exports = router;