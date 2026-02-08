import { Pattern } from "../../models/Pattern.model.js";

/**
 * Create a new pattern
 * Used for seeding / admin
 */
export const createPattern = async (patternData) => {
  return await Pattern.create(patternData);
};

/**
 * Get all patterns
 * Used in Pattern list / Practice page
 */
export const getAllPatterns = async () => {
  // Fetch patterns with selected fields only
  return await Pattern.find()
    .select("name description createdAt")
    // Sort by creation date ascending
    .sort({ createdAt: 1 })
    // Convert Mongoose documents to plain JS objects
    .lean();
};

/**
 * Get single pattern by ID
 * Used in Pattern Detail page
 */
export const getPatternById = async (patternId) => {
  // Fetch pattern by ID with selected fields
  const pattern = await Pattern.findById(patternId)
    .select("name description")
    .lean();

  if (!pattern) {
    throw new Error("Pattern not found");
  }

  return pattern;
};
