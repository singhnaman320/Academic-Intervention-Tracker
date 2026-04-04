import Link from "next/link";
import { ShieldCheck, Users, Target, BookOpen, Award, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
              About Our Mission
            </h1>
            <p className="text-lg sm:text-xl text-muted max-w-3xl mx-auto">
              We're dedicated to transforming educational outcomes through innovative technology and data-driven intervention strategies.
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <div className="rounded-2xl bg-primary/10 p-2 text-primary">
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

            <div>
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <div className="rounded-2xl bg-primary/10 p-2 text-primary">
                  <Award className="h-6 w-6" />
                </div>
                What We Do
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-surface p-3 text-primary">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Student Risk Assessment</h3>
                    <p className="text-muted">Advanced algorithms analyze attendance, grades, and behavior patterns to identify students needing support.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-surface p-3 text-primary">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Intervention Planning</h3>
                    <p className="text-muted">Create structured intervention plans with clear objectives, timelines, and success metrics.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-surface p-3 text-primary">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Progress Monitoring</h3>
                    <p className="text-muted">Track intervention effectiveness and student outcomes with comprehensive analytics.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">10K+</div>
              <p className="text-sm text-muted">Students Supported</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">95%</div>
              <p className="text-sm text-muted">Success Rate</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <p className="text-sm text-muted">Educators Using</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <p className="text-sm text-muted">Support Available</p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link href="/login">
              <Button className="text-lg px-8">
                Join Our Platform
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
