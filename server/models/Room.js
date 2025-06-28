const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema(
  {
    hotel: {
      name: String,
      address: String,
      contact: String,
      city: String,
    },
    roomType: {
      type: String,
      required: true,
      enum: ["Single Bed", "Double Bed", "Suite", "Deluxe", "Family"],
      default: "Single Bed",
    },
    pricePerNight: {
      type: Number,
      required: true,
      min: 0,
    },
    amenities: {
      type: [String],
      enum: [
        "Room Service",
        "Mountain View",
        "Pool Access",
        "Free WiFi",
        "Free Breakfast",
      ],
      default: [],
    },
    images: {
      type: [String], // store URLs or paths
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", RoomSchema);
module.exports = Room;
