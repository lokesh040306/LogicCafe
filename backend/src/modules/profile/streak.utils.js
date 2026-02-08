// backend/src/modules/profile/streak.utils.js

const DAY_MS = 24 * 60 * 60 * 1000;

const normalizeDate = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
};

export const calculateStreaks = (dates) => {
  if (!dates || dates.length === 0) {
    return {
      currentStreak: 0,
      bestStreak: 0,
      lastSolvedDate: null
    };
  }

  // Normalize + unique + sort DESC
  const uniqueDays = [
    ...new Set(dates.map(normalizeDate))
  ].sort((a, b) => b - a);

  let bestStreak = 1;
  let currentStreak = 1;

  // BEST STREAK
  let tempStreak = 1;
  for (let i = 1; i < uniqueDays.length; i++) {
    if (uniqueDays[i - 1] - uniqueDays[i] === DAY_MS) {
      tempStreak++;
      bestStreak = Math.max(bestStreak, tempStreak);
    } else {
      tempStreak = 1;
    }
  }

  // CURRENT STREAK
  const today = normalizeDate(new Date());
  const yesterday = today - DAY_MS;

  if (uniqueDays[0] === today || uniqueDays[0] === yesterday) {
    for (let i = 1; i < uniqueDays.length; i++) {
      if (uniqueDays[i - 1] - uniqueDays[i] === DAY_MS) {
        currentStreak++;
      } else {
        break;
      }
    }
  } else {
    currentStreak = 0;
  }

  return {
    currentStreak,
    bestStreak,
    lastSolvedDate: new Date(uniqueDays[0]).toISOString().split("T")[0]
  };
};
