import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
<<<<<<< HEAD
    unique: true,
=======
>>>>>>> origin/main
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
<<<<<<< HEAD
  is_verified: {
    type: Boolean,
    default: false,
=======
  fullName:{
    type:String,
    default : ''
  },
  profilePic :  {
    url: String,
    filename: String,
    },

 bio :{
    type : String,
     default : ''
 },
 profession: {
  type : String,
  default : ''
},
 gender: { 
  type: String,
   enum: ['Male', 'Female', 'Other'],
   }, 
  is_verified: {
    type: Boolean,
    default: false,
    required:true
>>>>>>> origin/main
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
<<<<<<< HEAD
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

=======
  otp: {
    type: String, 
},
 otpExpires: {
    type: Date, 
},
 createdAt: {
  type: Date,
  default: Date.now,
},
 updatedAt: {
  type: Date,
  default: Date.now, 
},
  
});


>>>>>>> origin/main
const User = mongoose.model("User", userSchema);
export default User;