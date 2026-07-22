import Link from "next/link";
import type { ReactNode } from "react";

type ActionLinkProps = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary";
};

export function ActionLink({
  children,
  href,
  variant = "primary",
}: ActionLinkProps) {
  return (
    <Link className={`action-link action-link-${variant}`} href={href}>
      {children}
    </Link>
  );
}
