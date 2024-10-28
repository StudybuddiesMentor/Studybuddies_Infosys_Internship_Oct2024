// external dependencies
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

// configuration from environment variables
import dotenv from "dotenv";
dotenv.config();

// Import middlewares
import { adminAuthMiddleware, userAuthMiddleware } from "./middleware/auth.js";

// Import routes
import router from "./routes/register.js";

// Fetch the PORT and MONGODB_URI from .env
const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();

// CORS settings
app.use(
  cors({
    origin: "*", // Allows all origins
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"], // Allows all common HTTP methods
    credentials: false, // No credentials for security reasons when using origin "*"
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/", router);

// Unified function to connect to MongoDB and start the server
const startServer = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);

    // Boxed console log for successful MongoDB connection
    console.log(`
      ******************************************
      ***   MongoDB connected successfully   ***
      ******************************************
      `);

    // Start the server after MongoDB connection is successful
    app.listen(PORT, () => {
      console.log(`
      *******************************************
      ***   Server is running on port: ${PORT}   ***
      *******************************************
        `);
    });
  } catch (err) {
    // Boxed console error for MongoDB connection or server failure
    console.error(`
      ************************************************************
      ***   Failed to connect to MongoDB or start the server   ***
      ************************************************************
      Error: ${err}
      ************************************************************
      `);
  }
};

// Start the application
startServer();
