import Skeleton from "../../components/ui/Skeleton";

const PracticeResultSkeleton = () => {
  return (
    <div className="mt-12 space-y-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton
          key={i}
          className="h-16"
        />
      ))}
    </div>
  );
};

export default PracticeResultSkeleton;
