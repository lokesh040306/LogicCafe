const PatternSelector = ({ patterns, selected, onChange }) => {
  const toggle = (id) => {
    onChange(
      selected.includes(id)
        ? selected.filter((p) => p !== id)
        : [...selected, id]
    );
  };

  return (
    <div>
      <h3 className="mb-1 text-sm font-semibold text-zinc-200">
        Step 1: Choose DSA Patterns
      </h3>
      <p className="mb-4 text-xs text-zinc-500">
        Select patterns you want to practice. Problems will be picked only from these patterns.
      </p>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {patterns.map((p) => {
          const active = selected.includes(p._id);

          return (
            <button
              key={p._id}
              onClick={() => toggle(p._id)}
              className={`flex flex-col items-start rounded-lg border p-4 text-left transition
                ${
                  active
                    ? "border-primary bg-primary/10"
                    : "border-zinc-800 bg-zinc-950 hover:border-zinc-700"
                }`}
            >
              <span
                className={`text-sm font-medium ${
                  active ? "text-primary" : "text-zinc-200"
                }`}
              >
                {p.name}
              </span>

              <span className="mt-1 text-xs text-zinc-500">
                Practice common interview problems from this pattern
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PatternSelector;
