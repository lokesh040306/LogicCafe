import mongoose from "mongoose";

/**
 * Problem Schema
 * - Belongs to a Pattern
 * - Difficulty & topic tags are metadata
 */
const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    pattern: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pattern",
      required: true,
    },

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },

    topicTags: {
      type: [String], // array, string, hashmap etc.
      default: [],
    },

    leetcodeLink: {
      type: String,
      default: "",
    },

    gfgLink: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export const Problem = mongoose.model("Problem", problemSchema);
