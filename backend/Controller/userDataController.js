const DataModal = require("../Model/userRegister");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer")
const crypto = require("crypto")



const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
// REGISTER
const addData = async (req, res) => {
    try {
        const { userName, userEmail, userPass } = req.body;

        const existing = await DataModal.findOne({ userEmail });

        if (existing) {
            return res.status(400).json({
                error: "Email already exists, please login"
            });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(userPass, saltRounds);
        const otp = Math.floor(1000 + Math.random() * 9000)
        const user_data = new DataModal({
            userName,
            userEmail,
            userPassword: hashedPassword,
            otp: otp,
            otpExpire: Date.now() + 300000, // 5 minutes
            isVerified: false
        });

        await user_data.save();

        // send email


        await transporter.sendMail({
            from: userName,
            to: userEmail,
            subject: "Email Verification OTP",
            text: `Your OTP is ${otp}`
        })

        res.status(200).json({ message: "Data added Successfully" });

    } catch (err) {
        console.log("POST Error:", err.message);
        res.status(500).json({ error: "Server error" });
    }
};

// verify email
const verifyOtp = async (req, res) => {

    try {
        const { userEmail, otp } = req.body;

        const user = await DataModal.findOne({ userEmail });

        if (!user) {
            return res.json({ message: "User not found" });
        }

        if (user.otpExpire < Date.now()) {
            return res.json({ message: "OTP expired" });
        }

        if (user.otp != otp) {
            return res.json({ message: "Invalid OTP" });
        }

        user.isVerified = true;
        user.otp = null;
        user.otpExpire = null;
        await user.save();

        res.json({
            message: "Email verified successfully"
        });
    }
    catch (error) {
        console.log(
            "VERIFY OTP Error:",
            error.message
        );

        res.status(500).json({
            error: "Server error"
        });
    }

};

// GET ALL USERS
const getData = async (req, res) => {
    try {
        const get_Data = await DataModal.find();
        res.status(200).json(get_Data);

    } catch (err) {
        console.log("GET Error:", err.message);
        res.status(500).json({ error: "Server error" });
    }
};

// LOGIN

const loginUser = async (req, res) => {
    try {
        const { userEmail, userPassword } = req.body;

        // 1. Find user
        const user = await DataModal.findOne({ userEmail });

        if (!user) {
            return res.status(400).json({
                error: "User not found"
            });
        }

        // 2. Check email verification
        if (!user.isVerified) {
            return res.status(403).json({
                error: "Please verify your email before login"
            });
        }

        // 3. Check password
        const isMatch = await bcrypt.compare(
            userPassword,
            user.userPassword
        );

        if (!isMatch) {
            return res.status(400).json({
                error: "Invalid password"
            });
        }

        // 4. Create JWT
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        console.log("JWT", token);

        // 5. Store JWT in httpOnly cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // true in production with HTTPS
            sameSite: "lax",
            maxAge: 30 * 24 * 60 * 60 * 1000
        });

        // 6. Send response
        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.userName,
                email: user.userEmail
            }
        });

        console.log("Login successfully");

    } catch (err) {
        console.log("LOGIN Error:", err.message);

        res.status(500).json({
            error: "Server error"
        });
    }
};



// forgot password

 const forgotPassword = async (req, res) => {
  try {
    const { userEmail } = req.body;

    console.log("========== FORGOT PASSWORD ==========");
    console.log("EMAIL RECEIVED:", userEmail);

    const user = await DataModal.findOne({ userEmail });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    // Generate 4 digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    // OTP expires after 5 minutes
    const otpExpire = new Date(Date.now() + 5 * 60 * 1000);

    console.log("GENERATED OTP:", otp);
    console.log("GENERATED EXPIRY:", otpExpire);

    // Save reset OTP
    user.resetPasswordOTP = otp;
    user.resetPasswordOTPExpire = otpExpire;

    await user.save();

    // Check what was actually saved
    console.log("OTP SAVED IN DB:", user.resetPasswordOTP);
    console.log("EXPIRY SAVED IN DB:", user.resetPasswordOTPExpire);

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: "Maxara Password Reset OTP",
      text: `Your password reset OTP is ${otp}. This OTP will expire in 5 minutes.`,
    });

    console.log("OTP EMAIL SENT");
    console.log("====================================");

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });

  } catch (error) {
    console.error("FORGOT PASSWORD ERROR:", error);

    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

// =====================================================
// VERIFY FORGOT PASSWORD OTP
// =====================================================

const verifyResetOtp = async (req, res) => {
  try {
    const { userEmail, otp } = req.body;

    console.log("========== VERIFY RESET OTP ==========");
    console.log("EMAIL:", userEmail);
    console.log("OTP FROM FRONTEND:", otp);

    const user = await DataModal.findOne({ userEmail });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    console.log("OTP FROM DB:", user.resetPasswordOTP);
    console.log("OTP EXPIRY FROM DB:", user.resetPasswordOTPExpire);

    if (!user.resetPasswordOTP || !user.resetPasswordOTPExpire) {
      return res.status(400).json({
        success: false,
        error: "OTP not found",
      });
    }

    if (user.resetPasswordOTPExpire < new Date()) {
      return res.status(400).json({
        success: false,
        error: "OTP expired",
      });
    }

    if (user.resetPasswordOTP !== otp.toString()) {
      return res.status(400).json({
        success: false,
        error: "Invalid OTP",
      });
    }

    console.log("OTP VERIFIED SUCCESSFULLY");
    console.log("====================================");

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });

  } catch (error) {
    console.error("VERIFY RESET OTP ERROR:", error);

    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};


// =====================================================
// RESET PASSWORD
// =====================================================

const resetPassword = async (req, res) => {
  try {
    const { userEmail, otp, newPassword } = req.body;

    console.log("RESET PASSWORD BODY:", {
      userEmail,
      otp,
      hasPassword: !!newPassword,
    });

    const user = await DataModal.findOne({ userEmail });

    console.log("USER FOUND:", !!user);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    console.log("RESET OTP FROM DB:", user.resetPasswordOTP);
    console.log("RESET OTP EXPIRY FROM DB:", user.resetPasswordOTPExpire);
    console.log("RESET OTP FROM FRONTEND:", otp);
    console.log(
      "OTP MATCH:",
      user.resetPasswordOTP === otp.toString()
    );

    if (!user.resetPasswordOTP || !user.resetPasswordOTPExpire) {
      return res.status(400).json({
        success: false,
        error: "OTP not found",
      });
    }

    if (user.resetPasswordOTPExpire < Date.now()) {
      return res.status(400).json({
        success: false,
        error: "OTP expired",
      });
    }

    if (user.resetPasswordOTP !== otp.toString()) {
      return res.status(400).json({
        success: false,
        error: "Invalid OTP",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        error: "Password must be at least 6 characters",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.userPassword = hashedPassword;
    user.resetPasswordOTP = null;
    user.resetPasswordOTPExpire = null;

    await user.save();

    console.log("PASSWORD RESET SUCCESS");

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });

  } catch (error) {
    console.error("RESET PASSWORD ERROR:", error);

    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};


// =====================================================
// LOGOUT
// =====================================================

const logoutUser = async (req, res) => {

    try {

        res.clearCookie(
            "token",
            {
                httpOnly: true,

                secure: false,

                sameSite: "lax"
            }
        );


        res.status(200).json({

            success: true,

            message:
                "Logout successful"

        });

    } catch (error) {

        res.status(500).json({
            error: "Logout failed"
        });

    }
};

module.exports = { addData, getData, loginUser, verifyOtp, forgotPassword, verifyResetOtp, resetPassword, logoutUser };
