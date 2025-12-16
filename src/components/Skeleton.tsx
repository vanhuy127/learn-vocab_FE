import { Skeleton } from './ui/skeleton';

const SearchItemSkeleton = () => {
  return (
    <div className="bg-card rounded-2xl border p-6">
      <div className="flex gap-5">
        {/* Avatar / Icon */}
        <Skeleton className="h-14 w-14 rounded-xl" />

        <div className="flex-1 space-y-3">
          {/* Label */}
          <Skeleton className="h-4 w-24" />
          {/* Title */}
          <Skeleton className="h-6 w-2/3" />
          {/* Description */}
          <Skeleton className="h-4 w-full" />
          {/* Meta */}
          <div className="flex gap-4">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </div>
    </div>
  );
};

interface Props {
  count?: number;
  Component: React.ComponentType;
}

const SkeletonList = ({ count = 7, Component }: Props) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Component key={index} />
      ))}
    </>
  );
};

export default SkeletonList;
export { SearchItemSkeleton };
