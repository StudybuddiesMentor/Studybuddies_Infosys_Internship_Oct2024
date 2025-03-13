import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import User from "../db/User.js";
import Deck from "../db/Deck.js";
import Card from "../db/Card.js";
import DeckTag from "../db/DeckTag.js";
import dotenv from "dotenv";
import { extractPublicIdFromUrl } from "../middlewares/ImageValidate.js";
import { hashPassword,sendmailOtp } from "../utils/UserMail.js";
import cloudinary from 'cloudinary'; 
const cloudinaryV2 = cloudinary.v2;

 


const JWT_SECRET = "jwt_secret_key";

//User Login
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid  password" });
        }
         if (!user.is_verified) {
            return res.status(403).json({ message: "Please verify your email before logging in." });
        }
       
        
        const token = jwt.sign({ id : user._id, role : user.role }, JWT_SECRET, { expiresIn: "10d" });

        
        res.cookie("token", token, {
            httpOnly: false, 
            maxAge: 10 * 24 * 60 * 60 * 1000

        });
        
        return res.status(200).json({ message: "Login successful",token });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

//register user with otp to email
export const registerUser =  async (req, res) => {
    const { username, email, password } = req.body;

    try {
       
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const hashedPassword = await hashPassword(password)
        const { mailOptions, verifyotp, otpExpireTime } = sendmailOtp(email);
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            port :465,
            secure : true,
            logger : false,
            debug:true,
            auth: {
                user: process.env.GMAIL_ID, 
                pass: process.env.GMAIL_PASS,
               
            },
            tls:{
              rejectUnauthorized : true
            }
            
        });
        try{
        await transporter.sendMail(mailOptions);
        }
        catch(emailError){
           return res.status(503).json({messaage:"Failed to send Otp to Mail"})
        }

 const newuser = await User.create({ username, email, password: hashedPassword, otp:verifyotp, otpExpires:otpExpireTime });
       return res.status(201).json({ message: "Account created successfully! An OTP has been sent to your email."});
    

    } catch (err) {
        console.error(err);
       return res.status(500).json({ message: "Internal Server Error" });
    }
};

//verify user otp
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

//only for email verification 
export const sendOtp = async(req,res)=>{
    const{email} = req.body;
    try{
        const user = await User.findOne({email});
        if(!email){
            return res.status(404).json({ message: 'User not found' });
        }

        const { mailOptions, verifyotp, otpExpireTime } = sendmailOtp(email);
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            port :465,
            secure : true,
            logger : false,
            debug:true,
            auth: {
                user: process.env.GMAIL_ID, 
                pass: process.env.GMAIL_PASS,
               
            },
            tls:{
              rejectUnauthorized : true
            }
            
        });
    
        await transporter.sendMail(mailOptions);
        user.otp = verifyotp;
        user.otpExpires = otpExpireTime; 
        await user.save();
       return res.status(200).json({ message: "OTP sent successfully!" });

    }catch(error){
        if (error.code || error.response) {
            return res.status(503).json({ message: `Failed to send OTP. Error: ${error.message}` });
        }
        return res.status(500).json({ message: "Internal Server Error", error:error.message });
    }
}


//forgot password sends password reset link to email
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
    
        const resetPasswordLink = `https://studybuddies-infosys-internship-oct2024.vercel.app/reset-password/${user._id}/${token}`;
        const emailContent = `
            <h3>Reset Your Password</h3>
            <p>Click the link below to reset your password:</p>
            <a href="${resetPasswordLink}">Reset Password</a>
            <p>Reset Link is valid for only 15:00 min.</p>
        `;
    
        const mailOptions = {
            from: process.env.GMAIL_ID,
            to: email,
            subject: 'Password Reset Request',
            html: emailContent
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
    catch (error) {
        
       return res.status(500).json({ message: "Internal Server Error", error:error.message });
    }
};


//reset password with new password
export const passwordReset = async (req, res) => {
    const { id, token } = req.params;


    const { password } = req.body;
    
     jwt.verify(token, JWT_SECRET, async(err, decoded) => {
        if (err) {
            return res.json({ message: "error with token" });
        }

        try {
            if (decoded.id !== id) {
                return res.status(403).json({ message: "Token does not match the user" });
            }
            
            const hashedPassword = await hashPassword(password);
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ status: "User not found" });
            }
            
            await User.findByIdAndUpdate(id, { password: hashedPassword },{ new: true });
           

           return res.status(200).json({ message: "Password successfully updated" });
        } 
        catch (error) {
            return res.status(500).json({ message :  "An error occurred" , error: error.message});
        }
    });
};

