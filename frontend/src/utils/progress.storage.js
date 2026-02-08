/**
 * Progress Storage Utility
 * ------------------------
 * Handles how progress is stored.
 * Today: localStorage
 * Tomorrow: backend (after login)
 */

const STORAGE_KEY = "dsa_progress_v1";

/**
 * Read progress from storage
 */
export const readProgress = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { completedProblems: [] };
  } catch (err) {
    console.error("Failed to read progress", err);
    return { completedProblems: [] };
  }
};

/**
 * Write progress to storage
 */
export const writeProgress = (progress) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (err) {
    console.error("Failed to write progress", err);
  }
};

/**
 * Clear progress
 * (used later on logout)
 */
export const clearProgress = () => {
  localStorage.removeItem(STORAGE_KEY);
};
