import api from "./api";

/**
 * Get pattern-wise progress for logged-in user
 */
export const getPatternProgress = async () => {
  const res = await api.get("/progress/patterns");
  return res.data;
};
