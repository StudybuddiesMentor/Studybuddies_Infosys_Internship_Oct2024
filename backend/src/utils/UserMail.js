import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();



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



export {hashPassword,sendmailOtp};