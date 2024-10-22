// const express = require('express');
import express from 'express';
const router = express.Router();
//const router = express.Router({mergeParams:true});
//const registercontroller = require("../controllers/register.js")
// import registercontroller from './controllers/register.js'
import {login, register, verifyotp, SendOtp, forgotpassword, passwordReset} from '../controllers/register.js';




router.post("/login" , login);

router.post("/register", register);

router.post("/verify-otp",verifyotp);

router.post("/send-otp", SendOtp);

router.post("/forgot-password", forgotpassword);

router.post("/reset-password/:id/:token", passwordReset)

export default router;
