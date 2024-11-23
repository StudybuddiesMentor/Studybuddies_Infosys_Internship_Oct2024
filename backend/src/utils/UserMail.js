import bcrypt from "bcrypt";




async function hashPassword(password){

 const hashedPassword = await bcrypt.hash(password, 10);

return hashedPassword; 
}

function sendmailOtp(email){
    const verifyotp =  Math.floor(1000 + Math.random() * 9000);
    const otpExpireTime = Date.now() + 5 * 60 * 1000;
    const mailOptions = {
        from: process.env.GMAIL_ID,
        to: email,
        subject: 'StudyBuddies - veify with otp',
        html: `<h3>Your One Time Password (OTP): ${verifyotp} </h3>
        <p>OTP is valid only for 05:00 mins. Do not share this OTP with anyone.</p>`
      
   };

   return {mailOptions, verifyotp,otpExpireTime}


}

function passwordResetEmail(email){
    const mailOptions = {
        from: 'process.env.GMAIL_ID;',
        to: email,
        subject: 'StudyBuddies - reset password',
       html: 
       "<h3>Reset Your Password</h3><p>Click the link below to reset your password:</p><a href='http://localhost:5173/reset-password/${user._id}/${token}'>Reset Password</a><p>Reset Link is valid for only 15:00 min.</p>"
   };
   return mailOptions;
}

export {hashPassword,sendmailOtp,passwordResetEmail};