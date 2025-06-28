const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    checkInDate: {
      type: Date,
      required: true,
    },
    checkOutDate: {
      type: Date,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    guests: {
      type: Number,
      required: true,
      min: 1,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["Stripe", "PayPal", "Cash"],
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    specialRequests: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", BookingSchema);
module.exports = Booking;
