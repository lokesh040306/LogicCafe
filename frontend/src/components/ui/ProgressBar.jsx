const ProgressBar = ({ value = 0, max = 100 }) => {
  const percentage =
    max > 0 ? Math.round((value / max) * 100) : 0;

  return (
    <div>
      {/* Bar */}
      <div className="h-3 w-full rounded-full bg-zinc-800 overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Label */}
      <div className="mt-2 flex justify-between text-xs text-zinc-400">
        <span>{percentage}% completed</span>
        <span>
          {value} / {max}
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
