const router = require("./auth.route");

const getAllRoomsController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { search, minPrice, maxPrice, capacity, amenities } = req.query;

    let query = {};

    // ... build query as before ...

    const rooms = await Room.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Room.countDocuments(query);

    // Always respond with JSON, even if rooms is empty
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
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = getAllRoomsController