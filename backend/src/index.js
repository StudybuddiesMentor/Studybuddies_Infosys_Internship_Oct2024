
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import router from './routes/register.js';


// Load environment variables
dotenv.config();

const PORT = 8000;


const app = express();

// CORS settings
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// MongoDB connection
const mongourl = "mongodb://127.0.0.1:27017/test";
main()
.then(()=>{
    console.log("mongodb connected successfully");
})
.catch((err)=>{
    console.log(err);
})

async function main() {
    await mongoose.connect(mongourl);
}


app.use("/",router);



// Home route with JWT verification
app.get('/home',  (req, res) => {
    return res.json({ message: "Success! You are authenticated." });
});

// Server listening
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

