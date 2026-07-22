import type { HTMLAttributes, ReactNode } from "react";

type SurfaceProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function Surface({ children, className = "", ...props }: SurfaceProps) {
  return (
    <div className={`surface ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}
