import Card from "../../components/ui/Card";

/**
 * PatternTheory
 * Fully defensive & backend-driven renderer
 */
const PatternTheory = ({ pattern }) => {
  if (!pattern) return null;

  return (
    <div className="mb-20 space-y-8">
      {/* What is this pattern */}
      <Card className="p-6">
        <h2 className="mb-2 text-lg font-semibold text-zinc-100">
          What is this pattern?
        </h2>
        <p className="text-sm leading-relaxed text-zinc-400">
          {pattern.description ||
            "This pattern represents a reusable way of thinking to solve a group of related problems efficiently."}
        </p>
      </Card>

      {/* Common keywords */}
      <Card className="p-6">
        <h2 className="mb-3 text-lg font-semibold text-zinc-100">
          Common keywords / signals
        </h2>

        {pattern.keywords?.length > 0 ? (
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-zinc-400">
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
        <h2 className="mb-3 text-lg font-semibold text-zinc-100">
          Sub-patterns / Variations
        </h2>

        {pattern.subPatterns?.length > 0 ? (
          <ul className="space-y-3 text-sm text-zinc-400">
            {pattern.subPatterns.map((sp, idx) => (
              <li key={idx}>
                <span className="font-medium text-zinc-200">
                  {sp.title}
                </span>{" "}
                — {sp.description}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-zinc-500">
            This pattern may have multiple variations depending on the problem.
          </p>
        )}
      </Card>

      {/* When to use */}
      <Card className="p-6">
        <h2 className="mb-3 text-lg font-semibold text-zinc-100">
          When to use
        </h2>

        {pattern.whenToUse?.length > 0 ? (
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-zinc-400">
            {pattern.whenToUse.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-zinc-500">
            Use this pattern when problem constraints hint toward an optimized approach.
          </p>
        )}
      </Card>

      {/* When NOT to use */}
      <Card className="p-6">
        <h2 className="mb-3 text-lg font-semibold text-zinc-100">
          When NOT to use
        </h2>

        {pattern.whenNotToUse?.length > 0 ? (
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-zinc-400">
            {pattern.whenNotToUse.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-zinc-500">
            Avoid forcing this pattern when a simpler solution exists.
          </p>
        )}
      </Card>

      {/* Time & Space Complexity */}
      <Card className="p-6">
        <h2 className="mb-3 text-lg font-semibold text-zinc-100">
          Time & Space Complexity
        </h2>

        <div className="space-y-1.5 text-sm text-zinc-400">
          <p>
            <span className="font-medium text-zinc-200">Time:</span>{" "}
            {pattern.timeComplexity || "Varies by problem"}
          </p>
          <p>
            <span className="font-medium text-zinc-200">Space:</span>{" "}
            {pattern.spaceComplexity || "Varies by problem"}
          </p>
        </div>
      </Card>

      {/* Code template */}
      <Card className="p-6">
        <h2 className="mb-3 text-lg font-semibold text-zinc-100">
          Generic code structure
        </h2>

        {pattern.codeTemplate ? (
          <pre className="overflow-x-auto rounded-lg bg-zinc-950 p-4 text-xs leading-relaxed text-zinc-300">
            {pattern.codeTemplate}
          </pre>
        ) : (
          <pre className="overflow-x-auto rounded-lg bg-zinc-950 p-4 text-xs leading-relaxed text-zinc-500">
{`// Generic pattern template

initialize required variables

while (condition):
    apply pattern logic
    update state

return result`}
          </pre>
        )}
      </Card>
    </div>
  );
};

export default PatternTheory;
