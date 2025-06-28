const Offer = require("../models/Offer");

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

  // Duplicate key error
  if (error.code === 11000) {
    errors.title = "Offer with this title already exists";
  }

  return errors;
};

// Get all offers controller
const getAllOffersController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { active } = req.query;

    let query = {};

    // Filter by active status
    if (active !== undefined) {
      const now = new Date();
      if (active === "true") {
        query.$and = [
          { startDate: { $lte: now } },
          { endDate: { $gte: now } },
          { isActive: true },
        ];
      } else {
        query.$or = [
          { startDate: { $gt: now } },
          { endDate: { $lt: now } },
          { isActive: false },
        ];
      }
    }

    const offers = await Offer.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Offer.countDocuments(query);

    res.status(200).json({
      offers,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get all offers error:", error);
    const errors = handleErrors(error);
    res.status(500).json({ error: "Internal server error", errors });
  }
};

// Get offer by ID controller
const getOfferByIdController = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);

    if (!offer) {
      return res.status(404).json({ error: "Offer not found" });
    }

    res.status(200).json({ offer });
  } catch (error) {
    console.error("Get offer by ID error:", error);
    const errors = handleErrors(error);
    res.status(500).json({ error: "Internal server error", errors });
  }
};

// Create offer controller
const createOfferController = async (req, res) => {
  try {
    const {
      title,
      description,
      discountPercentage,
      startDate,
      endDate,
      roomIds,
      isActive,
      terms,
    } = req.body;

    // Validate required fields
    if (
      !title ||
      !description ||
      !discountPercentage ||
      !startDate ||
      !endDate
    ) {
      return res.status(400).json({
        error:
          "Title, description, discount percentage, start date, and end date are required",
      });
    }

    // Validate discount percentage
    if (discountPercentage < 0 || discountPercentage > 100) {
      return res.status(400).json({
        error: "Discount percentage must be between 0 and 100",
      });
    }

    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start >= end) {
      return res.status(400).json({
        error: "End date must be after start date",
      });
    }

    const offer = await Offer.create({
      title,
      description,
      discountPercentage,
      startDate: start,
      endDate: end,
      roomIds: roomIds || [],
      isActive: isActive !== undefined ? isActive : true,
      terms: terms || "",
    });

    res.status(201).json({
      offer,
      message: "Offer created successfully",
    });
  } catch (error) {
    console.error("Create offer error:", error);
    const errors = handleErrors(error);
    res.status(400).json({ error: "Error creating offer", errors });
  }
};

// Update offer controller
const updateOfferController = async (req, res) => {
  try {
    const {
      title,
      description,
      discountPercentage,
      startDate,
      endDate,
      roomIds,
      isActive,
      terms,
    } = req.body;

    const offer = await Offer.findById(req.params.id);
    if (!offer) {
      return res.status(404).json({ error: "Offer not found" });
    }

    // Validate discount percentage if provided
    if (discountPercentage !== undefined) {
      if (discountPercentage < 0 || discountPercentage > 100) {
        return res.status(400).json({
          error: "Discount percentage must be between 0 and 100",
        });
      }
      offer.discountPercentage = discountPercentage;
    }

    // Validate dates if provided
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (start >= end) {
        return res.status(400).json({
          error: "End date must be after start date",
        });
      }
      offer.startDate = start;
      offer.endDate = end;
    }

    // Update other fields
    if (title) offer.title = title;
    if (description) offer.description = description;
    if (roomIds) offer.roomIds = roomIds;
    if (isActive !== undefined) offer.isActive = isActive;
    if (terms !== undefined) offer.terms = terms;

    await offer.save();

    res.status(200).json({
      offer,
      message: "Offer updated successfully",
    });
  } catch (error) {
    console.error("Update offer error:", error);
    const errors = handleErrors(error);
    res.status(500).json({ error: "Error updating offer", errors });
  }
};

// Delete offer controller
const deleteOfferController = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) {
      return res.status(404).json({ error: "Offer not found" });
    }

    await Offer.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Offer deleted successfully" });
  } catch (error) {
    console.error("Delete offer error:", error);
    const errors = handleErrors(error);
    res.status(500).json({ error: "Error deleting offer", errors });
  }
};

// Toggle offer active status controller
const toggleOfferStatusController = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) {
      return res.status(404).json({ error: "Offer not found" });
    }

    offer.isActive = !offer.isActive;
    await offer.save();

    res.status(200).json({
      offer,
      message: `Offer ${
        offer.isActive ? "activated" : "deactivated"
      } successfully`,
    });
  } catch (error) {
    console.error("Toggle offer status error:", error);
    const errors = handleErrors(error);
    res.status(500).json({ error: "Error toggling offer status", errors });
  }
};

// Get active offers controller
const getActiveOffersController = async (req, res) => {
  try {
    const now = new Date();

    const activeOffers = await Offer.find({
      $and: [
        { startDate: { $lte: now } },
        { endDate: { $gte: now } },
        { isActive: true },
      ],
    }).sort({ discountPercentage: -1 });

    res.status(200).json({ activeOffers });
  } catch (error) {
    console.error("Get active offers error:", error);
    const errors = handleErrors(error);
    res.status(500).json({ error: "Error fetching active offers", errors });
  }
};

// Get offer statistics controller
const getOfferStatsController = async (req, res) => {
  try {
    const now = new Date();

    const totalOffers = await Offer.countDocuments();
    const activeOffers = await Offer.countDocuments({
      $and: [
        { startDate: { $lte: now } },
        { endDate: { $gte: now } },
        { isActive: true },
      ],
    });
    const expiredOffers = await Offer.countDocuments({
      endDate: { $lt: now },
    });
    const upcomingOffers = await Offer.countDocuments({
      startDate: { $gt: now },
    });

    // Get average discount percentage
    const avgDiscountResult = await Offer.aggregate([
      { $group: { _id: null, avgDiscount: { $avg: "$discountPercentage" } } },
    ]);
    const avgDiscount =
      avgDiscountResult.length > 0 ? avgDiscountResult[0].avgDiscount : 0;

    // Get offers by discount range
    const offersByDiscount = await Offer.aggregate([
      {
        $bucket: {
          groupBy: "$discountPercentage",
          boundaries: [0, 10, 20, 30, 40, 50, 100],
          default: "50+",
          output: {
            count: { $sum: 1 },
          },
        },
      },
    ]);

    res.status(200).json({
      stats: {
        totalOffers,
        activeOffers,
        expiredOffers,
        upcomingOffers,
        avgDiscount: Math.round(avgDiscount * 100) / 100,
        offersByDiscount,
      },
    });
  } catch (error) {
    console.error("Get offer stats error:", error);
    const errors = handleErrors(error);
    res.status(500).json({ error: "Error getting offer statistics", errors });
  }
};

module.exports = {
  getAllOffersController,
  getOfferByIdController,
  createOfferController,
  updateOfferController,
  deleteOfferController,
  toggleOfferStatusController,
  getActiveOffersController,
  getOfferStatsController,
};
