import api from "./api";

/**
 * Fetch problems by pattern ID
 * Used in:
 * - Practice page
 * - Pattern detail page
 */
export const getProblemsByPattern = async (patternId) => {
  const response = await api.get(
    `/problems/pattern/${patternId}`
  );
  return response.data;
};
