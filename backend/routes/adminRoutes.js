const express = require("express");

const {
  loginAdmin,
  logoutAdmin,
  getAdminProfile,
} = require("../Controller/adminController");

const adminAuth = require("../middleware/adminAuth");

const router = express.Router();

// Public: log in
router.post("/login", loginAdmin);

// Protected: verify current admin session
router.get("/me", adminAuth, getAdminProfile);

// Logout
router.post("/logout", adminAuth, logoutAdmin);

module.exports = router;