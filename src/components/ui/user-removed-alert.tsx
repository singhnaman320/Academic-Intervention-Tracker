"use client";

import { AlertTriangle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export function UserRemovedAlert() {
  const searchParams = useSearchParams();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (searchParams?.get("error") === "user_removed") {
      setIsVisible(true);
      // Clean up the URL
      const url = new URL(window.location.href);
      url.searchParams.delete("error");
      window.history.replaceState({}, "", url.toString());
    }
  }, [searchParams]);

  if (!isVisible) return null;

  return (
    <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
            Account Removed
          </h3>
          <p className="mt-1 text-sm text-red-700 dark:text-red-300">
            Your account has been removed from the system. If you believe this is an error, 
            please contact your system administrator.
          </p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="flex-shrink-0 rounded-lg p-1 text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/20"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
