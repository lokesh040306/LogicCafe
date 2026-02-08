import mongoose from "mongoose";

/**
 * Progress Schema
 * - Tracks user progress per problem
 * - MVP: solved / reviseLater
 */
const progressSchema = new mongoose.Schema(
  {
    user: {
      // Reference to User model 
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    problem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
    },

    solved: {
      type: Boolean,
      default: false,
    },

    reviseLater: {
      type: Boolean,
      default: false,
    },

    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export const Progress = mongoose.model("Progress", progressSchema);
