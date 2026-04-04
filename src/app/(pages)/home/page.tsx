"use client";

import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Users, BookOpen, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Banner Section */}
      <section className="relative w-full h-64 sm:h-80 lg:h-96 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-600/20 to-emerald-500/20 dark:from-teal-600/30 dark:to-emerald-500/30">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>
        {/* <div className="relative h-full flex items-center justify-center">
          <div className="text-center z-10 animate-fade-in-up">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2">
              Transforming Education Through Data
            </h2>
            <p className="text-base sm:text-lg text-muted max-w-2xl mx-auto px-4">
              Empowering educators with intelligent intervention tracking and student success analytics
            </p>
          </div>
        </div> */}
        <Image 
          src="/hero-banner.jpg" 
          alt="Academic Intervention Tracker Banner"
          fill
          className="object-cover"
          priority
        />
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-16 animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 pb-4 bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent animate-gradient-shift">
              Empowering Student Success
            </h1>
            <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
              Comprehensive academic intervention tracking and management system designed to help educators identify at-risk students and implement timely support strategies.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="group rounded-3xl border border-border bg-surface p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-primary/20 hover:scale-105 hover:-translate-y-2 animate-fade-in-up animation-delay-300">
              <div className="rounded-2xl bg-primary/10 p-3 text-primary w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">Student Management</h3>
              <p className="text-muted">
                Track student progress, monitor attendance patterns, and identify at-risk individuals through comprehensive data analytics.
              </p>
            </div>

            <div className="group rounded-3xl border border-border bg-surface p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-primary/20 hover:scale-105 hover:-translate-y-2 animate-fade-in-up animation-delay-400">
              <div className="rounded-2xl bg-primary/10 p-3 text-primary w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                <Target className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">Intervention Planning</h3>
              <p className="text-muted">
                Design and implement targeted intervention strategies with clear objectives, timelines, and success metrics.
              </p>
            </div>

            <div className="group rounded-3xl border border-border bg-surface p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-primary/20 hover:scale-105 hover:-translate-y-2 animate-fade-in-up animation-delay-500">
              <div className="rounded-2xl bg-primary/10 p-3 text-primary w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">Progress Tracking</h3>
              <p className="text-muted">
                Monitor intervention effectiveness and student outcomes with real-time analytics and reporting tools.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center animate-fade-in-up animation-delay-600">
            <Link href="/login">
              <Button className="text-lg px-8 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 3s ease-in-out infinite;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .animation-delay-500 {
          animation-delay: 0.5s;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
        }
      `}</style>
    </main>
  );
}
