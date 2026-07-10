const DataModal = require("../Model/userLogin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer")


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "eswermahes@gmail.com",
        pass: "jezrivpyiyqahfwi"
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

    await user.save();

    res.json({
        message: "Email verified successfully"
    });

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

        const user = await DataModal.findOne({ userEmail });
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        const isMatch = await bcrypt.compare(userPassword, user.userPassword);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid password" });
        }
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,   //  Use  in production
            { expiresIn: "1h" }
        );
        console.log("JWT", token)
        //  Send token in httpOnly cookie
        // res.cookie(name, value, options)

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,      // true in production (https)
            sameSite: "lax", //This prevents CSRF attacks (Cross Site Request Forgery).
            maxAge: 60 * 60 * 1000 // 1 hour
        });
        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.userName,
                email: user.userEmail
            }
        });

        console.log("login success fully")

    } catch (err) {
        console.log("LOGIN Error:", err.message);
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = { addData, getData, loginUser, verifyOtp };
