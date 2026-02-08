import { User } from "../../models/User.model.js";
import { Progress } from "../../models/Progress.model.js";
import { Problem } from "../../models/Problem.model.js";
import ApiError from "../../utils/ApiError.js";
import { calculateStreaks } from "./streak.utils.js";

export const getProfileSummaryService = async (userId) => {
  /* 1️⃣ USER */
  const user = await User.findById(userId).lean();
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  /* 2️⃣ USER PROGRESS */
  const progressEntries = await Progress.find({ user: userId }).lean();

  // ✅ FIXED FIELD NAMES
  const solvedEntries = progressEntries.filter((p) => p.solved);
  const revisionEntries = progressEntries.filter((p) => p.reviseLater);

  const solvedProblemIds = solvedEntries.map((p) => p.problem);

  /* 3️⃣ SOLVED PROBLEMS (difficulty stats) */
  const solvedProblems = solvedProblemIds.length
    ? await Problem.find(
        { _id: { $in: solvedProblemIds } },
        { difficulty: 1 }
      ).lean()
    : [];

  const easySolved = solvedProblems.filter(
    (p) => p.difficulty?.toLowerCase() === "easy"
  ).length;

  const mediumSolved = solvedProblems.filter(
    (p) => p.difficulty?.toLowerCase() === "medium"
  ).length;

  const hardSolved = solvedProblems.filter(
    (p) => p.difficulty?.toLowerCase() === "hard"
  ).length;


  /* 4️⃣ TOTAL PROBLEMS & PATTERNS */
  const totalProblems = await Problem.countDocuments();
  const patternsCount = await Problem.distinct("pattern").then(
    (p) => p.length
  );

  /* 5️⃣ STREAK CALCULATION */
  const solvedDates = solvedEntries.map((p) => p.updatedAt);

  const { currentStreak, bestStreak, lastSolvedDate } =
    calculateStreaks(solvedDates);

  /* 6️⃣ FINAL RESPONSE */
  return {
    user: {
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      avatarUrl: user.avatarUrl || null,
    },

    account: {
      accountCreatedAt: user.createdAt,
      lastActiveAt: user.updatedAt,
      preferredSheet: user.preferredSheet || "Default",
    },

    progress: {
      totalProblems,
      solvedProblems: solvedEntries.length,
      pendingProblems: totalProblems - solvedEntries.length,
      revisionProblems: revisionEntries.length,
      overallProgressPercentage:
        totalProblems === 0
          ? 0
          : Number(
              ((solvedEntries.length / totalProblems) * 100).toFixed(2)
            ),
    },

    streak: {
      currentStreak,
      bestStreak,
      lastSolvedDate,
    },

    quickStats: {
      patternsCount,
      easySolved,
      mediumSolved,
      hardSolved,
    },
  };
};
