"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Home, Info, Key } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { siteConfig } from "@/lib/site";
import type { SessionUser } from "@/lib/types";
import { usePathname } from "next/navigation";

export function SiteHeader({ user }: { user: SessionUser | null }) {
  const pathname = usePathname();
  
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href={user ? "/dashboard" : "/login"} className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-stone-950 via-teal-900 to-teal-700 text-white shadow-lg shadow-stone-950/15 dark:shadow-black/30">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">House of Edtech</p>
            <p className="text-base font-semibold text-foreground">{siteConfig.name}</p>
          </div>
        </Link>

        <nav className="flex items-center gap-6">
          <Link 
            href="/home" 
            className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-colors ${
              pathname === "/home" 
                ? "bg-primary/10 text-primary" 
                : "text-muted hover:bg-surface-strong hover:text-foreground"
            }`}
          >
            <Home className="h-4 w-4" />
            <span className="font-medium">Home</span>
          </Link>
          
          <Link 
            href="/about-us" 
            className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-colors ${
              pathname === "/about-us" 
                ? "bg-primary/10 text-primary" 
                : "text-muted hover:bg-surface-strong hover:text-foreground"
            }`}
          >
            <Info className="h-4 w-4" />
            <span className="font-medium">About</span>
          </Link>
        </nav>
          
        <div className="flex items-center gap-3">
            <ThemeSwitcher />
            {user ? (
              <>
                {user.role === "admin" ? (
                  <Link
                    href="/dashboard/access"
                    className={`hidden rounded-2xl px-4 py-2 text-sm font-semibold transition lg:inline-flex items-center gap-2 ${
                      pathname === "/dashboard/access"
                        ? "bg-primary/10 text-primary"
                        : "text-muted hover:bg-surface-strong hover:text-foreground"
                    }`}
                  >
                    <Key className="h-4 w-4" />
                    Access
                  </Link>
                ) : null}
                <div className="hidden text-right sm:block">
                  <p className="text-sm font-semibold text-foreground">{user.name}</p>
                  <p className="text-xs text-muted">{user.email}</p>
                </div>
                <Badge tone={user.role}>{user.role}</Badge>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 rounded-2xl border border-border bg-surface-strong px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-surface"
                >
                  Dashboard <ArrowRight className="h-4 w-4" />
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/register"
                  className="hidden rounded-2xl px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-surface sm:inline-flex"
                >
                  Register
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 rounded-2xl bg-stone-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-stone-800 dark:bg-primary dark:text-slate-950 dark:hover:bg-primary-strong"
                >
                  Login <ArrowRight className="h-4 w-4" />
                </Link>
              </>
            )}
          </div>
        </div>
    </header>
  );
}
