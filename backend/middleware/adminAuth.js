const jwt = require("jsonwebtoken");

const adminAuth = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please log in as an admin",
      });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        success: false,
        message: "Authentication is not configured",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      issuer: "maxara-admin",
      audience: "maxara-admin-panel",
    });

    if (!decoded.adminId || decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access denied",
      });
    }

    req.admin = {
      adminId: decoded.adminId,
      role: decoded.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired session. Please log in again.",
    });
  }
};

module.exports = adminAuth;