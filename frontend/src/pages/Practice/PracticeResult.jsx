import Badge from "../../components/ui/Badge";

const PracticeResult = ({ problems }) => {
  if (!problems.length) return null;

  return (
    <div className="mt-12 space-y-4">
      <h2 className="text-lg font-semibold text-white">
        Your Practice Set
      </h2>

      {problems.map((p, index) => (
        <div
          key={p._id}
          className="flex items-center justify-between rounded-md border border-zinc-800 bg-zinc-950 px-4 py-3"
        >
          {/* Left */}
          <div className="min-w-0">
            <p className="truncate font-medium text-white">
              {index + 1}. {p.title}
            </p>

            <div className="mt-1 flex items-center gap-3 text-xs text-zinc-500">
              <span>
                Pattern:{" "}
                <span className="text-zinc-400">
                  {p.patternName || "—"}
                </span>
              </span>
              <Badge level={p.difficulty} />
            </div>
          </div>

          {/* Right */}
          <div className="flex shrink-0 items-center gap-3 text-sm">
            {p.leetcodeLink && (
              <a
                href={p.leetcodeLink}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-orange-400 hover:underline"
              >
                LC
              </a>
            )}
            {p.gfgLink && (
              <a
                href={p.gfgLink}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-green-400 hover:underline"
              >
                GFG
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PracticeResult;
