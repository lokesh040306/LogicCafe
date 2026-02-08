import Card from "../../components/ui/Card";

/**
 * PatternInfo
 * -----------
 * Renders pattern overview + theory.
 * Fully backend-driven, safe with fallbacks.
 */
const PatternInfo = ({ pattern }) => {
  if (!pattern) return null;

  return (
    <div className="mb-10 space-y-6">
      {/* Pattern Description */}
      <Card className="p-6">
        <h2 className="mb-2 text-lg font-semibold">About this pattern</h2>
        <p className="text-sm text-zinc-400">
          {pattern.description || "Description will be added soon."}
        </p>
      </Card>

      {/* Keywords */}
      <Card className="p-6">
        <h2 className="mb-2 text-lg font-semibold">Common keywords / signals</h2>

        {pattern.keywords && pattern.keywords.length > 0 ? (
          <ul className="list-disc space-y-1 pl-5 text-sm text-zinc-400">
            {pattern.keywords.map((word, idx) => (
              <li key={idx}>{word}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-zinc-500">
            Keywords will be added for this pattern soon.
          </p>
        )}
      </Card>

      {/* Sub-patterns */}
      <Card className="p-6">
        <h2 className="mb-2 text-lg font-semibold">Sub-patterns</h2>

        {pattern.subPatterns && pattern.subPatterns.length > 0 ? (
          <div className="space-y-3">
            {pattern.subPatterns.map((sub, idx) => (
              <div key={idx}>
                <p className="text-sm font-medium text-zinc-200">
                  {sub.title}
                </p>
                <p className="text-sm text-zinc-400">
                  {sub.description}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-zinc-500">
            Sub-patterns will be added for this pattern soon.
          </p>
        )}
      </Card>

      {/* When to use / when not to use */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="mb-2 text-lg font-semibold">When to use</h2>

          {pattern.whenToUse && pattern.whenToUse.length > 0 ? (
            <ul className="list-disc space-y-1 pl-5 text-sm text-zinc-400">
              {pattern.whenToUse.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-zinc-500">
              Usage guidelines will be added soon.
            </p>
          )}
        </Card>

        <Card className="p-6">
          <h2 className="mb-2 text-lg font-semibold">When NOT to use</h2>

          {pattern.whenNotToUse && pattern.whenNotToUse.length > 0 ? (
            <ul className="list-disc space-y-1 pl-5 text-sm text-zinc-400">
              {pattern.whenNotToUse.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-zinc-500">
              Limitations will be added soon.
            </p>
          )}
        </Card>
      </div>

      {/* Time & Space Complexity */}
      <Card className="p-6">
        <h2 className="mb-3 text-lg font-semibold">Complexity</h2>

        <div className="flex flex-col gap-2 text-sm text-zinc-400">
          <p>
            <span className="font-medium text-zinc-200">
              Time Complexity:
            </span>{" "}
            {pattern.timeComplexity || "To be added"}
          </p>

          <p>
            <span className="font-medium text-zinc-200">
              Space Complexity:
            </span>{" "}
            {pattern.spaceComplexity || "To be added"}
          </p>
        </div>
      </Card>

      {/* Code Template */}
      <Card className="p-6">
        <h2 className="mb-3 text-lg font-semibold">
          Generic code structure
        </h2>

        {pattern.codeTemplate ? (
          <pre className="overflow-x-auto rounded-md bg-zinc-950 p-4 text-xs text-zinc-300">
            {pattern.codeTemplate}
          </pre>
        ) : (
          <p className="text-sm text-zinc-500">
            Code template will be added soon.
          </p>
        )}
      </Card>
    </div>
  );
};

export default PatternInfo;
