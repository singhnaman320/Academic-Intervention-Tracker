"use client";

import { Children, useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";

type OptionShape = {
  value: string;
  label: string;
  disabled?: boolean;
};

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  searchable?: boolean;
  searchPlaceholder?: string;
  emptyMessage?: string;
};

function getNodeText(node: React.ReactNode): string {
  return Children.toArray(node)
    .map((child) => {
      if (typeof child === "string" || typeof child === "number") {
        return String(child);
      }

      if (child && typeof child === "object" && "props" in child) {
        const element = child as React.ReactElement<{ children?: React.ReactNode }>;
        return getNodeText(element.props.children);
      }

      return "";
    })
    .join("");
}

function extractOptions(children: React.ReactNode): OptionShape[] {
  return Children.toArray(children)
    .flatMap((child) => {
      if (!child || typeof child !== "object" || !("props" in child)) {
        return [];
      }

      const option = child as React.ReactElement<{
        value?: string;
        children?: React.ReactNode;
        disabled?: boolean;
      }>;

      return [
        {
          value: String(option.props.value ?? ""),
          label: getNodeText(option.props.children),
          disabled: option.props.disabled,
        },
      ];
    })
    .filter((option) => option.label.length > 0 || option.value.length > 0);
}

export function Select({
  className,
  children,
  value,
  defaultValue,
  onChange,
  disabled,
  name,
  searchable = false,
  searchPlaceholder = "Search...",
  emptyMessage = "No results found.",
  ...props
}: SelectProps) {
  const options = useMemo(() => extractOptions(children), [children]);
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(
    String(defaultValue ?? options[0]?.value ?? ""),
  );
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedValue = isControlled ? String(value ?? "") : internalValue;
  const selectedOption = options.find((option) => option.value === selectedValue) ?? options[0];
  const filteredOptions = useMemo(() => {
    if (!searchable) {
      return options;
    }

    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return options;
    }

    return options.filter((option) => option.label.toLowerCase().includes(query));
  }, [options, searchable, searchQuery]);

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

  useEffect(() => {
    if (!isControlled && options.length > 0 && !options.some((option) => option.value === internalValue)) {
      setInternalValue(options[0]?.value ?? "");
    }
  }, [internalValue, isControlled, options]);

  useEffect(() => {
    if (open && searchable) {
      searchInputRef.current?.focus();
    }

    if (!open) {
      setSearchQuery("");
    }
  }, [open, searchable]);

  function handleSelect(nextValue: string) {
    if (!isControlled) {
      setInternalValue(nextValue);
    }

    onChange?.({
      target: { value: nextValue, name },
      currentTarget: { value: nextValue, name },
    } as React.ChangeEvent<HTMLSelectElement>);

    setOpen(false);
  }

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      {name ? <input type="hidden" name={name} value={selectedValue} /> : null}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((current) => !current)}
        className={cn(
          "flex w-full items-center justify-between rounded-xl sm:rounded-2xl border border-border bg-surface px-3 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60",
          open && "border-primary ring-2 ring-primary/20",
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={cn(!selectedOption?.value && "text-muted")}>
          {selectedOption?.label ?? "Select an option"}
        </span>
        <ChevronDown className={cn("h-4 w-4 text-muted transition", open && "rotate-180")} />
      </button>

      {open && !disabled ? (
        <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 overflow-hidden rounded-2xl border border-border bg-surface-strong p-2 shadow-[0_22px_55px_rgba(15,23,42,0.16)] dark:shadow-[0_22px_60px_rgba(0,0,0,0.35)]">
          {searchable ? (
            <div className="mb-2 flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2">
              <Search className="h-4 w-4 text-muted" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder={searchPlaceholder}
                className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted"
              />
            </div>
          ) : null}
          <div className="max-h-64 overflow-y-auto pr-1">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-sm text-muted">{emptyMessage}</div>
            ) : null}
            {filteredOptions.map((option) => {
              const active = option.value === selectedValue;

              return (
                <button
                  key={`${name ?? "select"}-${option.value}`}
                  type="button"
                  disabled={option.disabled}
                  onClick={() => handleSelect(option.value)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm transition",
                    option.disabled
                      ? "cursor-not-allowed opacity-50"
                      : active
                        ? "bg-primary/12 text-primary"
                        : "text-foreground hover:bg-surface",
                  )}
                  role="option"
                  aria-selected={active}
                >
                  <span>{option.label}</span>
                  {active ? <Check className="h-4 w-4" /> : null}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      <select
        value={selectedValue}
        onChange={onChange}
        disabled={disabled}
        name={name}
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
        {...props}
      >
        {children}
      </select>
    </div>
  );
}
