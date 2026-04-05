"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Home, Info, Key, Menu, X, User, LogOut, HelpCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { siteConfig } from "@/lib/site";
import type { SessionUser } from "@/lib/types";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function SiteHeader({ user }: { user: SessionUser | null }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href={user ? "/dashboard" : "/login"} className="flex items-center gap-2 sm:gap-3">
          <div className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-stone-950 via-teal-900 to-teal-700 text-white shadow-lg shadow-stone-950/15 dark:shadow-black/30">
            <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <div className="hidden sm:block">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-primary">House of Edtech</p>
            <p className="text-sm sm:text-base font-semibold text-foreground">{siteConfig.name}</p>
          </div>
          <div className="sm:hidden">
            <p className="text-sm font-semibold text-foreground">{siteConfig.name}</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex items-center gap-4 lg:gap-6">
          <Link 
            href="/home" 
            className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-colors ${
              pathname === "/home" 
                ? "bg-primary/10 text-primary" 
                : "text-muted hover:bg-surface-strong hover:text-foreground"
            }`}
          >
            <Home className="h-4 w-4" />
            <span className="font-medium text-sm">Home</span>
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
            <span className="font-medium text-sm">About</span>
          </Link>

          <Link 
            href="/help" 
            className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-colors ${
              pathname === "/help" 
                ? "bg-primary/10 text-primary" 
                : "text-muted hover:bg-surface-strong hover:text-foreground"
            }`}
          >
            <HelpCircle className="h-4 w-4" />
            <span className="font-medium text-sm hidden lg:inline">Help</span>
          </Link>
        </nav>
          
        {/* Desktop Actions */}
        <div className="hidden sm:flex items-center gap-2 lg:gap-3">
          <ThemeSwitcher />
          {user ? (
            <>
              {user.role === "admin" ? (
                <Link
                  href="/dashboard/access"
                  className={`hidden rounded-2xl px-3 lg:px-4 py-2 text-xs lg:text-sm font-semibold transition lg:inline-flex items-center gap-2 ${
                    pathname === "/dashboard/access"
                      ? "bg-primary/10 text-primary"
                      : "text-muted hover:bg-surface-strong hover:text-foreground"
                  }`}
                >
                  <Key className="h-4 w-4" />
                  <span className="hidden lg:inline">Access</span>
                </Link>
              ) : null}
              <div className="hidden text-right sm:block">
                <p className="text-xs sm:text-sm font-semibold text-foreground">{user.name}</p>
                <p className="text-xs text-muted hidden lg:block">{user.email}</p>
              </div>
              <Badge tone={user.role} className="text-xs">{user.role}</Badge>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-xl lg:rounded-2xl border border-border bg-surface-strong px-3 lg:px-4 py-2 text-xs lg:text-sm font-semibold text-foreground transition hover:bg-surface"
              >
                <span className="hidden sm:inline">Dashboard</span>
                <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/register"
                className="hidden rounded-xl lg:rounded-2xl px-3 lg:px-4 py-2 text-xs lg:text-sm font-semibold text-foreground transition hover:bg-surface lg:inline-flex"
              >
                Register
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-xl lg:rounded-2xl bg-stone-950 px-3 lg:px-4 py-2 text-xs lg:text-sm font-semibold text-white transition hover:bg-stone-800 dark:bg-primary dark:text-slate-950 dark:hover:bg-primary-strong"
              >
                <span className="hidden sm:inline">Login</span>
                <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="sm:hidden flex items-center gap-2">
          <ThemeSwitcher />
          <Button
            variant="ghost"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <div className="px-4 py-4 space-y-3">
            {/* Mobile Navigation Links */}
            <Link 
              href="/home" 
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-colors ${
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
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-colors ${
                pathname === "/about-us" 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted hover:bg-surface-strong hover:text-foreground"
              }`}
            >
              <Info className="h-4 w-4" />
              <span className="font-medium">About</span>
            </Link>

            <Link 
              href="/help" 
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-colors ${
                pathname === "/help" 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted hover:bg-surface-strong hover:text-foreground"
              }`}
            >
              <HelpCircle className="h-4 w-4" />
              <span className="font-medium">Help</span>
            </Link>

            {user && user.role === "admin" && (
              <Link
                href="/dashboard/access"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-colors ${
                  pathname === "/dashboard/access"
                    ? "bg-primary/10 text-primary"
                    : "text-muted hover:bg-surface-strong hover:text-foreground"
                }`}
              >
                <Key className="h-4 w-4" />
                <span className="font-medium">Access</span>
              </Link>
            )}

            {/* Mobile User Actions */}
            {user ? (
              <div className="pt-3 border-t border-border space-y-3">
                <div className="flex items-center gap-3 px-3 py-2">
                  <User className="h-4 w-4 text-muted" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{user.name}</p>
                    <p className="text-xs text-muted">{user.email}</p>
                  </div>
                  <Badge tone={user.role} className="text-xs ml-auto">{user.role}</Badge>
                </div>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl bg-surface-strong text-foreground hover:bg-surface transition"
                >
                  <ArrowRight className="h-4 w-4" />
                  <span className="font-medium">Dashboard</span>
                </Link>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 px-3 py-2 text-muted hover:text-foreground"
                  onClick={() => {
                    // Handle logout
                    window.location.href = "/api/auth/logout";
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  <span className="font-medium">Sign Out</span>
                </Button>
              </div>
            ) : (
              <div className="pt-3 border-t border-border space-y-3">
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center px-3 py-2 rounded-xl border border-border bg-surface-strong text-foreground hover:bg-surface transition font-medium"
                >
                  Register
                </Link>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center px-3 py-2 rounded-xl bg-stone-950 text-white hover:bg-stone-800 dark:bg-primary dark:text-slate-950 dark:hover:bg-primary-strong transition font-medium"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
