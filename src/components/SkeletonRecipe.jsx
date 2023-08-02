import React from "react";
import Skeleton from "react-loading-skeleton";
function SkeletonRecipe() {
  return (
    <div className="max-w-[768px] md:mx-auto mx-5 ">
      <h1>
        <Skeleton className="h-10 my-5 " />
      </h1>
      <Skeleton className=" aspect-[1.5]" />
      <div className="flex flex-wrap gap-5 my-5">
        <Skeleton circle width={60} height={60} />
        <Skeleton circle width={60} height={60} />
        <Skeleton circle width={60} height={60} />
        <Skeleton circle width={60} height={60} />
        <Skeleton circle width={60} height={60} />
      </div>
    </div>
  );
}

export default SkeletonRecipe;
