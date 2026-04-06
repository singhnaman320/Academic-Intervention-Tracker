"use client";

import {
  AlertTriangle,
  BookOpen,
  Download,
  Edit,
  FileUp,
  HeartHandshake,
  HelpCircle,
  Key,
  Menu,
  Moon,
  Plus,
  Settings,
  ShieldCheck,
  Sun,
  Target,
  TrendingUp,
  Upload,
  User,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

function HelpCard({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6">{children}</div>;
}

export default function HelpPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="bg-gradient-to-br from-primary/5 to-emerald-500/5 px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16 dark:from-primary/10 dark:to-emerald-500/10">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 sm:h-20 sm:w-20">
            <HelpCircle className="h-8 w-8 text-primary sm:h-10 sm:w-10" />
          </div>
          <h1 className="mb-4 bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl md:text-5xl">
            Help Center
          </h1>
          <p className="mx-auto max-w-2xl text-sm text-muted sm:text-base md:text-lg">
            Complete guidance for the current teacher, counselor, and admin workflows.
          </p>
        </div>
      </section>

      <div className="px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-5xl space-y-12">
          <section className="space-y-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-primary/10 p-3">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold sm:text-3xl">Getting Started</h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <HelpCard>
                <div className="mb-3 flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">First Time Setup</h3>
                </div>
                <p className="mb-3 text-sm text-muted">
                  Create the first administrator account to initialize the platform.
                </p>
                <ol className="list-inside list-decimal space-y-1 text-xs text-muted">
                  <li>Visit the register page</li>
                  <li>Fill in administrator details</li>
                  <li>Create the first admin account</li>
                  <li>Open the dashboard</li>
                </ol>
              </HelpCard>

              <HelpCard>
                <div className="mb-3 flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Dashboard Overview</h3>
                </div>
                <p className="mb-3 text-sm text-muted">
                  The dashboard changes by role, while admins keep the full system workspace.
                </p>
                <ol className="list-inside list-decimal space-y-1 text-xs text-muted">
                  <li>Teachers see academic and attendance workflows</li>
                  <li>Counselors see support-focused workflows</li>
                  <li>Admins can review and manage everything</li>
                  <li>All roles can monitor active student risk</li>
                </ol>
              </HelpCard>

              <HelpCard>
                <div className="mb-3 flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">User Roles</h3>
                </div>
                <p className="mb-3 text-sm text-muted">
                  Roles control which dashboard tools and editing permissions are available.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Badge tone="admin" className="text-xs">Admin</Badge>
                    <span className="text-xs text-muted">Full system access, user management, and all student/intervention editing.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Badge tone="teacher" className="text-xs">Teacher</Badge>
                    <span className="text-xs text-muted">Academic progress, attendance, student creation, CSV import/export, and teacher-owned interventions.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Badge tone="counselor" className="text-xs">Counselor</Badge>
                    <span className="text-xs text-muted">Guardian updates, support notes, counselor-owned support plans, and read-only academic context.</span>
                  </div>
                </div>
              </HelpCard>
            </div>
          </section>

          <section className="space-y-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-primary/10 p-3">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold sm:text-3xl">Student Management</h2>
            </div>

            <div className="space-y-4">
              <HelpCard>
                <h3 className="mb-3 flex items-center gap-2 font-semibold">
                  <Plus className="h-5 w-5 text-primary" />
                  Adding Students
                </h3>
                <p className="mb-4 text-sm text-muted">
                  Teachers and admins can add new students for monitoring and intervention planning.
                </p>
                <div className="grid gap-4 lg:grid-cols-2">
                  <div>
                    <h4 className="mb-2 text-sm font-medium">Manual Entry</h4>
                    <ol className="list-inside list-decimal space-y-1 text-xs text-muted">
                      <li>Open the student management form</li>
                      <li>Enter first name, last name, and grade level</li>
                      <li>Add guardian name and guardian email</li>
                      <li>Enter attendance and average score if available</li>
                      <li>Add notes and create the student</li>
                    </ol>
                  </div>
                  <div>
                    <h4 className="mb-2 text-sm font-medium">CSV Import</h4>
                    <ol className="list-inside list-decimal space-y-1 text-xs text-muted">
                      <li>Prepare a CSV with the required headers</li>
                      <li>Upload or paste the CSV in the import section</li>
                      <li>Review the rows</li>
                      <li>Run the import</li>
                    </ol>
                  </div>
                </div>
              </HelpCard>

              <HelpCard>
                <h3 className="mb-3 flex items-center gap-2 font-semibold">
                  <Edit className="h-5 w-5 text-primary" />
                  Editing Students
                </h3>
                <p className="mb-4 text-sm text-muted">
                  Teachers and admins can edit full student records. Counselors can update guardian details and support notes only.
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-xl bg-surface-strong p-4">
                    <h4 className="mb-2 text-sm font-medium">Teacher/Admin Edits</h4>
                    <ul className="list-inside list-disc space-y-1 text-xs text-muted">
                      <li>Name</li>
                      <li>Grade level</li>
                      <li>Guardian details</li>
                      <li>Attendance rate</li>
                      <li>Average score</li>
                      <li>Notes</li>
                    </ul>
                  </div>
                  <div className="rounded-xl bg-surface-strong p-4">
                    <h4 className="mb-2 text-sm font-medium">Counselor Edits</h4>
                    <ul className="list-inside list-disc space-y-1 text-xs text-muted">
                      <li>Guardian name</li>
                      <li>Guardian email</li>
                      <li>Support notes</li>
                      <li>Academic fields stay read-only</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 overflow-x-auto rounded-xl bg-surface-strong p-4">
                  <pre className="min-w-[520px] text-xs text-muted"><code>{`firstName,lastName,gradeLevel,guardianName,guardianEmail,attendanceRate,averageScore,notes
John,Doe,Grade 9,Jane Doe,jane.doe@school.edu,85,78,Needs math tutoring
Jane,Smith,Grade 11,Bob Smith,bob.smith@school.edu,92,65,Regular attendance`}</code></pre>
                </div>
              </HelpCard>

              <HelpCard>
                <h3 className="mb-3 flex items-center gap-2 font-semibold">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                  Risk Assessment
                </h3>
                <p className="mb-4 text-sm text-muted">
                  Risk scores are calculated from attendance rate and average score. Keep those values current for accurate prioritization.
                </p>
                <div className="grid gap-2 sm:grid-cols-3">
                  <div className="flex items-center gap-2"><Badge tone="low" className="text-xs">Low Risk</Badge><span className="text-xs text-muted">0-29</span></div>
                  <div className="flex items-center gap-2"><Badge tone="medium" className="text-xs">Medium Risk</Badge><span className="text-xs text-muted">30-59</span></div>
                  <div className="flex items-center gap-2"><Badge tone="critical" className="text-xs">Critical Risk</Badge><span className="text-xs text-muted">60-100</span></div>
                </div>
              </HelpCard>
            </div>
          </section>

          <section className="space-y-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-primary/10 p-3">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold sm:text-3xl">Intervention Management</h2>
            </div>

            <div className="space-y-4">
              <HelpCard>
                <h3 className="mb-3 flex items-center gap-2 font-semibold">
                  <Plus className="h-5 w-5 text-primary" />
                  Creating Interventions
                </h3>
                <p className="mb-4 text-sm text-muted">
                  Teachers create academic interventions. Counselors create support-focused plans. Admins can create either type.
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-xl bg-surface-strong p-4">
                    <h4 className="mb-2 text-sm font-medium">Teacher Categories</h4>
                    <ul className="list-inside list-disc space-y-1 text-xs text-muted">
                      <li>Academic Support</li>
                      <li>Attendance Recovery</li>
                      <li>Classroom Intervention</li>
                      <li>Assessment Prep</li>
                      <li>Parent Outreach</li>
                    </ul>
                  </div>
                  <div className="rounded-xl bg-surface-strong p-4">
                    <h4 className="mb-2 text-sm font-medium">Counselor Categories</h4>
                    <ul className="list-inside list-disc space-y-1 text-xs text-muted">
                      <li>Behavioral Support</li>
                      <li>Emotional Wellness</li>
                      <li>Counseling Check-In</li>
                      <li>Family Outreach</li>
                      <li>Peer Relationship Support</li>
                    </ul>
                  </div>
                </div>
              </HelpCard>

              <HelpCard>
                <h3 className="mb-3 flex items-center gap-2 font-semibold">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Editing and Ownership
                </h3>
                <p className="mb-4 text-sm text-muted">
                  Intervention ownership is enforced in the app.
                </p>
                <ul className="list-inside list-disc space-y-1 text-xs text-muted">
                  <li>Admins can edit and delete all interventions</li>
                  <li>Teachers can edit and delete only interventions they created</li>
                  <li>Counselors can edit and delete only interventions they created</li>
                  <li>Counselors cannot change academic impact metrics like attendance or performance delta</li>
                </ul>
              </HelpCard>
            </div>
          </section>

          <section className="space-y-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-primary/10 p-3">
                <Key className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold sm:text-3xl">Admin Features</h2>
            </div>

            <div className="space-y-4">
              <HelpCard>
                <h3 className="mb-3 flex items-center gap-2 font-semibold">
                  <Key className="h-5 w-5 text-primary" />
                  Access Management
                </h3>
                <p className="mb-4 text-sm text-muted">
                  Only admins can manage staff accounts and role assignments.
                </p>
                <ol className="list-inside list-decimal space-y-1 text-xs text-muted">
                  <li>Open Dashboard → Access</li>
                  <li>View staff accounts</li>
                  <li>Create, edit, or delete users</li>
                  <li>Assign admin, teacher, or counselor roles</li>
                </ol>
              </HelpCard>

              <HelpCard>
                <h3 className="mb-3 flex items-center gap-2 font-semibold">
                  <Download className="h-5 w-5 text-primary" />
                  Full Oversight
                </h3>
                <p className="text-sm text-muted">
                  Admins keep the full dashboard, including student management, intervention management, activity visibility, exports, and user administration.
                </p>
              </HelpCard>
            </div>
          </section>

          <section className="space-y-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-primary/10 p-3">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold sm:text-3xl">Role-Based Dashboards</h2>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              <HelpCard>
                <h3 className="mb-3 flex items-center gap-2 font-semibold">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  Admin Dashboard
                </h3>
                <ul className="list-inside list-disc space-y-1 text-xs text-muted">
                  <li>Full student management</li>
                  <li>Full intervention management</li>
                  <li>All intervention ownership override</li>
                  <li>User access management</li>
                </ul>
              </HelpCard>

              <HelpCard>
                <h3 className="mb-3 flex items-center gap-2 font-semibold">
                  <Target className="h-5 w-5 text-primary" />
                  Teacher Dashboard
                </h3>
                <ul className="list-inside list-disc space-y-1 text-xs text-muted">
                  <li>Create, edit, and delete students</li>
                  <li>Import and export student CSV data</li>
                  <li>Manage attendance and average score</li>
                  <li>Create and manage teacher-owned academic interventions</li>
                </ul>
              </HelpCard>

              <HelpCard>
                <h3 className="mb-3 flex items-center gap-2 font-semibold">
                  <HeartHandshake className="h-5 w-5 text-primary" />
                  Counselor Dashboard
                </h3>
                <ul className="list-inside list-disc space-y-1 text-xs text-muted">
                  <li>View academic context</li>
                  <li>Update guardian details and support notes</li>
                  <li>Create and manage counselor-owned support plans</li>
                  <li>Academic metrics remain read-only</li>
                </ul>
              </HelpCard>
            </div>
          </section>

          <section className="space-y-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-primary/10 p-3">
                <Settings className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold sm:text-3xl">Interface Guide</h2>
            </div>

            <div className="space-y-4">
              <HelpCard>
                <h3 className="mb-3 flex items-center gap-2 font-semibold">
                  <Menu className="h-5 w-5 text-primary" />
                  Navigation Menu
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <h4 className="mb-2 text-sm font-medium">Desktop Navigation</h4>
                    <ul className="space-y-1 text-xs text-muted">
                      <li>Home</li>
                      <li>About</li>
                      <li>Help</li>
                      <li>Dashboard</li>
                      <li>Access for admins only</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-2 text-sm font-medium">Mobile Navigation</h4>
                    <ul className="space-y-1 text-xs text-muted">
                      <li>Hamburger menu for site links</li>
                      <li>Theme switcher</li>
                      <li>Quick dashboard entry</li>
                      <li>Sign out action</li>
                    </ul>
                  </div>
                </div>
              </HelpCard>

              <HelpCard>
                <h3 className="mb-3 flex items-center gap-2 font-semibold">
                  <Moon className="h-5 w-5 text-primary" />
                  Theme Switching
                </h3>
                <ul className="list-inside list-disc space-y-1 text-xs text-muted">
                  <li>Use the theme switcher in the header</li>
                  <li>The preference is saved automatically</li>
                  <li>Light and dark themes are supported across the app</li>
                </ul>
              </HelpCard>
            </div>
          </section>

          <section className="space-y-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-primary/10 p-3">
                <AlertTriangle className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold sm:text-3xl">Troubleshooting</h2>
            </div>

            <div className="space-y-4">
              <HelpCard>
                <h3 className="mb-3 font-semibold">Common Issues</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-danger">Can&apos;t log in?</h4>
                    <ul className="list-inside list-disc space-y-1 text-xs text-muted">
                      <li>Check email and password</li>
                      <li>Make sure the account still exists</li>
                      <li>Contact an administrator if you need access restored</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-danger">CSV import failed?</h4>
                    <ul className="list-inside list-disc space-y-1 text-xs text-muted">
                      <li>Confirm the required CSV headers are present</li>
                      <li>Check email formatting</li>
                      <li>Review grade level and numeric values</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-danger">Can&apos;t edit an intervention?</h4>
                    <ul className="list-inside list-disc space-y-1 text-xs text-muted">
                      <li>Admins can edit all interventions</li>
                      <li>Teachers and counselors can edit only their own interventions</li>
                    </ul>
                  </div>
                </div>
              </HelpCard>

              <HelpCard>
                <h3 className="mb-3 font-semibold">Best Practices</h3>
                <ul className="list-inside list-disc space-y-2 text-xs text-muted">
                  <li>Update student data regularly for accurate risk scoring</li>
                  <li>Create interventions promptly for higher-risk students</li>
                  <li>Keep support notes clear and current</li>
                  <li>Use role-appropriate workflows for editing</li>
                </ul>
              </HelpCard>
            </div>
          </section>

          <section className="space-y-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-primary/10 p-3">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold sm:text-3xl">Quick Reference</h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <HelpCard>
                <h4 className="mb-2 flex items-center gap-2 text-sm font-medium">
                  <Plus className="h-4 w-4 text-primary" />
                  Add Student (Teacher)
                </h4>
                <p className="text-xs text-muted">Dashboard → Student management → Fill form → Create student</p>
              </HelpCard>
              <HelpCard>
                <h4 className="mb-2 flex items-center gap-2 text-sm font-medium">
                  <Target className="h-4 w-4 text-primary" />
                  Create Intervention
                </h4>
                <p className="text-xs text-muted">Dashboard → Intervention planner → Add details → Save</p>
              </HelpCard>
              <HelpCard>
                <h4 className="mb-2 flex items-center gap-2 text-sm font-medium">
                  <Upload className="h-4 w-4 text-primary" />
                  Import CSV (Teacher)
                </h4>
                <p className="text-xs text-muted">Dashboard → CSV import → Select file or paste data → Import</p>
              </HelpCard>
              <HelpCard>
                <h4 className="mb-2 flex items-center gap-2 text-sm font-medium">
                  <Download className="h-4 w-4 text-primary" />
                  Export Data (Teacher/Admin)
                </h4>
                <p className="text-xs text-muted">Dashboard → Export CSV → Download file</p>
              </HelpCard>
              <HelpCard>
                <h4 className="mb-2 flex items-center gap-2 text-sm font-medium">
                  <Edit className="h-4 w-4 text-primary" />
                  Update Support (Counselor)
                </h4>
                <p className="text-xs text-muted">Select student → Update support → Edit guardian details or notes → Save</p>
              </HelpCard>
              <HelpCard>
                <h4 className="mb-2 flex items-center gap-2 text-sm font-medium">
                  <Key className="h-4 w-4 text-primary" />
                  User Access (Admin)
                </h4>
                <p className="text-xs text-muted">Dashboard → Access → Manage users</p>
              </HelpCard>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
