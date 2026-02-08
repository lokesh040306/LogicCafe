import { useEffect, useState } from "react";
import Badge from "../../components/ui/Badge";
import Card from "../../components/ui/Card";
import {
  isProblemCompleted,
  toggleProblem,
  getProblemNote,
  saveProblemNote,
} from "../../services/progress.service";

/**
 * Single problem row
 */
const ProblemRow = ({ problem, onToggle }) => {
  const [completed, setCompleted] = useState(false);

  // notes state
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (problem?._id) {
      setCompleted(isProblemCompleted(problem._id));
    }
  }, [problem?._id]);

  const handleToggle = () => {
    if (!problem?._id) return;

    toggleProblem(problem._id);
    setCompleted((prev) => !prev);
    onToggle?.();
  };

  // load notes when opened
  useEffect(() => {
    if (!showNotes || !problem?._id) return;

    getProblemNote(problem._id).then((note) =>
      setNotes(note || "")
    );
  }, [showNotes, problem?._id]);

  // auto-save notes
  useEffect(() => {
    if (!showNotes || !problem?._id) return;

    const timer = setTimeout(() => {
      saveProblemNote(problem._id, notes);
    }, 500);

    return () => clearTimeout(timer);
  }, [notes, showNotes, problem?._id]);

  return (
    <Card className="px-4 py-3">
      <div className="flex items-start justify-between gap-4">
        {/* Left: problem info */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={completed}
            onChange={handleToggle}
            className="mt-1 h-4 w-4 cursor-pointer accent-green-500"
          />

          <div>
            <p
              className={`font-medium ${
                completed
                  ? "text-zinc-400 line-through"
                  : "text-white"
              }`}
            >
              {problem.title}
            </p>

            <div className="mt-1 flex items-center gap-3 text-xs text-zinc-500">
              <span>Week {problem.week}</span>
              <Badge level={problem.difficulty} />
            </div>
          </div>
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-4 text-sm">
          {problem.leetcodeLink && (
            <a
              href={problem.leetcodeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:underline"
            >
              LeetCode
            </a>
          )}

          {problem.gfgLink && (
            <a
              href={problem.gfgLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:underline"
            >
              GFG
            </a>
          )}

          <button
            onClick={() => setShowNotes((v) => !v)}
            className="text-zinc-400 hover:text-indigo-400"
          >
            Notes
          </button>
        </div>
      </div>

      {/* Notes section */}
      {showNotes && (
        <div className="mt-3 border-t border-zinc-800 pt-3">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Write your insights, mistakes, edge cases…"
            rows={3}
            className="w-full rounded-md border border-zinc-800 bg-zinc-900 p-2 text-sm text-zinc-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      )}
    </Card>
  );
};

export default ProblemRow;
