import api from "./api";

/**
 * Fetch all patterns
 * Used in Patterns page
 */
export const getPatterns = async () => {
  const res = await api.get("/patterns");
  return res.data;
};

/**
 * Fetch single pattern (with full theory)
 * Used in PatternDetail page
 */
export const getPatternById = async (patternId) => {
  const res = await api.get(`/patterns/${patternId}`);
  return res.data;
};
