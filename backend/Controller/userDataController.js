const DataModal = require("../Model/userRegister");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("node:crypto");
const dns = require("node:dns");

// Prefer IPv4 when connecting to SMTP services.
// This may help with Render IPv6 SMTP connection errors.
try {
  dns.setDefaultResultOrder("ipv4first");
} catch (error) {
  console.error("DNS configuration warning:", error.message);
}


// EMAIL CONFIGURATION


const transporter = nodemailer.createTransport({
  host: process.env.BREVO_SMTP_HOST,
  port: Number(process.env.BREVO_SMTP_PORT || 587),
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_LOGIN,
    pass: process.env.BREVO_SMTP_KEY
  }
});


// COMMON HELPERS


const normalizeEmail = (email) => {
  return typeof email === "string" ? email.trim().toLowerCase() : "";
};

const generateOtp = () => {
  return crypto.randomInt(1000, 10000).toString();
};

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isProduction = process.env.NODE_ENV === "production";

// Use the same cookie options for login and logout.
const getCookieOptions = () => ({
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  path: "/",
  maxAge: 24 * 60 * 60 * 1000,
});

const sendOtpEmail = async (email, otp, type = "verification") => {
  if (
    !process.env.BREVO_SMTP_LOGIN ||
    !process.env.BREVO_SMTP_KEY ||
    !process.env.BREVO_SENDER_EMAIL
  ) {
    throw new Error("Brevo SMTP configuration is missing");
  }

  const isReset = type === "reset";

  const subject = isReset
    ? "Maxara Password Reset OTP"
    : "Maxara Email Verification OTP";

  const message = isReset
    ? `Your Maxara password reset OTP is ${otp}. It expires in 5 minutes.`
    : `Your Maxara email verification OTP is ${otp}. It expires in 5 minutes.`;

  return transporter.sendMail({
    from: {
      name: "Maxara",
      address: process.env.BREVO_SENDER_EMAIL
    },
    to: email,
    subject,
    text: message
  });
};


// REGISTER / RESEND VERIFICATION OTP
// POST /api/...


const addData = async (req, res) => {
  try {
    const userName =
      typeof req.body.userName === "string"
        ? req.body.userName.trim()
        : "";

    const userEmail = normalizeEmail(req.body.userEmail);
    const userPass = req.body.userPass;

    if (!userName || !userEmail || !userPass) {
      return res.status(400).json({
        success: false,
        error: "Name, email and password are required",
      });
    }

    if (!isValidEmail(userEmail)) {
      return res.status(400).json({
        success: false,
        error: "Please enter a valid email address",
      });
    }

    if (userPass.length < 6) {
      return res.status(400).json({
        success: false,
        error: "Password must be at least 6 characters",
      });
    }

    // Look for an account with this email.
    let user = await DataModal.findOne({ userEmail });

    if (user && user.isVerified) {
      return res.status(409).json({
        success: false,
        error: "Email already exists. Please login.",
      });
    }

    // Hash the password before saving.
    const hashedPassword = await bcrypt.hash(userPass, 10);

    // Generate an OTP valid for 5 minutes.
    const otp = generateOtp();
    const otpExpire = new Date(Date.now() + 5 * 60 * 1000);

    if (user && !user.isVerified) {
      // Allow an unverified user to try registration again.
      // Update the existing record instead of creating a duplicate.
      user.userName = userName;
      user.userPassword = hashedPassword;
      user.otp = otp;
      user.otpExpire = otpExpire;
    } else {
      user = new DataModal({
        userName,
        userEmail,
        userPassword: hashedPassword,
        otp,
        otpExpire,
        isVerified: false,
      });
    }

    // Save the account and its OTP.
    await user.save();

    // If email sending fails, the account remains unverified.
    // The user can submit registration again to receive a new OTP.
    try {
      await sendOtpEmail(userEmail, otp, "verification");
    } catch (emailError) {
      console.error("Verification email failed:", emailError.message);

      return res.status(503).json({
        success: false,
        error:
          "Your account is saved but the verification email could not be sent. Please try registering again to receive a new OTP.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Registration successful. OTP sent to your email.",
      userEmail,
    });
  } catch (error) {
    console.error("Registration error:", error.message);

    return res.status(500).json({
      success: false,
      error: "Registration failed. Please try again.",
    });
  }
};


// VERIFY REGISTRATION OTP


const verifyOtp = async (req, res) => {
  try {
    const userEmail = normalizeEmail(req.body.userEmail);
    const otp = String(req.body.otp || "").trim();

    if (!userEmail || !otp) {
      return res.status(400).json({
        success: false,
        error: "Email and OTP are required",
      });
    }

    const user = await DataModal.findOne({ userEmail });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found. Please register first.",
      });
    }

    if (user.isVerified) {
      return res.status(200).json({
        success: true,
        message: "Email is already verified",
      });
    }

    if (!user.otp || !user.otpExpire) {
      return res.status(400).json({
        success: false,
        error: "OTP not found. Please register again to get a new OTP.",
      });
    }

    if (new Date(user.otpExpire).getTime() < Date.now()) {
      return res.status(400).json({
        success: false,
        error: "OTP expired. Please register again to get a new OTP.",
      });
    }

    if (String(user.otp) !== otp) {
      return res.status(400).json({
        success: false,
        error: "Invalid OTP",
      });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpire = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully. You can now login.",
    });
  } catch (error) {
    console.error("Verify OTP error:", error.message);

    return res.status(500).json({
      success: false,
      error: "Email verification failed. Please try again.",
    });
  }
};


