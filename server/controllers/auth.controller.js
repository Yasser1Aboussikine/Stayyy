const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

// Constants
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const MAX_AGE = 7 * 24 * 60 * 60; //7 days
const createToken = (userId, email, role) => {
  return jwt.sign({ userId, email, role }, JWT_SECRET, {
    expiresIn: MAX_AGE,
  });
};

const handleErrors = (error) => {
  let errors = {};

  // Duplicate email error
  if (error.code === 11000) {
    errors.email = "Email is already registered";
    return errors;
  }

  // Validation errors
  if (error.name === "ValidationError") {
    Object.values(error.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const loginController = async (req, res) => {
  console.log("Login attempt with data:", req.body);
  const { identifier, password } = req.body;

  try {
    // Find the user by email or userName
    const userInfo = await User.findOne({
      $or: [{ email: identifier }, { userName: identifier }],
    });
    if (!userInfo) {
      return res.status(400).json({ error: "Email or username not found" });
    }

    const auth = await bcrypt.compare(password, userInfo.password);
    if (!auth) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    // Generate a JWT token
    const token = createToken(userInfo._id, userInfo.email, userInfo.role);


    res.cookie("jwt", token, {
      maxAge: MAX_AGE * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      sameSite: "strict", // Prevents CSRF attacks
    });

   
    res.status(200).json({
      user: {
        _id: userInfo._id,
        userName: userInfo.userName,
        email: userInfo.email,
        role: userInfo.role,
        createdAt: userInfo.createdAt,
      },
      token: token, // Also send token in response body for frontend storage
      message: "Login successful",
    });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const registerController = async (req, res) => {
  try {
    console.log("Registration attempt with data:", {
      userName: req.body.userName,
      email: req.body.email,
      role: req.body.role,
    });

    if (!req.body || typeof req.body !== "object") {
      console.log("Invalid request data");
      return res.status(400).json({ error: "Invalid request data" });
    }

    const { userName, email, password, role } = req.body;
    if (!userName || !email || !password) {
      console.log("Missing required fields:", {
        userName: !!userName,
        email: !!email,
        password: !!password,
      });
      return res
        .status(400)
        .json({ error: "Username, email, and password are required" });
    }

    const userRole = role || "client";
    console.log("Attempting to create user with role:", userRole);

    const userInfo = await User.create({
      userName,
      email,
      password,
      role: userRole,
    });

    console.log("User created successfully:", {
      id: userInfo._id,
      email: userInfo.email,
      role: userInfo.role,
    });

    const token = createToken(userInfo._id, userInfo.email, userInfo.role);

    res.cookie("jwt", token, {
      maxAge: MAX_AGE * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

   
    res.status(201).json({
      user: {
        _id: userInfo._id,
        userName: userInfo.userName,
        email: userInfo.email,
        role: userInfo.role,
        createdAt: userInfo.createdAt,
      },
      token: token, 
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Registration error details:", {
      name: error.name,
      message: error.message,
      code: error.code,
      errors: error.errors,
    });

    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};


const logoutController = (req, res) => {

  res.cookie("jwt", "", {
    maxAge: 1,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.status(200).json({ message: "User logged out successfully" });
};


const verifyTokenController = async (req, res) => {
  try {

    const authHeader = req.headers["authorization"];
    let token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    res.status(200).json({
      user: {
        _id: user._id,
        userName: user.userName,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
      message: "Token is valid",
    });
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({ error: "Invalid token" });
  }
};

const getCurrentUserController = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      user: {
        _id: user._id,
        userName: user.userName,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Get current user error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  loginController,
  registerController,
  logoutController,
  verifyTokenController,
  getCurrentUserController,
};
