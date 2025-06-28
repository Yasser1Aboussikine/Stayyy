const Booking = require("../models/Booking");
const Room = require("../models/Room");

// Helper function to handle errors
const handleErrors = (error) => {
  let errors = {};

  // Validation errors
  if (error.name === "ValidationError") {
    Object.values(error.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  // Cast error (invalid ObjectId)
  if (error.name === "CastError") {
    errors.id = "Invalid ID format";
  }

  return errors;
};

// Get all bookings controller
const getAllBookingsController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let query = {};

    // If user is client, only show their bookings
    if (req.user.role === "client") {
      query.user = req.user._id;
    }

    const bookings = await Booking.find(query)
      .populate("room", "roomType pricePerNight amenities images")
      .populate("user", "userName email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Booking.countDocuments(query);

    res.status(200).json({
      bookings,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get all bookings error:", error);
    const errors = handleErrors(error);
    res.status(500).json({ error: "Internal server error", errors });
  }
};

// Get booking by ID controller
const getBookingByIdController = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("room", "roomType pricePerNight amenities images")
      .populate("user", "userName email");

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    // Check if user has permission to view this booking
    if (
      req.user.role === "client" &&
      booking.user._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ error: "Access denied" });
    }

    res.status(200).json({ booking });
  } catch (error) {
    console.error("Get booking by ID error:", error);
    const errors = handleErrors(error);
    res.status(500).json({ error: "Internal server error", errors });
  }
};

// Create booking controller
const createBookingController = async (req, res) => {
  try {
    const {
      roomId,
      checkInDate,
      checkOutDate,
      guests,
      paymentMethod,
      specialRequests,
    } = req.body;

    // Validate required fields
    if (!roomId || !checkInDate || !checkOutDate || !guests || !paymentMethod) {
      return res.status(400).json({
        error:
          "Room ID, check-in date, check-out date, guests, and payment method are required",
      });
    }

    // Check if room exists
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    // Validate dates
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const now = new Date();

    if (checkIn < now) {
      return res
        .status(400)
        .json({ error: "Check-in date cannot be in the past" });
    }

    if (checkOut <= checkIn) {
      return res
        .status(400)
        .json({ error: "Check-out date must be after check-in date" });
    }

    // Check if room is available for the selected dates
    const conflictingBooking = await Booking.findOne({
      room: roomId,
      status: { $in: ["confirmed", "pending"] },
      $or: [
        {
          checkInDate: { $lte: checkOut },
          checkOutDate: { $gte: checkIn },
        },
      ],
    });

    if (conflictingBooking) {
      return res
        .status(409)
        .json({ error: "Room is not available for the selected dates" });
    }

    // Calculate total price
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    const totalPrice = room.pricePerNight * nights;

    // Create booking
    const booking = await Booking.create({
      user: req.user._id,
      room: roomId,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      guests,
      totalPrice,
      paymentMethod,
      specialRequests: specialRequests || "",
      status: "pending",
    });

    // Populate the booking with room and user details
    await booking.populate("room", "roomType pricePerNight amenities images");
    await booking.populate("user", "userName email");

    res.status(201).json({
      booking,
      message: "Booking created successfully",
    });
  } catch (error) {
    console.error("Create booking error:", error);
    const errors = handleErrors(error);
    res.status(400).json({ error: "Error creating booking", errors });
  }
};

// Update booking status controller
const updateBookingStatusController = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["pending", "confirmed", "cancelled", "completed"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    booking.status = status;
    await booking.save();

    await booking.populate("room", "roomType pricePerNight amenities images");
    await booking.populate("user", "userName email");

    res.status(200).json({
      booking,
      message: "Booking status updated successfully",
    });
  } catch (error) {
    console.error("Update booking status error:", error);
    const errors = handleErrors(error);
    res.status(500).json({ error: "Error updating booking status", errors });
  }
};

// Cancel booking controller
const cancelBookingController = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    // Check if user has permission to cancel this booking
    if (
      req.user.role === "client" &&
      booking.user.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ error: "Access denied" });
    }

    // Check if booking can be cancelled
    if (booking.status === "cancelled") {
      return res.status(400).json({ error: "Booking is already cancelled" });
    }

    if (booking.status === "completed") {
      return res.status(400).json({ error: "Cannot cancel completed booking" });
    }

    booking.status = "cancelled";
    await booking.save();

    await booking.populate("room", "roomType pricePerNight amenities images");
    await booking.populate("user", "userName email");

    res.status(200).json({
      booking,
      message: "Booking cancelled successfully",
    });
  } catch (error) {
    console.error("Cancel booking error:", error);
    const errors = handleErrors(error);
    res.status(500).json({ error: "Error cancelling booking", errors });
  }
};

// Delete booking controller
const deleteBookingController = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    await Booking.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Delete booking error:", error);
    const errors = handleErrors(error);
    res.status(500).json({ error: "Error deleting booking", errors });
  }
};

// Get user bookings controller
const getUserBookingsController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const bookings = await Booking.find({ user: req.user._id })
      .populate("room", "roomType pricePerNight amenities images")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Booking.countDocuments({ user: req.user._id });

    res.status(200).json({
      bookings,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get user bookings error:", error);
    const errors = handleErrors(error);
    res.status(500).json({ error: "Internal server error", errors });
  }
};

module.exports = {
  getAllBookingsController,
  getBookingByIdController,
  createBookingController,
  updateBookingStatusController,
  cancelBookingController,
  deleteBookingController,
  getUserBookingsController,
};