// GET ALL USERS
// IMPORTANT: Protect this route with admin authentication.


const getData = async (req, res) => {
  try {
    const users = await DataModal.find().select(
      "-userPassword -otp -otpExpire -resetPasswordOTP -resetPasswordOTPExpire"
    );

    return res.status(200).json(users);
  } catch (error) {
    console.error("Get users error:", error.message);

    return res.status(500).json({
      success: false,
      error: "Unable to fetch users",
    });
  }
};


// LOGIN


const loginUser = async (req, res) => {
  try {
    const userEmail = normalizeEmail(req.body.userEmail);
    const userPassword = req.body.userPassword;

    if (!userEmail || !userPassword) {
      return res.status(400).json({
        success: false,
        error: "Email and password are required",
      });
    }

    const user = await DataModal.findOne({ userEmail });

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password",
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        error: "Please verify your email before logging in",
      });
    }

    const passwordMatches = await bcrypt.compare(
      userPassword,
      user.userPassword
    );

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password",
      });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not configured");

      return res.status(500).json({
        success: false,
        error: "Server authentication configuration error",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Store the JWT in an HTTP-only cookie.
    res.cookie("token", token, getCookieOptions());

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.userName,
        email: user.userEmail,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);

    return res.status(500).json({
      success: false,
      error: "Login failed. Please try again.",
    });
  }
};


// FORGOT PASSWORD


const forgotPassword = async (req, res) => {
  try {
    const userEmail = normalizeEmail(req.body.userEmail);

    if (!userEmail || !isValidEmail(userEmail)) {
      return res.status(400).json({
        success: false,
        error: "Please provide a valid email address",
      });
    }

    const user = await DataModal.findOne({ userEmail });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "No account found with this email address",
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        error: "Please verify your email before resetting your password",
      });
    }

    const otp = generateOtp();
    const otpExpire = new Date(Date.now() + 5 * 60 * 1000);

    user.resetPasswordOTP = otp;
    user.resetPasswordOTPExpire = otpExpire;

    await user.save();

    try {
      await sendOtpEmail(userEmail, otp, "reset");
    } catch (emailError) {
      console.error("Password reset email failed:", emailError.message);

      // Clear the unusable OTP if the email could not be sent.
      user.resetPasswordOTP = null;
      user.resetPasswordOTPExpire = null;
      await user.save();

      return res.status(503).json({
        success: false,
        error: "Unable to send the password reset email. Please try again later.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Password reset OTP sent successfully",
    });
  } catch (error) {
    console.error("Forgot password error:", error.message);

    return res.status(500).json({
      success: false,
      error: "Unable to process password reset",
    });
  }
};


// VERIFY PASSWORD RESET OTP


const verifyResetOtp = async (req, res) => {
  try {
    const userEmail = normalizeEmail(req.body.userEmail);
    const otp = String(req.body.otp || "").trim();

    if (!userEmail || !otp) {
      return res.status(400).json({
        success: false,
        error: "Email and OTP are required",
      });
    }

    const user = await DataModal.findOne({ userEmail });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    if (!user.resetPasswordOTP || !user.resetPasswordOTPExpire) {
      return res.status(400).json({
        success: false,
        error: "Reset OTP not found. Please request a new OTP.",
      });
    }

    if (
      new Date(user.resetPasswordOTPExpire).getTime() < Date.now()
    ) {
      return res.status(400).json({
        success: false,
        error: "OTP expired. Please request a new OTP.",
      });
    }

    if (String(user.resetPasswordOTP) !== otp) {
      return res.status(400).json({
        success: false,
        error: "Invalid OTP",
      });
    }

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.error("Verify reset OTP error:", error.message);

    return res.status(500).json({
      success: false,
      error: "Unable to verify OTP",
    });
  }
};


// RESET PASSWORD


const resetPassword = async (req, res) => {
  try {
    const userEmail = normalizeEmail(req.body.userEmail);
    const otp = String(req.body.otp || "").trim();
    const newPassword = req.body.newPassword;

    if (!userEmail || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        error: "Email, OTP and new password are required",
      });
    }

    if (typeof newPassword !== "string" || newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        error: "Password must be at least 6 characters",
      });
    }

    const user = await DataModal.findOne({ userEmail });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    if (!user.resetPasswordOTP || !user.resetPasswordOTPExpire) {
      return res.status(400).json({
        success: false,
        error: "Reset OTP not found. Please request a new OTP.",
      });
    }

    if (
      new Date(user.resetPasswordOTPExpire).getTime() < Date.now()
    ) {
      return res.status(400).json({
        success: false,
        error: "OTP expired. Please request a new OTP.",
      });
    }

    if (String(user.resetPasswordOTP) !== otp) {
      return res.status(400).json({
        success: false,
        error: "Invalid OTP",
      });
    }

    user.userPassword = await bcrypt.hash(newPassword, 10);
    user.resetPasswordOTP = null;
    user.resetPasswordOTPExpire = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully. Please login with your new password.",
    });
  } catch (error) {
    console.error("Reset password error:", error.message);

    return res.status(500).json({
      success: false,
      error: "Unable to reset password",
    });
  }
};


// LOGOUT


const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      path: "/",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout error:", error.message);

    return res.status(500).json({
      success: false,
      error: "Logout failed",
    });
  }
};

// EXPORT CONTROLLERS

module.exports = {
  addData,
  getData,
  loginUser,
  verifyOtp,
  forgotPassword,
  verifyResetOtp,
  resetPassword,
  logoutUser,
};