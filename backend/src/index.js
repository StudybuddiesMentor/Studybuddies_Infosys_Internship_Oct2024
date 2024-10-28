// external dependencies
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

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

// Start the application
startServer();
