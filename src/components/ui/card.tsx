import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl sm:rounded-3xl border border-border bg-surface-strong shadow-[0_18px_45px_rgba(15,23,42,0.08)] dark:shadow-[0_22px_55px_rgba(0,0,0,0.28)]",
        className,
      )}
      {...props}
    />
  );
}
