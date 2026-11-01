require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env"),
});

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Admin = require("../Model/Admin");
const connectDB = require("../config/db");

async function createAdmin() {
  try {
    if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
      throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD are required");
    }

    if (process.env.ADMIN_PASSWORD.length < 12) {
      throw new Error("Use an admin password of at least 12 characters");
    }

    await connectDB();

    const email = process.env.ADMIN_EMAIL.trim().toLowerCase();

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      console.log("This admin account already exists.");
      console.log("No changes were made.");
      return;
    }

    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD,
      12
    );

    await Admin.create({
      email,
      password: hashedPassword,
      role: "admin",
    });

    console.log("Initial admin account created successfully.");
    console.log("Admin email:", email);
    console.log("Password was securely hashed.");
  } catch (error) {
    console.error("Admin creation failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

createAdmin();