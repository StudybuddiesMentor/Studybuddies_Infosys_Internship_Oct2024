import mongoose from "mongoose";

const { Schema } = mongoose;

// Define the Tag schema
const tagSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false, // Disable __v field
  }
);

// Create and export the Tag model
const Tag = mongoose.model("Tag", tagSchema);

export default Tag;
