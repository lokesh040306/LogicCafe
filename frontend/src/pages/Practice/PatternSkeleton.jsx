import Skeleton from "../../components/ui/Skeleton";

const PatternSkeleton = () => {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton
          key={i}
          className="h-16"
        />
      ))}
    </div>
  );
};

export default PatternSkeleton;
