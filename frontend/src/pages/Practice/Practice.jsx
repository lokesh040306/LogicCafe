import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";

import useFetch from "../../hooks/useFetch";
import { getPatterns } from "../../services/pattern.service";
import { getProblemsByPattern } from "../../services/problem.service";
import { getCompletedProblems } from "../../services/progress.service";

import { generatePracticeSet } from "../../utils/practiceGenerator";

import PatternSelector from "./PatternSelector";
import PracticeResult from "./PracticeResult";
import PatternSkeleton from "./PatternSkeleton";
import PracticeResultSkeleton from "./PracticeResultSkeleton";

/* ---------------- Animations ---------------- */
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
};

const Practice = () => {
  /* ------------------ Fetch patterns ------------------ */
  const {
    data: patternsRes,
    loading: patternsLoading,
  } = useFetch(getPatterns);

  const patterns = patternsRes?.data ?? [];

  /* ------------------ UI State ------------------ */
  const [selectedPatterns, setSelectedPatterns] = useState([]);
  const [count, setCount] = useState(3);
  const [result, setResult] = useState([]);
  const [allProblems, setAllProblems] = useState([]);
  const [problemsLoading, setProblemsLoading] = useState(false);

  /* ------------------ Pattern map ------------------ */
  const patternMap = useMemo(() => {
    const map = {};
    for (const p of patterns) {
      map[p._id] = p.name;
    }
    return map;
  }, [patterns]);

  /* ------------------ Fetch problems ------------------ */
  useEffect(() => {
    const fetchProblems = async () => {
      if (selectedPatterns.length === 0) {
        setAllProblems([]);
        return;
      }

      setProblemsLoading(true);

      try {
        const responses = await Promise.all(
          selectedPatterns.map((patternId) =>
            getProblemsByPattern(patternId)
          )
        );

        const problems = responses.flatMap(
          (res) => res.data.problems
        );

        setAllProblems(problems);
      } catch (error) {
        console.error("Failed to fetch problems", error);
        setAllProblems([]);
      } finally {
        setProblemsLoading(false);
      }
    };

    fetchProblems();
  }, [selectedPatterns]);

  /* ------------------ Enrich problems ------------------ */
  const enrichedProblems = useMemo(() => {
    return allProblems.map((p) => ({
      ...p,
      patternName: patternMap[p.pattern] || "—",
    }));
  }, [allProblems, patternMap]);

  /* ------------------ Generate ------------------ */
  const handleGenerate = () => {
    if (enrichedProblems.length === 0) {
      setResult([]);
      return;
    }

    const completedIds = getCompletedProblems();

    const practiceSet = generatePracticeSet({
      problems: enrichedProblems,
      completedIds,
      count,
    });

    setResult(practiceSet);
  };

  /* ------------------ Loading ------------------ */
  if (patternsLoading) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-20">
        <PatternSkeleton />
      </section>
    );
  }

  /* ------------------ UI ------------------ */
  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className="mx-auto max-w-6xl px-6 py-20 space-y-14"
    >
      {/* ================= HEADER ================= */}
      <motion.header variants={item} className="space-y-3">
        <h1 className="text-3xl font-semibold text-zinc-100">
          Practice Session
        </h1>
        <p className="max-w-2xl text-sm text-zinc-500 leading-relaxed">
          Build a focused DSA session by selecting patterns you want to improve.
          Unsolved problems are automatically prioritized to maximize learning.
        </p>
      </motion.header>

      {/* ================= STEP 1 ================= */}
      <motion.div variants={item}>
        <Section
          step="01"
          title="Choose Patterns"
          description="Select the DSA patterns you want to practice today."
        >
          <PatternSelector
            patterns={patterns}
            selected={selectedPatterns}
            onChange={setSelectedPatterns}
          />
        </Section>
      </motion.div>

      {/* ================= STEP 2 ================= */}
      <motion.div variants={item}>
        <Section
          step="02"
          title="Session Size"
          description="Pick a realistic number of problems for one sitting."
        >
          <div className="flex gap-3">
            {[3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => setCount(n)}
                className={`rounded-md px-5 py-2 text-sm font-medium transition
                  ${
                    count === n
                      ? "bg-primary text-zinc-950 shadow"
                      : "border border-zinc-800 text-zinc-400 hover:border-zinc-700"
                  }`}
              >
                {n} Problems
              </button>
            ))}
          </div>
        </Section>
      </motion.div>

      {/* ================= STEP 3 ================= */}
      <motion.div variants={item}>
        <Section
          step="03"
          title="Generate Session"
          description="Problems are intelligently selected based on your past progress."
        >
          <button
            onClick={handleGenerate}
            disabled={selectedPatterns.length === 0 || problemsLoading}
            className="rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-zinc-950 transition
              hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {problemsLoading ? "Preparing Practice…" : "Generate Practice Set"}
          </button>

          {selectedPatterns.length === 0 && (
            <p className="mt-2 text-xs text-zinc-500">
              Select at least one pattern to continue.
            </p>
          )}
        </Section>
      </motion.div>

      {/* ================= RESULT ================= */}
      <motion.div variants={item}>
        {problemsLoading ? (
          <PracticeResultSkeleton />
        ) : result.length === 0 ? (
          <EmptyState />
        ) : (
          <PracticeResult problems={result} />
        )}
      </motion.div>
    </motion.section>
  );
};

/* ---------------- Reusable Section ---------------- */
const Section = ({ step, title, description, children }) => (
  <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-8 space-y-5">
    <div className="flex items-start gap-4">
      <div className="text-xs font-semibold text-violet-400">
        STEP {step}
      </div>
      <div>
        <h2 className="text-sm font-semibold text-zinc-200">
          {title}
        </h2>
        <p className="mt-1 text-xs text-zinc-500">
          {description}
        </p>
      </div>
    </div>
    {children}
  </div>
);

/* ---------------- Empty State ---------------- */
const EmptyState = () => (
  <div className="rounded-xl border border-dashed border-zinc-800 p-10 text-center">
    <p className="text-sm text-zinc-400">
      Your practice set will appear here.
    </p>
    <p className="mt-1 text-xs text-zinc-500">
      Select patterns and generate a session to begin.
    </p>
  </div>
);

export default Practice;
