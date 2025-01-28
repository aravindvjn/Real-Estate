import React, { ReactNode } from "react";
export type ContainerProps = {
  children: ReactNode;
  className?: string;
  center?: boolean;
};
function Container({ children, className, center }: ContainerProps) {
  return (
    <div
      className={
        center
          ? `flex justify-center items-center flex-col ${className}`
          : className
      }
    >
      {children}
    </div>
  );
}

export default Container;
