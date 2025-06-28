const jwt = require("jsonwebtoken");
const User = require("../models/User");

//remove the testing JWT_SECRET
const JWT_SECRET = process.env.JWT_SECRET;

const authenticateToken = async (req, res, next) => {
  try {

    const authHeader = req.headers["authorization"];
    let token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return res.status(401).json({ message: "Access token required" });
    }

    console.log("Token being verified:", token);
    console.log("JWT_SECRET:", JWT_SECRET);

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(403).json({ message: "Invalid token" });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(403).json({ message: "Token expired" });
    }
    console.error("Authentication error:", error);
    res.status(500).json({ message: "Authentication error" });
  }
};

const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Insufficient permissions",
        required: roles,
        current: req.user.role,
      });
    }

    next();
  };
};

//to check if user is admin
const requireAdmin = requireRole(["admin"]);

//check if user is client or admin
const requireClientOrAdmin = requireRole(["client", "admin"]);

module.exports = {
  authenticateToken,
  requireRole,
  requireAdmin,
  requireClientOrAdmin,
};
