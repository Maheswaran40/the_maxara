const Admin = require("../Model/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const isProduction = process.env.NODE_ENV === "production";

const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  path: "/",
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        success: false,
        message: "Authentication is not configured",
      });
    }

    const admin = await Admin.findOne({
      email: email.trim().toLowerCase(),
    }).select("+password");

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        adminId: admin._id.toString(),
        role: admin.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
        issuer: "maxara-admin",
        audience: "maxara-admin-panel",
      }
    );

    res.cookie("token", token, {
      ...cookieOptions,
      maxAge: 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Admin login successful",
      admin: {
        id: admin._id,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Admin login error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to log in",
    });
  }
};

const logoutAdmin = (req, res) => {
  res.clearCookie("token", cookieOptions);

  return res.status(200).json({
    success: true,
    message: "Admin logged out successfully",
  });
};

const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.adminId).select(
      "_id email role createdAt"
    );

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Admin account not found",
      });
    }

    return res.status(200).json({
      success: true,
      admin,
    });
  } catch (error) {
    console.error("Admin profile error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch admin profile",
    });
  }
};

module.exports = {
  loginAdmin,
  logoutAdmin,
  getAdminProfile,
};