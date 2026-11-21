"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { Check } from "lucide-react";

interface ToastContextType {
  toast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);

  const toast = useCallback((msg: string) => {
    setMessage(msg);
    const timer = setTimeout(() => {
      setMessage(null);
    }, 1600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {message && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[var(--z-toast)] flex items-center gap-2 rounded-full border border-[var(--line-strong)] bg-[var(--surface-2)] px-4 py-2 text-xs font-mono font-medium text-[var(--text-1)] shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-200">
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--accent-subtle)] text-[var(--accent)]">
            <Check className="h-2.5 w-2.5" />
          </span>
          <span>{message}</span>
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
