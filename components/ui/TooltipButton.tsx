"use client";

import { useState, type ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { label: string };

/** A redundant visual label, available on focus as well as hover; Escape dismisses it. */
export function TooltipButton({ label, children, className = "", ...props }: Props) {
  const [visible, setVisible] = useState(false);
  return (
    <button
      {...props}
      className={`tooltip-button ${className}`}
      aria-label={label}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
      onKeyDown={(event) => {
        if (event.key === "Escape") setVisible(false);
        props.onKeyDown?.(event);
      }}
    >
      {children}
      <span className="control-tooltip" data-visible={visible} aria-hidden="true">{label}</span>
    </button>
  );
}
