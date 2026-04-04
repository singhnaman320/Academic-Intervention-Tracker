import { cn } from "@/lib/utils";

type AlertProps = {
  children: React.ReactNode;
  variant?: "info" | "error" | "success";
  className?: string;
};

const styles = {
  info: "bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-200 dark:border-blue-800",
  error: "bg-red-50 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-200 dark:border-red-800",
  success: "bg-green-50 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-200 dark:border-green-800",
};

export function Alert({ children, variant = "info", className }: AlertProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border px-4 py-3 text-sm font-medium",
        styles[variant],
        className
      )}
    >
      {children}
    </div>
  );
}
