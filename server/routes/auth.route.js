const express = require("express");
const User = require("../models/User");
const { authenticateToken } = require("../middleware/auth");
const { validateSignup, validateLogin } = require("../middleware/validation");
const {
  loginController,
  registerController,
  logoutController,
  verifyTokenController,
  getCurrentUserController,
} = require("../controllers/auth.controller");
const router = express.Router();

router.get("/debug/users", async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.json({
      count: users.length,
      users: users,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/signup", validateSignup, registerController);
router.post("/login", validateLogin, loginController);
router.post("/logout", logoutController);
router.get("/verify", verifyTokenController);
router.get("/me", authenticateToken, getCurrentUserController);

module.exports = router;
