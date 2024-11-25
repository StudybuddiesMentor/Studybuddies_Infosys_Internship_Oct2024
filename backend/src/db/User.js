import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
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
 professionalTitle: {
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
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  otp: {
    type: String, 
},
 otpExpires: {
    type: Date, 
},
favorites: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Deck', 
  },
],
 createdAt: {
  type: Date,
  default: Date.now,
},
 updatedAt: {
  type: Date,
  default: Date.now, 
},

  
});


const User = mongoose.model("User", userSchema);
export default User;