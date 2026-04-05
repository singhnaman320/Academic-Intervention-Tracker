"use client";

import { ShieldCheck, Users, BookOpen, Target, User, Key, Settings, AlertTriangle, TrendingUp, Upload, Download, Plus, Edit, Trash2, LogOut, Menu, HelpCircle, Moon, Sun, ArrowRight, Home, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function HelpPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="px-4 py-8 sm:py-12 md:py-16 lg:px-8 bg-gradient-to-br from-primary/5 to-emerald-500/5 dark:from-primary/10 dark:to-emerald-500/10">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/10 mb-4">
              <HelpCircle className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
              Help Center
            </h1>
            <p className="text-base sm:text-lg text-muted max-w-2xl mx-auto">
              Complete guide to using the Academic Intervention Tracker effectively
            </p>
          </div>
        </div>
      </section>

      <div className="px-4 py-8 sm:py-12 md:py-16 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-12">
          
          {/* Getting Started */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-xl bg-primary/10 p-3">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold">Getting Started</h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-surface p-6 rounded-2xl border border-border">
                <div className="flex items-center gap-2 mb-3">
                  <User className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">First Time Setup</h3>
                </div>
                <p className="text-sm text-muted mb-3">
                  Create the first administrator account to initialize the platform.
                </p>
                <ol className="text-xs text-muted space-y-1 list-decimal list-inside">
                  <li>Visit the register page</li>
                  <li>Fill in administrator details</li>
                  <li>Set up your admin account</li>
                  <li>Access the dashboard</li>
                </ol>
              </div>

              <div className="bg-surface p-6 rounded-2xl border border-border">
                <div className="flex items-center gap-2 mb-3">
                  <Settings className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Dashboard Overview</h3>
                </div>
                <p className="text-sm text-muted mb-3">
                  Main hub for managing students, interventions, and monitoring progress.
                </p>
                <ol className="text-xs text-muted space-y-1 list-decimal list-inside">
                  <li>View student statistics</li>
                  <li>Monitor risk levels</li>
                  <li>Track attendance/performance</li>
                  <li>Manage interventions</li>
                </ol>
              </div>

              <div className="bg-surface p-6 rounded-2xl border border-border">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">User Roles</h3>
                </div>
                <p className="text-sm text-muted mb-3">
                  Different access levels for various user types in the system.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge tone="admin" className="text-xs">Admin</Badge>
                    <span className="text-xs text-muted">Full system access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge tone="medium" className="text-xs">Teacher</Badge>
                    <span className="text-xs text-muted">Student management</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Student Management */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-xl bg-primary/10 p-3">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold">Student Management</h2>
            </div>

            <div className="space-y-4">
              <div className="bg-surface p-6 rounded-2xl border border-border">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Plus className="h-5 w-5 text-primary" />
                  Adding Students
                </h3>
                <p className="text-sm text-muted mb-4">
                  Add new students to the system for monitoring and intervention tracking.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <h4 className="font-medium text-sm mb-2">Manual Entry</h4>
                    <ol className="text-xs text-muted space-y-1 list-decimal list-inside">
                      <li>Click "Add Student" button</li>
                      <li>Fill in student information:
                        <ul className="ml-4 mt-1 space-y-1">
                          <li>• First & Last Name</li>
                          <li>• Grade Level</li>
                          <li>• Guardian Information</li>
                          <li>• Contact Details</li>
                        </ul>
                      </li>
                      <li>Set initial attendance/performance if known</li>
                      <li>Add notes about student situation</li>
                      <li>Click "Create Student"</li>
                    </ol>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-2">CSV Import</h4>
                    <ol className="text-xs text-muted space-y-1 list-decimal list-inside">
                      <li>Prepare CSV file with columns:
                        <ul className="ml-4 mt-1 space-y-1">
                          <li>• firstName, lastName</li>
                          <li>• gradeLevel</li>
                          <li>• guardianName, guardianEmail</li>
                          <li>• attendanceRate (optional)</li>
                          <li>• averageScore (optional)</li>
                        </ul>
                      </li>
                      <li>Click "Import CSV" button</li>
                      <li>Select your CSV file</li>
                      <li>Review and confirm import</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="bg-surface p-6 rounded-2xl border border-border">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Edit className="h-5 w-5 text-primary" />
                  Editing Students
                </h3>
                <p className="text-sm text-muted mb-4">
                  Update student information as needed throughout the academic year.
                </p>
                <ol className="text-xs text-muted space-y-1 list-decimal list-inside">
                  <li>Find the student in the risk board</li>
                  <li>Click the "Edit" button on their card</li>
                  <li>Modify any required information</li>
                  <li>Update attendance/performance data</li>
                  <li>Add or modify notes</li>
                  <li>Click "Update Student" to save changes</li>
                </ol>
              </div>

              <div className="bg-surface p-6 rounded-2xl border border-border">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                  Risk Assessment
                </h3>
                <p className="text-sm text-muted mb-4">
                  Understanding how student risk levels are calculated and displayed.
                </p>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-sm mb-2">Risk Score Calculation</h4>
                    <p className="text-xs text-muted">
                      Risk scores are automatically calculated based on attendance rate and average performance scores.
                    </p>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-3">
                    <div className="flex items-center gap-2">
                      <Badge tone="low" className="text-xs">Low Risk</Badge>
                      <span className="text-xs text-muted">Score: 0-29</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge tone="medium" className="text-xs">Medium Risk</Badge>
                      <span className="text-xs text-muted">Score: 30-59</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge tone="critical" className="text-xs">Critical Risk</Badge>
                      <span className="text-xs text-muted">Score: 60-100</span>
                    </div>
                  </div>
                  <div className="text-xs text-muted bg-surface-strong p-3 rounded-xl">
                    <strong>Tip:</strong> Regularly update attendance and performance data for accurate risk assessments.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Intervention Management */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-xl bg-primary/10 p-3">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold">Intervention Management</h2>
            </div>

            <div className="space-y-4">
              <div className="bg-surface p-6 rounded-2xl border border-border">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Plus className="h-5 w-5 text-primary" />
                  Creating Interventions
                </h3>
                <p className="text-sm text-muted mb-4">
                  Design and implement targeted support strategies for at-risk students.
                </p>
                <ol className="text-xs text-muted space-y-1 list-decimal list-inside">
                  <li>Select a student from the risk board</li>
                  <li>Click "Create Intervention" button</li>
                  <li>Fill in intervention details:
                    <ul className="ml-4 mt-1 space-y-1">
                      <li>• Title (brief description)</li>
                      <li>• Priority level (Low/Medium/High)</li>
                      <li>• Description of intervention</li>
                      <li>• Target student</li>
                    </ul>
                  </li>
                  <li>Click "Create Intervention"</li>
                  <li>Monitor progress regularly</li>
                </ol>
              </div>

              <div className="bg-surface p-6 rounded-2xl border border-border">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Tracking Progress
                </h3>
                <p className="text-sm text-muted mb-4">
                  Monitor intervention effectiveness and student improvement over time.
                </p>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-sm mb-2">What to Track</h4>
                    <ul className="text-xs text-muted space-y-1 list-disc list-inside">
                      <li>Attendance improvements</li>
                      <li>Grade/assessment changes</li>
                      <li>Behavior modifications</li>
                      <li>Engagement levels</li>
                    </ul>
                  </div>
                  <div className="text-xs text-muted bg-surface-strong p-3 rounded-xl">
                    <strong>Best Practice:</strong> Update student data weekly to track intervention effectiveness and adjust strategies as needed.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Admin Features */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-xl bg-primary/10 p-3">
                <Key className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold">Admin Features</h2>
            </div>

            <div className="space-y-4">
              <div className="bg-surface p-6 rounded-2xl border border-border">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Key className="h-5 w-5 text-primary" />
                  Access Management
                </h3>
                <p className="text-sm text-muted mb-4">
                  Manage user accounts and access permissions through the Access panel.
                </p>
                <ol className="text-xs text-muted space-y-1 list-decimal list-inside">
                  <li>Navigate to Dashboard → Access</li>
                  <li>View all system users</li>
                  <li>Edit user roles and permissions</li>
                  <li>Manage account status</li>
                </ol>
              </div>

              <div className="bg-surface p-6 rounded-2xl border border-border">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Download className="h-5 w-5 text-primary" />
                  Data Export
                </h3>
                <p className="text-sm text-muted mb-4">
                  Export student data for external analysis and record keeping.
                </p>
                <ol className="text-xs text-muted space-y-1 list-decimal list-inside">
                  <li>Go to Student Risk Board</li>
                  <li>Click "Export CSV" button</li>
                    <li>Download student list with all details</li>
                  <li>Use data for reporting or analysis</li>
                </ol>
              </div>
            </div>
          </section>

          {/* Interface Guide */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-xl bg-primary/10 p-3">
                <Settings className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold">Interface Guide</h2>
            </div>

            <div className="space-y-4">
              <div className="bg-surface p-6 rounded-2xl border border-border">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Menu className="h-5 w-5 text-primary" />
                  Navigation Menu
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <h4 className="font-medium text-sm mb-2">Desktop Navigation</h4>
                    <ul className="text-xs text-muted space-y-1">
                      <li>• Home - Landing page</li>
                      <li>• About - Platform information</li>
                      <li>• Help - This guide</li>
                      <li>• Dashboard - Main workspace</li>
                      <li>• Access - User management (Admin only)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-2">Mobile Navigation</h4>
                    <ul className="text-xs text-muted space-y-1">
                      <li>• Hamburger menu (☰) for all links</li>
                      <li>• Theme switcher (🌙/☀️)</li>
                      <li>• User profile section</li>
                      <li>• Quick access to dashboard</li>
                      <li>• Sign out option</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-surface p-6 rounded-2xl border border-border">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Moon className="h-5 w-5 text-primary" />
                  Theme Switching
                </h3>
                <p className="text-sm text-muted mb-4">
                  Toggle between light and dark themes for comfortable viewing.
                </p>
                <ul className="text-xs text-muted space-y-1 list-disc list-inside">
                  <li>Click the theme switcher icon (🌙/☀️) in the header</li>
                  <li>Theme preference is automatically saved</li>
                  <li>Works across all pages of the application</li>
                  <li>Optimized for both light and dark viewing</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Troubleshooting */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-xl bg-primary/10 p-3">
                <AlertTriangle className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold">Troubleshooting</h2>
            </div>

            <div className="space-y-4">
              <div className="bg-surface p-6 rounded-2xl border border-border">
                <h3 className="font-semibold mb-3">Common Issues</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-sm text-danger">Can't log in?</h4>
                    <ul className="text-xs text-muted space-y-1 list-disc list-inside">
                      <li>Check email and password spelling</li>
                      <li>Ensure account was created successfully</li>
                      <li>Contact administrator if account is locked</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-danger">CSV import failed?</h4>
                    <ul className="text-xs text-muted space-y-1 list-disc list-inside">
                      <li>Verify CSV format matches required columns</li>
                      <li>Check for extra spaces or special characters</li>
                      <li>Ensure email addresses are valid</li>
                      <li>Try importing smaller batches</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-danger">Risk scores not updating?</h4>
                    <ul className="text-xs text-muted space-y-1 list-disc list-inside">
                      <li>Update attendance and performance data</li>
                      <li>Ensure values are in correct format (0-100)</li>
                      <li>Refresh the page to see updated scores</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-surface p-6 rounded-2xl border border-border">
                <h3 className="font-semibold mb-3">Best Practices</h3>
                <ul className="text-xs text-muted space-y-2 list-disc list-inside">
                  <li>Update student data regularly for accurate risk assessments</li>
                  <li>Create interventions promptly for high-risk students</li>
                  <li>Document all intervention activities and outcomes</li>
                  <li>Use consistent naming conventions for students and interventions</li>
                  <li>Regular backup important data using export features</li>
                  <li>Train all staff members on proper data entry procedures</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Quick Reference */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-xl bg-primary/10 p-3">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold">Quick Reference</h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-surface p-4 rounded-xl border border-border">
                <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                  <Plus className="h-4 w-4 text-primary" />
                  Add Student
                </h4>
                <p className="text-xs text-muted">Dashboard → Add Student → Fill form → Create</p>
              </div>
              <div className="bg-surface p-4 rounded-xl border border-border">
                <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  Create Intervention
                </h4>
                <p className="text-xs text-muted">Dashboard → Create Intervention → Details → Save</p>
              </div>
              <div className="bg-surface p-4 rounded-xl border border-border">
                <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                  <Upload className="h-4 w-4 text-primary" />
                  Import CSV
                </h4>
                <p className="text-xs text-muted">Dashboard → Import CSV → Select file → Import</p>
              </div>
              <div className="bg-surface p-4 rounded-xl border border-border">
                <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                  <Download className="h-4 w-4 text-primary" />
                  Export Data
                </h4>
                <p className="text-xs text-muted">Dashboard → Export CSV → Download file</p>
              </div>
              <div className="bg-surface p-4 rounded-xl border border-border">
                <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                  <Edit className="h-4 w-4 text-primary" />
                  Edit Student
                </h4>
                <p className="text-xs text-muted">Find student → Edit button → Update → Save</p>
              </div>
              <div className="bg-surface p-4 rounded-xl border border-border">
                <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                  <Key className="h-4 w-4 text-primary" />
                  User Access
                </h4>
                <p className="text-xs text-muted">Dashboard → Access → Manage users</p>
              </div>
            </div>
          </section>

          {/* Contact Support */}
          <section className="space-y-6">
            <div className="bg-gradient-to-r from-primary/10 to-emerald-500/10 p-6 rounded-2xl border border-border">
              <h3 className="font-semibold mb-3">Need Additional Help?</h3>
              <p className="text-sm text-muted mb-4">
                If you need further assistance or have questions about specific features, don't hesitate to reach out to your system administrator.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/dashboard">
                  <Button className="text-sm">
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Go to Dashboard
                  </Button>
                </Link>
                <Link href="/home">
                  <Button variant="secondary" className="text-sm">
                    <Home className="mr-2 h-4 w-4" />
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
