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
router.use(authenticateToken);
router.get("/", getAllBookingsController);
router.get("/my-bookings", getUserBookingsController);
router.get("/:id", getBookingByIdController);
router.post("/", createBookingController);
router.patch("/:id/status", updateBookingStatusController);
router.patch("/:id/cancel", cancelBookingController);
router.delete("/:id", deleteBookingController);

module.exports = router;
