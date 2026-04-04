import { cn } from "@/lib/utils";

const styles = {
  "on-track": "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/12 dark:text-emerald-300",
  watchlist: "bg-amber-50 text-amber-700 dark:bg-amber-500/12 dark:text-amber-300",
  urgent: "bg-red-50 text-red-700 dark:bg-red-500/12 dark:text-red-300",
  planned: "bg-sky-50 text-sky-700 dark:bg-sky-500/12 dark:text-sky-300",
  active: "bg-orange-50 text-orange-700 dark:bg-orange-500/12 dark:text-orange-300",
  completed: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/12 dark:text-emerald-300",
  low: "bg-slate-100 text-slate-700 dark:bg-slate-500/15 dark:text-slate-200",
  medium: "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300",
  high: "bg-orange-50 text-orange-700 dark:bg-orange-500/12 dark:text-orange-300",
  critical: "bg-red-50 text-red-700 dark:bg-red-500/12 dark:text-red-300",
  admin: "bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900",
  teacher: "bg-teal-50 text-teal-700 dark:bg-teal-500/12 dark:text-teal-300",
  counselor: "bg-violet-50 text-violet-700 dark:bg-violet-500/12 dark:text-violet-300",
};

export function Badge({
  tone,
  className,
  children,
}: {
  tone: keyof typeof styles;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize",
        styles[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