//update userprofile details
export const updateUserProfile = async (req, res) => {
    const { gender, email, fullName, username, professionalTitle, bio } = req.body;
  
    try {
      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      Object.assign(user, {
        gender: gender || user.gender,
        fullName: fullName || user.fullName,
        bio: bio || user.bio,
        professionalTitle: professionalTitle || user.professionalTitle,
        username: username || user.username,
        email: email || user.email,
        updatedAt: Date.now(),
      });
  
      await user.save();
     return res.status(200).json({ message: "Personal Information has been updated", user });
    } catch (error) {
     return res.status(500).json({ message: "Internal server error", error: error.message });
    }
  };
  
//update userprofile pic
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

//To get all the user information
export const getUserProfile = async (req, res) => {
    const { user } = req;
  
    try {
      const foundUser = await User.findById(user.id);
  
      if (!foundUser) {
        return res.status(404).json({ message: "User profile not found." });
      }
  
      return res.status(200).json({
        message: "User profile fetched successfully.",
        user: foundUser,
      });
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return res.status(500).json({
        message: "Internal server error. Could not fetch user profile.",
        error: error.message,
      });
    }
  };
  

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
    console.log("User logged out successfully at ${new Date().toISOString()}");

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

export const switchRole = async(req,res)=>{
    const{password} = req.body;
try{
    const user = await User.findOne({$and: [{ _id: req.user.id },{ role: "user" }]});
    if(!user){
        return res.status(404).json({message:"user not found"});
    }
    const isvalid = await bcrypt.compare(password,user.password);
   
 if(!isvalid){
       
        return res.status(401).json({message:"Invalid Password. Please check again"})
    }
    user.role = "admin";
    await user.save();
      
    return res.status(200).json({message:"Your request for change role is successfull."})
}
catch(error){
    return res.status(500).json({message:"Internal Server Error", error:error.message})
}
}

//User add deck to favaorites
export const addFavorites = async(req,res)=>{
    try{
      const user = await User.findById(req.user.id);
      if(!user){
        return res.status(404).json({message:"user not found"})
      }
      const deck = await Deck.findById(req.params.deckId);
      if(!deck){
        return res.status(404).json({message:"Deck not found"});
      }
      if(!user.favorites.includes(deck._id)){
       user.favorites.push(deck._id);
       await user.save();
       return res.status(200).json({message:"Deck added to favorites"})
      }else {
        return res.status(400).json({ message: "Deck is already in favorites" });
      }
  
    }catch(error){
     return res.status(500).json({message:"Internal Server Error", error:error.message})
    }
  }
  
  //user remove deck from favorties
  export const removeFavorites = async(req,res)=>{
    try{
      const user = await User.findById(req.user.id);
      if(!user){
        return res.status(404).json({message:"User not found"});
      }
      const deck = await Deck.findById(req.params.deckId);
      if(!deck){
        return res.status(404).json({message:"Deck not found"});
      }
      if(!user.favorites.includes(deck._id)){
        return res.status(404).json({message:"Deck is not in favorites"})
      }
      user.favorites = user.favorites.filter((deckId)=>{
       return deckId.toString() !== deck._id.toString();
      } );
      await user.save();
      return res.status(200).json({ message: 'Deck removed from favorites' });
    }catch(error){
      return res.status(500).json({message:"Internal Server Error", error:error.message})
     }
  }
  
  //To get all the favorites of user
  export const getFavorites = async(req,res)=>{
  try{
    
    const user = await User.findById(req.user.id).populate('favorites');
      if(!user){
        return res.status(404).json({message:"User not found"});
      }
      const favoriteDecks = await Promise.all(
        user.favorites.map(async (deck) => {
          const cards = await Card.find({deck_id:deck._id});
          const deckTags = await DeckTag.find({ deck_id: deck._id }).populate("tag_id");
          const tags = deckTags.map((deckTag) => deckTag.tag_id);
          return { deck, tags ,cards};
        })
      );
      return res.status(200).json({ message: "Here are your decks.", favoriteDecks });
    } catch (error) {
       return res.status(500).json({ message: "Internal server error.",error:error.message });
    }
  };
  
  
  
  
  