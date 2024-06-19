// progress.d.ts
import * as React from "react";

export interface ProgressProps extends React.ComponentPropsWithoutRef<"div"> {
  value: number;
  className?: string;
}

export const Progress: React.ForwardRefExoticComponent<
  ProgressProps & React.RefAttributes<HTMLDivElement>
>;
