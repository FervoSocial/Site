"use client";

import { useState } from "react";

export function LogoutButton({ className, label }: { className?: string; label: string }) {
  const [waiting, setWaiting] = useState(false);

  async function logout() {
    setWaiting(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      window.location.assign("/login");
    }
  }

  return (
    <button className={className} type="button" onClick={logout} disabled={waiting}>
      {waiting ? "A sair…" : label}
    </button>
  );
}
