"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type ToastProps = {
  message: string;
  variant?: "info" | "error" | "success";
  onClose?: () => void;
};

const styles = {
  info: "bg-blue-600 text-white",
  error: "bg-red-600 text-white",
  success: "bg-green-600 text-white",
};

export function Toast({ message, variant = "info", onClose }: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible) return null;

  return (
    <div
      className={cn(
        "fixed top-4 right-4 z-50 flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium shadow-lg transition-all duration-300 animate-in slide-in-from-top-2",
        styles[variant]
      )}
    >
      <span>{message}</span>
      <button
        onClick={() => {
          setVisible(false);
          onClose?.();
        }}
        className="ml-3 hover:opacity-80"
        aria-label="Close"
      >
        ✕
      </button>
    </div>
  );
}
