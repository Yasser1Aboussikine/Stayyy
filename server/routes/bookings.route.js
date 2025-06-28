const express = require("express");
const router = express.Router();
const {
  getAllBookingsController,
  getBookingByIdController,
  createBookingController,
  updateBookingStatusController,
  cancelBookingController,
  deleteBookingController,
  getUserBookingsController,
} = require("../controllers/booking.controller");
const { authenticateToken } = require("../middleware/auth");

// Apply authentication middleware to all booking routes
router.use(authenticateToken);

// Get all bookings (admin only)
router.get("/", getAllBookingsController);

// Get user's own bookings
router.get("/my-bookings", getUserBookingsController);

// Get booking by ID
router.get("/:id", getBookingByIdController);

// Create new booking
router.post("/", createBookingController);

// Update booking status (admin only)
router.patch("/:id/status", updateBookingStatusController);

// Cancel booking
router.patch("/:id/cancel", cancelBookingController);

// Delete booking (admin only)
router.delete("/:id", deleteBookingController);

module.exports = router;
