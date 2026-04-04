import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
};

const styles = {
  primary: "bg-primary text-white hover:bg-primary-strong dark:text-slate-950",
  secondary: "border border-border bg-surface-strong text-foreground hover:bg-surface",
  ghost: "bg-transparent text-foreground hover:bg-surface",
  danger: "bg-danger text-white hover:brightness-95",
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-60",
        styles[variant],
        className,
      )}
      {...props}
    />
  );
}
