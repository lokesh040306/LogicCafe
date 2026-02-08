/**
 * Generic loading indicator
 */
const Loader = ({ label = "Loading…" }) => {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4">
      {/* Spinner */}
      <div
        className="
          h-10
          w-10
          animate-spin
          rounded-full
          border-2
          border-zinc-700
          border-t-violet-500
        "
      />

      {/* Text */}
      <p className="text-sm text-zinc-400">
        {label}
      </p>
    </div>
  );
};

export default Loader;
