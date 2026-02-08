import { Link } from "react-router-dom";

/**
 * Pattern Card
 * Dense, confident, product-grade
 */
const PatternCard = ({ pattern }) => {
  const completed = pattern.completedCount;
  const total = pattern.totalCount;

  const showProgress =
    typeof completed === "number" &&
    typeof total === "number" &&
    total > 0;

  const percentage = showProgress
    ? Math.round((completed / total) * 100)
    : 0;

  return (
    <Link
      to={`/patterns/${pattern._id}`}
      className="group flex h-full flex-col rounded-lg border border-zinc-800 bg-zinc-900/60 p-6 transition
        hover:border-primary/50 hover:bg-zinc-900"
    >
      {/* ================= Title ================= */}
      <h3 className="text-base font-semibold tracking-tight text-zinc-100 group-hover:text-primary">
        {pattern.name}
      </h3>

      {/* ================= Description ================= */}
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-zinc-400">
        {pattern.description}
      </p>

      {/* ================= Spacer ================= */}
      <div className="flex-1" />

      {/* ================= Progress ================= */}
      {showProgress && (
        <div className="mt-5 space-y-1">
          <div className="flex items-center justify-between text-xs text-zinc-500">
            <span>{percentage}% completed</span>
            <span>
              {completed}/{total}
            </span>
          </div>

          <div className="h-1.5 w-full rounded-full bg-zinc-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      )}

      {/* ================= Action ================= */}
      <div className="mt-5 text-xs font-medium text-zinc-500 group-hover:text-primary">
        View pattern →
      </div>
    </Link>
  );
};

export default PatternCard;
