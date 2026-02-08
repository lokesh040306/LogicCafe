import clsx from "clsx";

/**
 * Generic Badge component
 *
 * Supports:
 * 1) Difficulty badges → <Badge level="easy" />
 * 2) Text badges → <Badge text="🔥 3 day streak" />
 */
const Badge = ({ level, text }) => {
  const levelStyles = {
    easy: "bg-green-500/10 text-green-400 border-green-500/30",
    medium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
    hard: "bg-red-500/10 text-red-400 border-red-500/30",
  };

  const baseClasses =
    "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium";

  // Difficulty badge
  if (level) {
    return (
      <span
        className={clsx(
          baseClasses,
          "capitalize",
          levelStyles[level] || "border-zinc-700 text-zinc-400"
        )}
      >
        {level}
      </span>
    );
  }

  // Generic text badge (streaks, stats, etc.)
  if (text) {
    return (
      <span
        className={clsx(
          baseClasses,
          "border-zinc-700 bg-zinc-800/60 text-zinc-200"
        )}
      >
        {text}
      </span>
    );
  }

  return null;
};

export default Badge;
