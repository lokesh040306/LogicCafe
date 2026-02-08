import ProblemRow from "./ProblemRow";

/**
 * Groups problems by difficulty
 * (Pure list renderer — no progress logic)
 */
const ProblemList = ({ problems, onToggle }) => {
  const grouped = {
    easy: [],
    medium: [],
    hard: [],
  };

  problems.forEach((problem) => {
    grouped[problem.difficulty]?.push(problem);
  });

  return (
    <div className="space-y-14">
      {["easy", "medium", "hard"].map((level) =>
        grouped[level].length > 0 ? (
          <section key={level}>
            {/* Section Header */}
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-semibold capitalize text-zinc-100">
                {level}
              </h2>
              <span className="text-sm text-zinc-500">
                {grouped[level].length} problems
              </span>
            </div>

            {/* Problems */}
            <div className="space-y-2.5">
              {grouped[level].map((problem) => (
                <ProblemRow
                  key={problem._id}
                  problem={problem}
                  onToggle={onToggle}
                />
              ))}
            </div>
          </section>
        ) : null
      )}
    </div>
  );
};

export default ProblemList;
