import React from "react";
import ReactDOM from "react-dom";
import { Skeleton } from "../ui/skeleton";
import Product7 from "../../assets/product11.png";

export function LoaderSkeleton() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}

export const LoaderPortal = () => {
  return ReactDOM.createPortal(
    <div>
      <img src={Product7} alt="Loading..." />
    </div>,
    document.getElementById("loader")
  );
};
