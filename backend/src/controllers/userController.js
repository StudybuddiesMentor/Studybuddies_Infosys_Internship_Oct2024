import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import User from "../db/User.js";
import dotenv from "dotenv";
import { extractPublicIdFromUrl } from "../middlewares/ImageValidate.js";
import cloudinary from 'cloudinary'; 
const cloudinaryV2 = cloudinary.v2;

dotenv.config();


const JWT_SECRET = "jwt_secret_key";

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
         if (!user.is_verified) {
            return res.status(403).json({ message: "Please verify your email before logging in." });
        }
       
        
        const token = jwt.sign({ id : user._id, email: user.email }, JWT_SECRET, { expiresIn: "10d" });

        
        res.cookie("token", token, {
            httpOnly: true, 
            maxAge: 10 * 24 * 60 * 60 * 1000

        });
        
        res.status(200).json({ message: "Login successful",token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const registerUser =  async (req, res) => {
    const { username, email, password } = req.body;

    try {
       
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

       
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({ username, email, password: hashedPassword });
        res.status(201).json({ message: "Account created successfully" ,});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const verifyotp = async(req,res)=>{

    const{ email, otp} = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
  
        if (user.otp === otp && user.otpExpires > Date.now()) {
            user.is_verified = true;
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
    const user = await User.findOne({email})
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
        port :465,
        secure : true,
        logger : false,
        debug:true,
        auth: {
            user: process.env.GMAIL_ID, // Replace with your Gmail
            pass: process.env.GMAIL_PASS,
             // Replace with your email password or app-specific password
        },
        tls:{
          rejectUnauthorized : true
        }
        
    });

    // Email options
    const mailOptions = {
        from: process.env.GMAIL_ID,
        to: user.email,
        subject: 'StudyBuddies - veify with otp',
        html: <h3>Your One Time Password (OTP): ${verifyotp} </h3>
               <p>OTP is valid only for 05:00 mins. Do not share this OTP with anyone.</p>
      
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


export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Email not found' });
        }

        
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "15min" });

       
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            port :465,
            secure : true,
            logger : false,
            debug:true,
            auth: {
                user: process.env.GMAIL_ID, // Replace with your Gmail
                pass: process.env.GMAIL_PASS,
                 // Replace with your email password or app-specific password
            },
            tls:{
              rejectUnauthorized : true
            }
            
        });
    
        const mailOptions = {
            from: 'process.env.GMAIL_ID;',
            to: user.email,
            subject: 'StudyBuddies - reset password',
           html: 
           <h3>Reset Your Password</h3>
           <p>Click the link below to reset your password:</p>
           <a href="http://localhost:5173/reset-password/${user._id}/${token}">Reset Password</a>
           <p>Reset Link is valid for only 15:00 min.</p>
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
        console.error("Error in forgot-password:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};



export const passwordReset = async (req, res) => {
    const { id, token } = req.params;


    const { password } = req.body;
    
     jwt.verify(token, JWT_SECRET, async(err, decoded) => {
        if (err) {
            return res.json({ message: "error with token" });
        }

        try {
            
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log("Hashed Password:", hashedPassword);
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ status: "User not found" });
            }
            
            await User.findByIdAndUpdate(id, { password: hashedPassword },{ new: true });
           

           return res.status(200).json({ message: "Password successfully updated" });
        } 
        catch (error) {
            return registerUser.status(500).json({ message :  "An error occurred" , error: error.message});
        }
    });
};

export const updateUserProfile =  async (req, res) => {
    const {  gender, email,fullName,username,professionalTitle,bio } = req.body;
    
    try{
    const user = await User.findById(req.user.id);
    
    if(!user){
        return res.status(404).json({ message: "User not found" })
    } 
         user.gender = gender|| user.gender;
         user.fullName = fullName || user.fullName;
         user.bio = bio || user.bio;
         user.professionalTitle = professionalTitle || user.professionalTitle;
         user.username = username || user.username;
         if(email){
         user.email = email 
      }
         user.updatedAt = Date.now();
         await user.save();
         
         return res.status(200).json({ message:"Personal Information has been updated", user });
        }
     catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const updateUserPic = async (req, res) => {
    const profilePic = req.file;
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (profilePic) {
            if (user.profilePic && user.profilePic.url) {
                const publicId = extractPublicIdFromUrl(user.profilePic.url);
                if (publicId) {
                    await cloudinary.v2.uploader.destroy(publicId);
                }
            }
            const url = profilePic.path; 
            const filename = profilePic.filename;  
            user.profilePic = { url, filename }; 
            await user.save();
            return res.status(200).json({ message: "Profile picture has been updated", profilePicUrl : user.profilePic.url });
        }

        return res.status(400).json({ message: "No profile picture uploaded" });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const getUserProfile = async(req,res)=>{
    try{
        const user = await User.findById(req.user.id)
        if(!user){
            return res.status(404).json({message:"user not found"});
        }
        return res.status(200).json({message:"User Profile",user})
        

    }
    catch(error){
        res.status(500).json({message:"Internal Server error",error:error.message})
    }

}

// Logout user 

export const logoutUser = async (req, res) => {
    try {
    const token = req.cookies.token; // Get token before clearing
    if (!token) {
      return res.status(400).json({ message: 'No token found, user not logged in' });
    }

    // Clear the cookie
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    // Log the logout action
    console.log(User logged out successfully at ${new Date().toISOString()});

    return res.status(200).json({
      message: 'User logged out successfully',
      user: req.user ? { id: req.user.id, email: req.user.email } : null,
    });
  } catch (error) {
    console.error("Error logging out user:", error.message, { errorStack: error.stack });
    return res.status(500).json({ 
      message: "Error logging out user", 
      error: error.message 
    });
  }
};