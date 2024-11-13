// external dependencies
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";

// configuration from environment variables
import dotenv from "dotenv";
dotenv.config();

// Import routes
import userRoutes from "./routes/userRoutes.js";
import deckRoutes from "./routes/deckRoutes.js";
import cardRoutes from "./routes/cardRoutes.js";
import voteRoutes from "./routes/voteRoutes.js";
import tagRoutes from "./routes/tagRoutes.js";

// Fetch the PORT and MONGODB_URI from .env
const PORT = process.env.PORT || 9000;
const MONGODB_URI = 'mongodb+srv://aryan:aryan123@studybuddy.2bajq.mongodb.net/studybuddy';

const app = express();

// CORS settings
app.use(
  cors({
    origin: "http://localhost:5173", // Allows all origins
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"], // Allows all common HTTP methods
    credentials: true, // No credentials for security reasons when using origin "*"
  }),
);
app.use(express.json());
app.use(cookieParser());

// Add routes
app.use("/api/users", userRoutes); // Route for user-related operations
app.use("/api/decks", deckRoutes); // Route for deck-related operations
app.use("/api/cards", cardRoutes); // Route for card-related operations
app.use("/api/votes", voteRoutes); // Route for voting-related operations
app.use("/api/tags", tagRoutes); // Route for tag-related operations

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

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        message: 'Error: File too large. Maximum file size is 5 MB.',
        errorCode: err.code
      });
    }
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        message: 'Error: Unexpected file type or field name.',
        errorCode: err.code
      });
    }
  }
  if (err.message && err.message.includes('Invalid file type')) {
    return res.status(err.status || 400).json({ message: err.message });
  }

  if (err.message && err.message.includes('File size is too small')) {
    return res.status(err.status || 400).json({ message: err.message });
  }
  return res.status(err.status || 500).json({
    message: "Something went wrong!",
    error: err.message || err
  });
});

// Start the application
startServer();
