"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  parseISO,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/theme-context";

type DatePickerProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export function DatePicker({
  value,
  onChange,
  placeholder = "Select date",
  className,
}: DatePickerProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const selectedDate = value ? parseISO(value) : null;
  const [open, setOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(selectedDate ?? new Date());
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const days = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);

    return eachDayOfInterval({
      start: startOfWeek(monthStart, { weekStartsOn: 1 }),
      end: endOfWeek(monthEnd, { weekStartsOn: 1 }),
    });
  }, [currentMonth]);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function selectDate(date: Date) {
    onChange(format(date, "yyyy-MM-dd"));
    setCurrentMonth(date);
    setOpen(false);
  }

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className={cn(
          "flex w-full items-center justify-between rounded-2xl border px-4 py-2 text-left text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20",
          mounted && (isDark
            ? "border-border bg-surface text-foreground"
            : "border-stone-300 bg-[#f6efe2] text-slate-900"),
          open && "border-primary ring-2 ring-primary/20",
        )}
      >
        <span
          className={cn(
            "font-medium",
            !value && "text-slate-500 font-normal dark:text-muted",
          )}
        >
          {selectedDate ? format(selectedDate, "dd-MM-yyyy") : placeholder}
        </span>
        <span
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-xl",
            mounted && "bg-teal-100 text-teal-700 dark:bg-primary/10 dark:text-primary",
          )}
        >
          <CalendarDays className="h-4 w-4" />
        </span>
      </button>

      {open && mounted ? (
        <div
          className={cn(
            "absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 w-full overflow-hidden rounded-[1.6rem] border p-3 backdrop-blur-xl",
            isDark
              ? "border-border bg-[linear-gradient(180deg,rgba(20,34,44,0.98),rgba(10,19,26,0.98))] text-foreground shadow-[0_28px_80px_rgba(0,0,0,0.45)]"
              : "border border-stone-300 bg-[linear-gradient(180deg,rgba(255,252,246,0.98),rgba(244,236,224,0.98))] text-slate-900 shadow-[0_20px_55px_rgba(15,23,42,0.14)]",
          )}
        >
          <div
            className={cn(
              "rounded-[1.2rem] p-4 text-white",
              isDark
                ? "bg-gradient-to-r from-stone-950 via-teal-900 to-teal-700 shadow-lg shadow-stone-950/20"
                : "bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-500 shadow-lg shadow-teal-900/10",
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-teal-100/90">
                  Review Schedule
                </p>
                <p className="mt-1 text-lg font-semibold">
                  {format(currentMonth, "MMMM yyyy")}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentMonth((current) => subMonths(current, 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white transition hover:bg-white/18"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentMonth((current) => addMonths(current, 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white transition hover:bg-white/18"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div
            className={cn(
              "mt-3 rounded-[1.2rem] border p-3",
              isDark ? "border-border bg-white/[0.03]" : "border-stone-300 bg-[#fffaf2]",
            )}
          >
            <div
              className={cn(
                "mb-2 grid grid-cols-7 gap-1 text-center text-[11px] font-semibold uppercase tracking-[0.24em]",
                isDark ? "text-muted" : "text-slate-500",
              )}
            >
              {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
                <span key={day} className="py-2">
                  {day}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1.5">
              {days.map((day) => {
                const selected = selectedDate ? isSameDay(day, selectedDate) : false;
                const inMonth = isSameMonth(day, currentMonth);
                const today = isToday(day);

                return (
                  <button
                    key={day.toISOString()}
                    type="button"
                    onClick={() => selectDate(day)}
                    className={cn(
                      "relative rounded-xl py-2.5 text-sm font-medium transition",
                      selected
                        ? "bg-primary text-white shadow-lg shadow-primary/25 dark:text-slate-950"
                        : inMonth
                          ? isDark
                            ? "text-foreground hover:bg-surface"
                            : "text-slate-900 hover:bg-stone-200"
                          : isDark
                            ? "text-muted/45 hover:bg-surface/70"
                            : "text-slate-400 hover:bg-stone-100",
                      today && !selected && "ring-1 ring-primary/35",
                    )}
                  >
                    {today && !selected ? (
                      <span className="absolute left-1/2 top-1.5 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-primary" />
                    ) : null}
                    {format(day, "d")}
                  </button>
                );
              })}
            </div>
          </div>

          <div
            className={cn(
              "mt-3 flex items-center justify-between gap-3 rounded-[1.1rem] px-3 py-3",
              isDark ? "bg-white/[0.03]" : "bg-stone-100",
            )}
          >
            <button
              type="button"
              onClick={() => {
                onChange("");
                setOpen(false);
              }}
              className={cn(
                "rounded-xl px-3 py-2 text-sm transition",
                isDark
                  ? "text-muted hover:bg-white/[0.05] hover:text-foreground"
                  : "text-slate-700 hover:bg-stone-200 hover:text-slate-900",
              )}
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => selectDate(new Date())}
              className="rounded-xl bg-primary px-3 py-2 text-sm font-semibold text-white transition hover:bg-primary-strong dark:text-slate-950"
            >
              Today
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

