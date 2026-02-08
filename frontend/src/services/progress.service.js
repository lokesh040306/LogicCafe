import {
  readProgress,
  writeProgress,
} from "../utils/progress.storage";
import { getToken } from "./auth.service";
import api from "./api";

/**
 * Progress Service
 * ----------------
 * UI must use ONLY this file.
 * Handles:
 * - localStorage
 * - backend sync (if logged in)
 */

/* -----------------------
   Helpers
------------------------ */
const ensureProgressShape = (progress) => ({
  completedProblems: progress?.completedProblems || [],
});

const getProgress = () =>
  ensureProgressShape(readProgress());

const saveProgress = (progress) =>
  writeProgress(ensureProgressShape(progress));

const isLoggedIn = () => Boolean(getToken());

/* -----------------------
   Backend sync
------------------------ */
const syncToBackend = async (problemId, solved) => {
  if (!isLoggedIn()) return;

  try {
    await api.post("/progress", {
      problemId,
      solved,
    });
  } catch (err) {
    // silent fail → local progress still works
    console.warn("Progress sync failed", err);
  }
};

/* -----------------------
   Public API (Progress)
------------------------ */
export const toggleProblem = (problemId) => {
  const progress = getProgress();
  const isSolved =
    progress.completedProblems.includes(problemId);

  if (isSolved) {
    progress.completedProblems =
      progress.completedProblems.filter(
        (id) => id !== problemId
      );
  } else {
    progress.completedProblems.push(problemId);
  }

  saveProgress(progress);

  // 🔥 backend sync
  syncToBackend(problemId, !isSolved);
};

export const isProblemCompleted = (problemId) => {
  const progress = getProgress();
  return progress.completedProblems.includes(problemId);
};

export const getCompletedProblems = () => {
  return getProgress().completedProblems;
};

/**
 * 🔥 Load backend progress on login
 */
export const hydrateProgressFromBackend = async () => {
  if (!isLoggedIn()) return;

  try {
    const res = await api.get("/progress/me");
    const backendProgress = res.data?.data || [];

    const completed = backendProgress
      .filter((p) => p.solved)
      .map((p) => p.problem._id);

    saveProgress({
      completedProblems: completed,
    });
  } catch (err) {
    console.warn("Progress hydration failed", err);
  }
};

/* ------------------------------------------------------------------ */
/* 📝 NOTES PER QUESTION (NEW) */
/* ------------------------------------------------------------------ */

/**
 * Get note for a problem (user-specific)
 */
export const getProblemNote = async (problemId) => {
  if (!isLoggedIn()) return "";

  try {
    const res = await api.get(
      `/progress/problem/${problemId}/note`
    );
    return res.data?.data || "";
  } catch (err) {
    console.warn("Fetching problem note failed", err);
    return "";
  }
};

/**
 * Save / update note for a problem
 */
export const saveProblemNote = async (
  problemId,
  notes
) => {
  if (!isLoggedIn()) return;

  try {
    await api.post(
      `/progress/problem/${problemId}/note`,
      { notes }
    );
  } catch (err) {
    console.warn("Saving problem note failed", err);
  }
};
