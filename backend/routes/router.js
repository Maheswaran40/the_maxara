const express = require("express");
const router = express.Router();

const { addData, getData, loginUser,verifyOtp ,logoutUser,forgotPassword,verifyResetOtp,resetPassword,} = require("../Controller/userDataController");
const authMiddleware = require("../middleware/auth");

// 🔹 Register
router.post("/register", addData);

// 🔹 Login (POST not GET)
router.post("/login", loginUser);

// VERIFY SIGNUP OTP
router.post("/verify-otp", verifyOtp);

// FORGOT PASSWORD
router.post(
    "/forgot-password",
    forgotPassword
);

// VERIFY RESET PASSWORD OTP
router.post(
    "/verify-reset-otp",
    verifyResetOtp
);


// RESET PASSWORD
router.post(
    "/reset-password",
    resetPassword
);


// logout
router.post(
    "/logout",
    logoutUser
);

// 🔹 Get all users
router.get("/users", getData);

// 🔹 Protected Route
router.get("/dashboard", authMiddleware, (req, res) => {
   console.log( res.json({ message: "Welcome", user: req.user }))
});

module.exports = router;
