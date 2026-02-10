import Skeleton from "./ui/Skeleton";

const ProductCardSkeleton = () => {
  return (
    <div>
      <div className="pb-7">
        <Skeleton width="100%" height="200px" />
      </div>

      <div className="flex gap-7 flex-row">
        <Skeleton width="100%" height="20.8px" />
        <Skeleton width="100%" height="50px" />

        <Skeleton width="100%" height="20.8px" />

        <div className="flex gap-4">
          <Skeleton width="100%" height="39.2px" />
          <Skeleton width="100%" height="39.2px" />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
