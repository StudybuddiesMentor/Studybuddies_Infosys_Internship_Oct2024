//const mongoose = require('mongoose');
import mongoose from 'mongoose';
const RegisterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified : {
        type: Boolean,
        required : true,
        default : false
    },
    otp: {
        type: String, 
    },
    otpExpires: {
        type: Date, 
    }
}, { timestamps: true });
    


const RegisterModel = mongoose.model("register", RegisterSchema);
export default RegisterModel;
