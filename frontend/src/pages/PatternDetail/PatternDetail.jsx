import { useParams } from "react-router-dom";
import { useMemo, useState } from "react";

import useFetch from "../../hooks/useFetch";
import { getPatternById } from "../../services/pattern.service";
import { getProblemsByPattern } from "../../services/problem.service";
import { getCompletedProblems } from "../../services/progress.service";

import PatternInfo from "./PatternInfo";
import PatternTheory from "./PatternTheory";
import ProblemList from "./ProblemList";

const PatternDetail = () => {
  const { patternId } = useParams();
  const [refreshKey, setRefreshKey] = useState(0);

  // ✅ PASS FUNCTION + DEP ARRAY
  const patternFetch = () => getPatternById(patternId);
  const problemsFetch = () => getProblemsByPattern(patternId);

  const {
    data: patternRes,
    loading: patternLoading,
    error: patternError,
  } = useFetch(patternFetch, [patternId]);

  const {
    data: problemsRes,
    loading: problemsLoading,
    error: problemsError,
  } = useFetch(problemsFetch, [patternId]);

  const pattern = patternRes?.data || null;
  const problems = problemsRes?.data?.problems || [];

  const progress = useMemo(() => {
    const completedProblems = getCompletedProblems();
    const total = problems.length;

    const completed = problems.filter((p) =>
      completedProblems.includes(p._id)
    ).length;

    return {
      completed,
      total,
      percentage:
        total === 0 ? 0 : Math.round((completed / total) * 100),
    };
  }, [problems, refreshKey]);

  if (patternLoading || problemsLoading) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-zinc-400">
          Loading pattern details…
        </p>
      </section>
    );
  }

  if (patternError || problemsError) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-red-400">
          Failed to load pattern details
        </p>
      </section>
    );
  }

  if (!pattern) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-zinc-400">
          Pattern not found
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      {/* Header / Theory */}
      {/* <PatternInfo pattern={pattern} /> */}
      <div className="mb-10">
        <PatternTheory pattern={pattern} />
      </div>

      {/* Progress */}
      <div className="mb-10 rounded-xl border border-zinc-800 bg-zinc-950 p-5">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-zinc-400">Progress</span>
          <span className="font-medium text-zinc-100">
            {progress.completed} / {progress.total}
          </span>
        </div>

        <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${progress.percentage}%` }}
          />
        </div>
      </div>

      {/* Problems */}
      <ProblemList
        problems={problems}
        onToggle={() => setRefreshKey((k) => k + 1)}
      />
    </section>
  );
};

export default PatternDetail;
