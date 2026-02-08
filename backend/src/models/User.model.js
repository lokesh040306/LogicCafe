import mongoose from "mongoose";

/**
 * User Schema
 * - Stores authentication details
 * - Progress is linked via Progress collection
 */
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    // used for createdAt and updatedAt fields
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
