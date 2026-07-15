const mongoose = require("mongoose")
const dataSchema = mongoose.Schema({
    userName: {
        type: String, required: true
    },
    userEmail: {
        type: String, required: true, unique: true   // only one email allowed
    },
    userPassword: {
        type: String, required: true,
    },
    otp: Number,
    otpExpire: Date,
     isVerified: {
        type: Boolean,
        default: false
    },
    
},{ timestamps: true })

const DataModal = mongoose.model("userdata", dataSchema)
module.exports = DataModal