"use client";

import Link from "next/link";
import { ShieldCheck, Users, Target, BookOpen, Award, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-16 animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent animate-gradient-shift">
              About Our Mission
            </h1>
            <p className="text-lg sm:text-xl text-muted max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
              We're dedicated to transforming educational outcomes through innovative technology and data-driven intervention strategies.
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            <div className="animate-fade-in-up animation-delay-300">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <div className="rounded-2xl bg-primary/10 p-2 text-primary group-hover:scale-110 transition-transform duration-300">
                  <Target className="h-6 w-6" />
                </div>
                Our Mission
              </h2>
              <p className="text-muted mb-6 leading-relaxed">
                To empower educators with intelligent tools that identify at-risk students early, enabling timely interventions that prevent academic struggles before they become critical. We believe every student deserves personalized support based on real-time data insights.
              </p>
              <p className="text-muted leading-relaxed">
                Our platform combines predictive analytics, intervention tracking, and progress monitoring into one seamless experience that saves teachers time while improving student outcomes.
              </p>
            </div>

            <div className="animate-fade-in-up animation-delay-400">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <div className="rounded-2xl bg-primary/10 p-2 text-primary group-hover:scale-110 transition-transform duration-300">
                  <Award className="h-6 w-6" />
                </div>
                What We Do
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4 group hover:bg-surface p-3 rounded-xl transition-all duration-300">
                  <div className="rounded-2xl bg-surface p-3 text-primary group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors duration-300">Student Risk Assessment</h3>
                    <p className="text-muted">Advanced algorithms analyze attendance, grades, and behavior patterns to identify students needing support.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 group hover:bg-surface p-3 rounded-xl transition-all duration-300">
                  <div className="rounded-2xl bg-surface p-3 text-primary group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors duration-300">Intervention Planning</h3>
                    <p className="text-muted">Create structured intervention plans with clear objectives, timelines, and success metrics.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 group hover:bg-surface p-3 rounded-xl transition-all duration-300">
                  <div className="rounded-2xl bg-surface p-3 text-primary group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors duration-300">Progress Monitoring</h3>
                    <p className="text-muted">Track intervention effectiveness and student outcomes with comprehensive analytics.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center animate-fade-in-up animation-delay-500 hover:scale-105 transition-transform duration-300">
              <div className="text-3xl font-bold text-primary mb-2 animate-pulse">10K+</div>
              <p className="text-sm text-muted">Students Supported</p>
            </div>
            <div className="text-center animate-fade-in-up animation-delay-600 hover:scale-105 transition-transform duration-300">
              <div className="text-3xl font-bold text-primary mb-2 animate-pulse">95%</div>
              <p className="text-sm text-muted">Success Rate</p>
            </div>
            <div className="text-center animate-fade-in-up animation-delay-700 hover:scale-105 transition-transform duration-300">
              <div className="text-3xl font-bold text-primary mb-2 animate-pulse">500+</div>
              <p className="text-sm text-muted">Educators Using</p>
            </div>
            <div className="text-center animate-fade-in-up animation-delay-800 hover:scale-105 transition-transform duration-300">
              <div className="text-3xl font-bold text-primary mb-2 animate-pulse">24/7</div>
              <p className="text-sm text-muted">Support Available</p>
            </div>
          </div>

          <div className="mt-16 text-center animate-fade-in-up animation-delay-900">
            <Link href="/login">
              <Button className="text-lg px-8 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25">
                Sign In to Platform
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

        .animation-delay-700 {
          animation-delay: 0.7s;
        }

        .animation-delay-800 {
          animation-delay: 0.8s;
        }

        .animation-delay-900 {
          animation-delay: 0.9s;
        }
      `}</style>
    </main>
  );
}
