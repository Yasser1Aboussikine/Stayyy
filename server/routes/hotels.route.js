const express = require("express");
const router = express.Router();
const {
  getAllRoomsController,
  getRoomByIdController,
  createRoomController,
  updateRoomController,
  deleteRoomController,
  searchAvailableRoomsController,
  getRoomStatsController,
} = require("../controllers/room.controller");
const { authenticateToken } = require("../middleware/auth");

// Public routes (no authentication required)
router.get("/", getAllRoomsController);
router.get("/available", searchAvailableRoomsController);
router.get("/stats", getRoomStatsController);
router.get("/:id", getRoomByIdController);

// Protected routes (authentication required)
router.use(authenticateToken);

// Admin only routes
router.post("/", createRoomController);
router.put("/:id", updateRoomController);
router.delete("/:id", deleteRoomController);

module.exports = router;
