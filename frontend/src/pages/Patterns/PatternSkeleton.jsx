import Skeleton from "../../components/ui/Skeleton";

const PatternSkeleton = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-full" />
      </div>

      {/* Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-6 space-y-4"
          >
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />

            <div className="pt-6 space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-1.5 w-full" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PatternSkeleton;
