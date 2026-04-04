import Link from "next/link";
import { ShieldCheck, Users, BookOpen, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
              Empowering Student Success
            </h1>
            <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto">
              Comprehensive academic intervention tracking and management system designed to help educators identify at-risk students and implement timely support strategies.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="group rounded-3xl border border-border bg-surface p-6 shadow-lg transition-all hover:shadow-xl hover:border-primary/20">
              <div className="rounded-2xl bg-primary/10 p-3 text-primary w-fit mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Student Management</h3>
              <p className="text-muted">
                Track student progress, monitor attendance patterns, and identify at-risk individuals through comprehensive data analytics.
              </p>
            </div>

            <div className="group rounded-3xl border border-border bg-surface p-6 shadow-lg transition-all hover:shadow-xl hover:border-primary/20">
              <div className="rounded-2xl bg-primary/10 p-3 text-primary w-fit mb-4">
                <Target className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Intervention Planning</h3>
              <p className="text-muted">
                Design and implement targeted intervention strategies with clear objectives, timelines, and success metrics.
              </p>
            </div>

            <div className="group rounded-3xl border border-border bg-surface p-6 shadow-lg transition-all hover:shadow-xl hover:border-primary/20">
              <div className="rounded-2xl bg-primary/10 p-3 text-primary w-fit mb-4">
                <BookOpen className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
              <p className="text-muted">
                Monitor intervention effectiveness and student outcomes with real-time analytics and reporting tools.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link href="/login">
              <Button className="text-lg px-8">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
