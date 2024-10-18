const express = require('express');
const router = express.Router();
//const router = express.Router({mergeParams:true});
const registercontroller = require("../controllers/register.js")


router.post("/login" , registercontroller.login);

router.post("/register",registercontroller.register);

router.post("/verify-otp",registercontroller.verifyotp);

router.post("/send-otp", registercontroller.SendOtp);

router.post("/forgot-password", registercontroller.forgotpassword);

router.post("/reset-password/:id/:token", registercontroller.passwordReset)

module.exports = router;
