
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import cookieParser from 'cookie-parser';
import RegisterModel from '../models/register.js';
import dotenv from 'dotenv';

const JWT_SECRET = "jwt_secret_key";


export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await RegisterModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
         if (!user.isVerified) {
            return res.status(403).json({ message: "Please verify your email before logging in." });
        }

        
        const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: "10d" });

       
        res.cookie("token", token, {
            httpOnly: true,
            secure: false, 
            sameSite: 'strict', 
            maxAge: 10 * 24 * 60 * 60 * 1000

        });
        res.status(200).json({ message: "Login successful" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const register =  async (req, res) => {
    const { name, email, password } = req.body;

    try {
       
        const existingUser = await RegisterModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

       
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await RegisterModel.create({ name, email, password: hashedPassword });
        res.status(201).json({ message: "Account created successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const verifyotp = async(req,res)=>{

    const{ email, otp} = req.body;
    try {
        const user = await RegisterModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
  
        if (user.otp === otp && user.otpExpires > Date.now()) {
            user.isVerified = true;
            user.otp = undefined; //we are Clearing otp after successful verification
            user.otpExpires = undefined; // Clearing expiration time
            await user.save();
    
        return res.status(200).json({ message: "User verified successfully!" });
       }
   else {
   return res.status(400).json({ message: "Invalid OTP." });
  }}catch (error) {
    console.error('Error verifying OTP:', error);
   return res.status(500).json({ message: "Verification failed." });
}

};


export const SendOtp = async(req,res)=>{
    const{email} = req.body;
    try{
    const user = await RegisterModel.findOne({email})
    if (!user) {
        // User not found
        return res.status(404).json({ message: 'User not found' });
    }
    function generateOtp() {
        return Math.floor(1000 + Math.random() * 9000);
      }
      
      const verifyotp = generateOtp();   

      const otpExpire = Date.now() + 5 * 60 * 1000;  // we are using it for 5min
      
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_ID, // Replace with your Gmail
            pass: process.env.GMAIL_PASS,
             // Replace with your email password or app-specific password
        }
        
    });

    // Email options
    const mailOptions = {
        from: process.env.GMAIL_ID,
        to: user.email,
        subject: 'StudyBuddies - veify with otp',
        html: `<h3>Your One Time Password (OTP): ${verifyotp} </h3>
               <p>OTP is valid only for 05:00 mins. Do not share this OTP with anyone.</p>`
      
   };
    await transporter.sendMail(mailOptions);
    user.otp = verifyotp;
    user.otpExpires = otpExpire; // Set expiration time
    await user.save();
   return res.status(200).json({ message: "OTP sent successfully!" });
    } 
catch (error) {
    console.error('Error sending OTP:', error);
    return res.status(500).json({ message: "Failed to send OTP." });
}

};


export const forgotpassword = async (req, res) => {
    const { email } = req.body;

    try {
        
        const user = await RegisterModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Email not found' });
        }

        
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "15min" });

       
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'saitejathota877@gmail.com', // Replace with your Gmail
                pass: 'khhtzzbxdlzuxfuz'
                 // Replace with your email password or app-specific password
            }
        });

        // Email options
        const mailOptions = {
            from: 'saitejathota877@gmail.com',
            to: user.email,
            subject: 'StudyBuddies - reset password',
           // text: `Click on the link to reset your password: http://localhost:5173/reset-password/${user._id}/${token}`
           html: `
           <h3>Reset Your Password</h3>
           <p>Click the link below to reset your password:</p>
           <a href="http://localhost:5173/reset-password/${user._id}/${token}">Reset Password</a>
           <p>Reset Link is valid for only 15:00 min.</p>`
       };
       // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Error sending email" });
            } else {
                return res.status(200).json({ message: "Password reset link sent successfully" });
            }
        });

    } 
    catch (err) {
        console.error("Error in /forgot-password:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};



export const passwordReset = async (req, res) => {
    const { id, token } = req.params;


    const { password } = req.body;
    
     jwt.verify(token, JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.json({ status: "error with token" });
        }

        try {
            
            const hashedPassword = await bcrypt.hash(password, 10);
            //console.log("Hashed Password:", hashedPassword);
            const user = await RegisterModel.findById(id);
            if (!user) {
                return res.status(404).json({ status: "User not found" });
            }
            
            await RegisterModel.findByIdAndUpdate(id, { password: hashedPassword },{ new: true });
           

            res.json({ status: "Password successfully updated" });
        } 
        catch (error) {
            res.json({ status: error.message || "An error occurred" });
        }
    });
};
