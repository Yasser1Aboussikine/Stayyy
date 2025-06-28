const Room = require("../models/Room");
const Booking = require("../models/Booking");

const handleErrors = (error) => {
  let errors = {};


  if (error.name === "ValidationError") {
    Object.values(error.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  if (error.name === "CastError") {
    errors.id = "Invalid ID format";
  }

  if (error.code === 11000) {
    errors.name = "Room with this name already exists";
  }

  return errors;
};


const getAllRoomsController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 4;
    const skip = (page - 1) * limit;

    const { search, minPrice, maxPrice, roomType, amenities, sort, order } =
      req.query;

    let query = {};

  
    if (search) {
      query.$or = [
        { roomType: { $regex: search, $options: "i" } },
        { "hotel.name": { $regex: search, $options: "i" } },
        { "hotel.city": { $regex: search, $options: "i" } },
      ];
    }


    if (minPrice || maxPrice) {
      query.pricePerNight = {};
      if (minPrice) query.pricePerNight.$gte = parseFloat(minPrice);
      if (maxPrice) query.pricePerNight.$lte = parseFloat(maxPrice);
    }

    
    if (roomType) {
      query.roomType = roomType;
    }

    if (amenities) {
      const amenitiesArray = amenities.split(",").map((a) => a.trim());
      query.amenities = { $all: amenitiesArray };
    }

    // Build sort object
    let sortObject = { createdAt: -1 }; // default sort
    if (sort) {
      const sortOrder = order === "asc" ? 1 : -1;
      sortObject = { [sort]: sortOrder };
    }

    const rooms = await Room.find(query)
      .sort(sortObject)
      .skip(skip)
      .limit(limit);

    const total = await Room.countDocuments(query);

    res.status(200).json({
      rooms,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get all rooms error:", error);
    const errors = handleErrors(error);
    res.status(500).json({ error: "Internal server error", errors });
  }
};

const getRoomByIdController = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    res.status(200).json({ room });
  } catch (error) {
    console.error("Get room by ID error:", error);
    const errors = handleErrors(error);
    res.status(500).json({ error: "Internal server error", errors });
  }
};


const createRoomController = async (req, res) => {
  try {
    const { hotel, roomType, pricePerNight, amenities, images } = req.body;

    if (!hotel || !roomType || !pricePerNight || !images) {
      return res.status(400).json({
        error:
          "Hotel information, room type, price per night, and images are required",
      });
    }

    if (pricePerNight <= 0) {
      return res.status(400).json({ error: "Price must be greater than 0" });
    }

    const validRoomTypes = [
      "Single Bed",
      "Double Bed",
      "Suite",
      "Deluxe",
      "Family",
    ];
    if (!validRoomTypes.includes(roomType)) {
      return res.status(400).json({ error: "Invalid room type" });
    }

    const room = await Room.create({
      hotel,
      roomType,
      pricePerNight,
      amenities: amenities || [],
      images,
    });

    res.status(201).json({
      room,
      message: "Room created successfully",
    });
  } catch (error) {
    console.error("Create room error:", error);
    const errors = handleErrors(error);
    res.status(400).json({ error: "Error creating room", errors });
  }
};


const updateRoomController = async (req, res) => {
  try {
    const { hotel, roomType, pricePerNight, amenities, images } = req.body;

    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    if (pricePerNight !== undefined && pricePerNight <= 0) {
      return res.status(400).json({ error: "Price must be greater than 0" });
    }

    if (roomType !== undefined) {
      const validRoomTypes = [
        "Single Bed",
        "Double Bed",
        "Suite",
        "Deluxe",
        "Family",
      ];
      if (!validRoomTypes.includes(roomType)) {
        return res.status(400).json({ error: "Invalid room type" });
      }
    }

    if (hotel) room.hotel = hotel;
    if (roomType) room.roomType = roomType;
    if (pricePerNight !== undefined) room.pricePerNight = pricePerNight;
    if (amenities) room.amenities = amenities;
    if (images) room.images = images;

    await room.save();

    res.status(200).json({
      room,
      message: "Room updated successfully",
    });
  } catch (error) {
    console.error("Update room error:", error);
    const errors = handleErrors(error);
    res.status(500).json({ error: "Error updating room", errors });
  }
};


const deleteRoomController = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    const activeBookings = await Booking.find({
      room: req.params.id,
      status: { $in: ["pending", "confirmed"] },
    });

    if (activeBookings.length > 0) {
      return res.status(400).json({
        error: "Cannot delete room with active bookings",
      });
    }

    await Room.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    console.error("Delete room error:", error);
    const errors = handleErrors(error);
    res.status(500).json({ error: "Error deleting room", errors });
  }
};

const searchAvailableRoomsController = async (req, res) => {
  try {
    const { checkInDate, checkOutDate, roomType } = req.query;

    if (!checkInDate || !checkOutDate) {
      return res.status(400).json({
        error: "Check-in and check-out dates are required",
      });
    }

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    if (checkIn >= checkOut) {
      return res.status(400).json({
        error: "Check-out date must be after check-in date",
      });
    }
    let query = {};
    if (roomType) {
      query.roomType = roomType;
    }

    const rooms = await Room.find(query);
    const availableRooms = [];

    for (const room of rooms) {
      const conflictingBooking = await Booking.findOne({
        room: room._id,
        status: { $in: ["confirmed", "pending"] },
        $or: [
          {
            checkInDate: { $lte: checkOut },
            checkOutDate: { $gte: checkIn },
          },
        ],
      });

      if (!conflictingBooking) {
        availableRooms.push(room);
      }
    }

    res.status(200).json({
      availableRooms,
      searchCriteria: {
        checkInDate,
        checkOutDate,
        roomType: roomType || "any",
      },
    });
  } catch (error) {
    console.error("Search available rooms error:", error);
    const errors = handleErrors(error);
    res.status(500).json({ error: "Error searching available rooms", errors });
  }
};

const getRoomStatsController = async (req, res) => {
  try {
    const totalRooms = await Room.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const activeBookings = await Booking.countDocuments({
      status: { $in: ["pending", "confirmed"] },
    });

    const avgPriceResult = await Room.aggregate([
      { $group: { _id: null, avgPrice: { $avg: "$pricePerNight" } } },
    ]);
    const avgPrice = avgPriceResult.length > 0 ? avgPriceResult[0].avgPrice : 0;

    // Get rooms by capacity
    const roomsByCapacity = await Room.aggregate([
      { $group: { _id: "$roomType", count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json({
      stats: {
        totalRooms,
        totalBookings,
        activeBookings,
        avgPrice: Math.round(avgPrice * 100) / 100,
        roomsByCapacity,
      },
    });
  } catch (error) {
    console.error("Get room stats error:", error);
    const errors = handleErrors(error);
    res.status(500).json({ error: "Error getting room statistics", errors });
  }
};

module.exports = {
  getAllRoomsController,
  getRoomByIdController,
  createRoomController,
  updateRoomController,
  deleteRoomController,
  searchAvailableRoomsController,
  getRoomStatsController,
};
