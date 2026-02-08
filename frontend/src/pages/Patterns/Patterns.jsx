import useFetch from "../../hooks/useFetch";
import { getPatterns } from "../../services/pattern.service";
import { getPatternProgress } from "../../services/progress.api";
import PatternCard from "./PatternCard";
import PatternSkeleton from "./PatternSkeleton";

/**
 * Patterns Page
 * Product-core view
 * Dense, focused, professional
 */
const Patterns = () => {
  const {
    data: patternsRes,
    loading: patternsLoading,
    error: patternsError,
  } = useFetch(getPatterns, "patterns");

  const {
    data: progressRes,
    loading: progressLoading,
  } = useFetch(getPatternProgress, "pattern-progress");

  if (patternsLoading || progressLoading) {
    return <PatternSkeleton />;
  }

  if (patternsError) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-red-400">
          Failed to load patterns
        </p>
      </section>
    );
  }

  const patterns = patternsRes?.data || [];
  const progressList = progressRes?.data || [];

  /* ---------------- Merge progress ---------------- */
  const progressMap = {};
  progressList.forEach((item) => {
    progressMap[item.patternId] = item;
  });

  const mergedPatterns = patterns.map((pattern) => {
    const progress = progressMap[pattern._id];
    return {
      ...pattern,
      completedCount: progress?.completedCount ?? 0,
      totalCount: progress?.totalCount ?? 0,
    };
  });

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 space-y-14">
      {/* ================= Header ================= */}
      <header className="max-w-3xl space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-100">
          DSA Patterns
        </h1>

        <p className="text-sm leading-relaxed text-zinc-400">
          Each pattern represents a reusable way of thinking. Master the pattern
          once, and you’ll recognize it across many problems.
        </p>
      </header>

      {/* ================= Context Bar ================= */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-zinc-800 bg-zinc-900/40 px-6 py-4">
        <p className="text-sm text-zinc-300">
          <span className="font-medium text-zinc-100">
            {mergedPatterns.length}
          </span>{" "}
          patterns available
        </p>

        <p className="text-xs text-zinc-500">
          Progress updates automatically as you solve problems
        </p>
      </div>

      {/* ================= Grid ================= */}
      {mergedPatterns.length === 0 ? (
        <p className="text-sm text-zinc-400">
          No patterns found.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mergedPatterns.map((pattern) => (
            <PatternCard
              key={pattern._id}
              pattern={pattern}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Patterns;
