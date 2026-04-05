"use client";

import { useMemo, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Download, FileUp, LogOut, Pencil, Shield, Sparkles, Users } from "lucide-react";
import { useTheme } from "@/contexts/theme-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Toast } from "@/components/ui/toast";
import { formatDate, formatPercent } from "@/lib/utils";
import type { DashboardSummary, SessionUser } from "@/lib/types";
import type {
  ActivityRecord,
  InterventionRecord,
  StudentRecord,
  UserRecord,
} from "@/types/records";

const defaultStudent = {
  firstName: "",
  lastName: "",
  gradeLevel: "",
  guardianName: "",
  guardianEmail: "",
  attendanceRate: 85,
  averageScore: 70,
  notes: "",
};

type InterventionDraft = {
  studentId: string;
  title: string;
  category: string;
  description: string;
  status: "planned" | "active" | "completed";
  priority: "low" | "medium" | "high" | "critical";
  nextReviewAt: string;
  attendanceDelta: number;
  performanceDelta: number;
};


const defaultIntervention: InterventionDraft = {
  studentId: "",
  title: "",
  category: "Academic Support",
  description: "",
  status: "planned",
  priority: "medium",
  nextReviewAt: "",
  attendanceDelta: 0,
  performanceDelta: 0,
};


export function DashboardClient({
  currentUser,
  summary,
  students,
  interventions,
  activity,
  users,
}: {
  currentUser: SessionUser;
  summary: DashboardSummary;
  students: StudentRecord[];
  interventions: InterventionRecord[];
  activity: ActivityRecord[];
  users: UserRecord[];
}) {
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [pending, startTransition] = useTransition();
  const [studentDraft, setStudentDraft] = useState(defaultStudent);
  const [studentEditId, setStudentEditId] = useState<string | null>(null);
  const [interventionDraft, setInterventionDraft] = useState<InterventionDraft>({
    ...defaultIntervention,
    studentId: students[0]?._id ?? "",
  });
  const [interventionEditId, setInterventionEditId] = useState<string | null>(null);
  const [csvText, setCsvText] = useState(
    "firstName,lastName,gradeLevel,guardianName,guardianEmail,attendanceRate,averageScore,notes\nAva,Cole,Grade 9,Sara Cole,sara@example.com,68,51,Needs mentoring",
  );
  const [toasts, setToasts] = useState<Array<{ id: string; message: string; variant: "success" | "error" }>>([]);
  const toastIdRef = useRef(0);

  const addToast = (msg: string, variant: "success" | "error") => {
    toastIdRef.current += 1;
    const id = `toast-${toastIdRef.current}`;
    setToasts((prev) => [...prev, { id, message: msg, variant }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setCsvText(text);
    };
    reader.readAsText(file);
  };

  const studentsWithInterventions = useMemo(
    () =>
      students.map((student) => ({
        ...student,
        interventions: interventions.filter((item) => item.studentId === student._id),
      })),
    [interventions, students],
  );

  function runAction(task: () => Promise<void>) {
    startTransition(async () => {

      try {
        await task();
        router.refresh();
      } catch (taskError) {
        if (taskError instanceof Error) {
          addToast(taskError.message, "error");
        } else {
          addToast("Something went wrong.", "error");
        }
      }
    });
  }

  async function apiRequest(path: string, options: RequestInit) {
    const response = await fetch(path, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers ?? {}),
      },
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({ message: "Request failed." }));
      throw new Error(data.message ?? "Request failed.");
    }

    return response;
  }

  async function createStudent() {
    await apiRequest("/api/students", {
      method: "POST",
      body: JSON.stringify(studentDraft),
    });

    setStudentDraft(defaultStudent);
    addToast("Student created successfully.", "success");
  }

  async function updateStudent(studentId: string) {
    await apiRequest(`/api/students/${studentId}`, {
      method: "PATCH",
      body: JSON.stringify(studentDraft),
    });

    setStudentEditId(null);
    setStudentDraft(defaultStudent);
    addToast("Student updated successfully.", "success");
  }

  async function deleteStudent(studentId: string) {
    await apiRequest(`/api/students/${studentId}`, { method: "DELETE" });
    addToast("Student removed.", "success");
  }

  async function createIntervention() {
    await apiRequest("/api/interventions", {
      method: "POST",
      body: JSON.stringify(interventionDraft),
    });

    setInterventionDraft({
      ...defaultIntervention,
      studentId: students[0]?._id ?? "",
    });
    addToast("Intervention created successfully.", "success");
  }

  async function updateIntervention(interventionId: string) {
    await apiRequest(`/api/interventions/${interventionId}`, {
      method: "PATCH",
      body: JSON.stringify(interventionDraft),
    });

    setInterventionEditId(null);
    setInterventionDraft({
      ...defaultIntervention,
      studentId: students[0]?._id ?? "",
    });
    addToast("Intervention updated successfully.", "success");
  }

  async function deleteIntervention(interventionId: string) {
    await apiRequest(`/api/interventions/${interventionId}`, { method: "DELETE" });
    addToast("Intervention removed.", "success");
  }


  async function importCsv() {
    await apiRequest("/api/students/import", {
      method: "POST",
      body: JSON.stringify({ csv: csvText }),
    });

    addToast("CSV import completed.", "success");
  }

  async function signOut() {
    const response = await fetch("/api/auth/logout", { method: "POST" });

    if (!response.ok) {
      throw new Error("Unable to sign out.");
    }

    router.push("/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen px-3 py-4 sm:px-4 sm:py-6 lg:px-8 lg:py-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:gap-6 lg:gap-8">
        <Card className="overflow-hidden bg-gradient-to-r from-stone-950 via-teal-900 to-teal-700 p-4 sm:p-6 lg:p-8 text-white dark:from-stone-800 dark:via-teal-800 dark:to-teal-600">
          <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-3 sm:space-y-4">
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.35em] text-teal-100">
                Intervention Intelligence Hub
              </p>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold leading-tight">
                Support students before risk turns into attrition.
              </h1>
              <p className="max-w-2xl text-xs sm:text-sm text-teal-50/90">
                Centralize intervention workflows, role-based coordination, and attendance-performance risk tracking in one responsive Next.js workspace.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <Badge tone={currentUser.role}>{currentUser.role}</Badge>
              <Button
                variant="secondary"
                onClick={() => runAction(signOut)}
                disabled={pending}
                className="text-xs sm:text-sm"
              >
                <LogOut className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> Sign out
              </Button>
            </div>
          </div>
        </Card>

        <section className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Total students"
            value={String(summary.totalStudents)}
            helper="Profiles under active monitoring"
            icon={<Users className="h-4 w-4 sm:h-5 sm:w-5" />}
          />
          <MetricCard
            label="Urgent risk"
            value={String(summary.urgentStudents)}
            helper="High-priority learners requiring attention"
            icon={<Shield className="h-4 w-4 sm:h-5 sm:w-5" />}
          />
          <MetricCard
            label="Avg attendance"
            value={formatPercent(summary.averageAttendance)}
            helper="Current cohort attendance trend"
            icon={<Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />}
          />
          <MetricCard
            label="Avg performance"
            value={formatPercent(summary.averagePerformance)}
            helper="Average assessment outcomes"
            icon={<Shield className="h-4 w-4 sm:h-5 sm:w-5" />}
          />
        </section>

        <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            variant={toast.variant}
          />
        ))}
      </div>

        <section className="grid gap-4 grid-cols-1 lg:grid-cols-[1.15fr_0.85fr]">
          <Card className="p-4 sm:p-6">
            <div className="mb-4 sm:mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold">Student risk board</h2>
                <p className="text-xs sm:text-sm text-muted">
                  Students are automatically scored using attendance and performance signals.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  window.location.href = "/api/students/export";
                }}
                className="inline-flex items-center gap-2 rounded-2xl border border-border bg-surface-strong px-3 py-2 text-xs sm:px-4 sm:py-2 sm:text-sm font-semibold hover:bg-surface transition dark:bg-surface-strong dark:hover:bg-surface"
              >
                <Download className="h-3 w-3 sm:h-4 sm:w-4" /> Export CSV
              </button>
            </div>
            <div className="space-y-3 sm:space-y-4 max-h-[48rem] overflow-y-auto scrollbar-hide cursor-grab active:cursor-grabbing">
              {studentsWithInterventions.map((student) => (
                <Card key={student._id} className="border bg-surface-strong p-3 sm:p-5 shadow-none dark:bg-surface-strong dark:border-border">
                  <div className="flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-6">
                    <div className="space-y-2 min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                        <h3 className="text-sm sm:text-lg font-semibold break-words">
                          {student.firstName} {student.lastName}
                        </h3>
                        <Badge tone={student.status} className="text-xs">
                          {student.status.replace("-", " ")}
                        </Badge>
                        <Badge
                          tone={
                            student.riskScore >= 60
                              ? "critical"
                              : student.riskScore >= 30
                                ? "medium"
                                : "low"
                          }
                          className="text-xs"
                        >
                          Risk {student.riskScore}
                        </Badge>
                      </div>
                      <div className="text-xs sm:text-sm text-muted break-words space-y-1">
                        <p>{student.gradeLevel} | Grade Level</p>
                        <p>Guardian: {student.guardianName}</p>
                        <p>{student.guardianEmail}</p>
                      </div>
                      <p className="text-xs sm:text-sm text-foreground break-words">
                        {student.notes || "No notes yet."}
                      </p>
                    </div>
                    <div className="grid grid-cols-1 gap-2 text-xs sm:text-sm sm:grid-cols-3 sm:gap-3 lg:min-w-[240px]">
                      <StatPill label="Attendance" value={formatPercent(student.attendanceRate)} />
                      <StatPill label="Score" value={formatPercent(student.averageScore)} />
                      <StatPill label="Updated" value={formatDate(student.updatedAt)} />
                    </div>
                  </div>
                  <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-2">
                    {student.interventions.length === 0 ? (
                      <span className="text-xs sm:text-sm text-muted">No interventions yet.</span>
                    ) : null}
                    {student.interventions.map((item) => (
                      <button
                        key={item._id}
                        type="button"
                        onClick={() => runAction(() => deleteIntervention(item._id))}
                        className="inline-flex items-center gap-1 sm:gap-2 rounded-full border border-border bg-surface px-2 py-1 text-xs font-medium dark:bg-surface dark:border-border"
                      >
                        <Badge tone={item.priority} className="text-xs">{item.priority}</Badge>
                        <span className="truncate max-w-[100px] sm:max-w-none">{item.title}</span>
                      </button>
                    ))}
                    <Button
                      variant="ghost"
                      className="ml-auto text-xs sm:text-sm"
                      onClick={() => {
                        setStudentEditId(student._id);
                        setStudentDraft({
                          firstName: student.firstName,
                          lastName: student.lastName,
                          gradeLevel: student.gradeLevel,
                          guardianName: student.guardianName,
                          guardianEmail: student.guardianEmail,
                          attendanceRate: student.attendanceRate,
                          averageScore: student.averageScore,
                          notes: student.notes,
                        });
                      }}
                      disabled={pending}
                    >
                      <Pencil className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> Edit
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-xs sm:text-sm"
                      onClick={() => runAction(() => deleteStudent(student._id))}
                      disabled={pending}
                    >
                      Delete
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </Card>

          <div className="space-y-6">
            <Card className="p-6">
              <div className="mb-4 flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-primary" />
                <div>
                  <h2 className="text-xl font-semibold">Create student</h2>
                  <p className="text-sm text-muted">
                    Add a learner and compute baseline risk instantly.
                  </p>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Input
                  placeholder="First name"
                  value={studentDraft.firstName}
                  onChange={(event) =>
                    setStudentDraft((current) => ({
                      ...current,
                      firstName: event.target.value,
                    }))
                  }
                />
                <Input
                  placeholder="Last name"
                  value={studentDraft.lastName}
                  onChange={(event) =>
                    setStudentDraft((current) => ({
                      ...current,
                      lastName: event.target.value,
                    }))
                  }
                />
                <Input
                  placeholder="Grade level"
                  value={studentDraft.gradeLevel}
                  onChange={(event) =>
                    setStudentDraft((current) => ({
                      ...current,
                      gradeLevel: event.target.value,
                    }))
                  }
                />
                <Input
                  placeholder="Guardian name"
                  value={studentDraft.guardianName}
                  onChange={(event) =>
                    setStudentDraft((current) => ({
                      ...current,
                      guardianName: event.target.value,
                    }))
                  }
                />
                <Input
                  placeholder="Guardian email"
                  type="email"
                  value={studentDraft.guardianEmail}
                  onChange={(event) =>
                    setStudentDraft((current) => ({
                      ...current,
                      guardianEmail: event.target.value,
                    }))
                  }
                />
                <div>
                  <label className="text-xs text-muted">Attendance rate (0-100)</label>
                  <Input
                    value={studentDraft.attendanceRate}
                    onChange={(event) =>
                      setStudentDraft((current) => ({
                        ...current,
                        attendanceRate: Number(event.target.value) || 0,
                      }))
                    }
                  />
                </div>
                <div>
                  <label className="text-xs text-muted">Average score (0-100)</label>
                  <Input
                    value={studentDraft.averageScore}
                    onChange={(event) =>
                      setStudentDraft((current) => ({
                        ...current,
                        averageScore: Number(event.target.value) || 0,
                      }))
                    }
                  />
                </div>
              </div>
              <Textarea
                className="mt-3"
                placeholder="Context for support plan"
                value={studentDraft.notes}
                onChange={(event) =>
                  setStudentDraft((current) => ({
                    ...current,
                    notes: event.target.value,
                  }))
                }
              />
              <Button
                className="mt-4 w-full"
                onClick={() =>
                  runAction(() =>
                    studentEditId ? updateStudent(studentEditId) : createStudent(),
                  )
                }
                disabled={pending}
              >
                {studentEditId ? "Update student" : "Create student"}
              </Button>
              {studentEditId ? (
                <Button
                  variant="secondary"
                  className="mt-2 w-full"
                  onClick={() => {
                    setStudentEditId(null);
                    setStudentDraft(defaultStudent);
                  }}
                  disabled={pending}
                >
                  Cancel edit
                </Button>
              ) : null}
            </Card>

            <Card className="p-6">
              <div className="mb-4 flex items-center gap-3">
                <FileUp className="h-5 w-5 text-primary" />
                <div>
                  <h2 className="text-xl font-semibold">CSV import</h2>
                  <p className="text-sm text-muted">
                    Paste CSV rows with required headers to bulk-load students.
                  </p>
                </div>
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-foreground mb-1">
                  Upload CSV file
                </label>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="block w-full text-sm text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-2xl file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-strong"
                />
              </div>
              <div className="overflow-x-auto scrollbar-hide">
                <Textarea
                  value={csvText}
                  onChange={(event) => setCsvText(event.target.value)}
                  className="w-[200%] whitespace-nowrap text-xs"
                  style={{ fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace' }}
                  rows={4}
                />
              </div>
              <Button
                onClick={() => runAction(importCsv)}
                disabled={pending}
                className="mt-4 w-full"
              >
                Import students
              </Button>
            </Card>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold">Intervention planner</h2>
            <p className="mt-1 text-sm text-muted">
              Map each action plan to a learner, priority, and review date.
            </p>
            <div className="mt-4 grid gap-3">
              <Select
                value={interventionDraft.studentId}
                searchable
                searchPlaceholder="Search by student name, grade, or guardian email"
                emptyMessage="No matching students found."
                onChange={(event) =>
                  setInterventionDraft((current) => ({
                    ...current,
                    studentId: event.target.value,
                  }))
                }
              >
                <option value="">Select student</option>
                {students.map((student) => (
                  <option key={student._id} value={student._id}>
                    {student.firstName} {student.lastName} | {student.gradeLevel} | {student.guardianEmail}
                  </option>
                ))}
              </Select>
              <Input
                placeholder="Intervention title"
                value={interventionDraft.title}
                onChange={(event) =>
                  setInterventionDraft((current) => ({
                    ...current,
                    title: event.target.value,
                  }))
                }
              />
              <Input
                placeholder="Category"
                value={interventionDraft.category}
                onChange={(event) =>
                  setInterventionDraft((current) => ({
                    ...current,
                    category: event.target.value,
                  }))
                }
              />
              <Textarea
                placeholder="Describe the support plan"
                value={interventionDraft.description}
                onChange={(event) =>
                  setInterventionDraft((current) => ({
                    ...current,
                    description: event.target.value,
                  }))
                }
              />
              <div className="grid gap-3 sm:grid-cols-2">
                <Select
                  value={interventionDraft.status}
                  onChange={(event) =>
                    setInterventionDraft((current) => ({
                      ...current,
                      status: event.target.value as "planned" | "active" | "completed",
                    }))
                  }
                >
                  <option value="planned">Planned</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                </Select>
                <Select
                  value={interventionDraft.priority}
                  onChange={(event) =>
                    setInterventionDraft((current) => ({
                      ...current,
                      priority: event.target.value as "low" | "medium" | "high" | "critical",
                    }))
                  }
                >
                  <option value="low">Low priority</option>
                  <option value="medium">Medium priority</option>
                  <option value="high">High priority</option>
                  <option value="critical">Critical priority</option>
                </Select>
                <div>
                  <label className="text-xs text-slate-500 dark:text-muted">
                    Review date
                  </label>
                  <DatePicker
                    value={interventionDraft.nextReviewAt}
                    onChange={(value) =>
                      setInterventionDraft((current) => ({
                        ...current,
                        nextReviewAt: value,
                      }))
                    }
                    placeholder="Select review date"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted">Attendance change</label>
                  <Input
                    value={interventionDraft.attendanceDelta}
                    onChange={(event) =>
                      setInterventionDraft((current) => ({
                        ...current,
                        attendanceDelta: Number(event.target.value) || 0,
                      }))
                    }
                  />
                </div>
                <div>
                  <label className="text-xs text-muted">Performance change</label>
                  <Input
                    value={interventionDraft.performanceDelta}
                    onChange={(event) =>
                      setInterventionDraft((current) => ({
                        ...current,
                        performanceDelta: Number(event.target.value) || 0,
                      }))
                    }
                  />
                </div>
              </div>
              <Button
                onClick={() =>
                  runAction(() =>
                    interventionEditId
                      ? updateIntervention(interventionEditId)
                      : createIntervention(),
                  )
                }
                disabled={pending}
              >
                {interventionEditId ? "Update intervention" : "Create intervention"}
              </Button>
              {interventionEditId ? (
                <Button
                  variant="secondary"
                  onClick={() => {
                    setInterventionEditId(null);
                    setInterventionDraft({
                      ...defaultIntervention,
                      studentId: students[0]?._id ?? "",
                    });
                  }}
                  disabled={pending}
                >
                  Cancel edit
                </Button>
              ) : null}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold">Recent interventions</h2>
            <div className="mt-4 space-y-3 max-h-[30rem] overflow-y-auto scrollbar-hide cursor-grab active:cursor-grabbing">
              {interventions.length === 0 ? (
                <p className="text-sm text-muted">No interventions logged yet.</p>
              ) : null}
              {interventions.map((intervention) => {
                const student = students.find((item) => item._id === intervention.studentId);

                return (
                  <div
                    key={intervention._id}
                    className="rounded-2xl border border-border bg-surface-strong p-4 dark:bg-surface-strong dark:border-border"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold">{intervention.title}</h3>
                      <Badge tone={intervention.status}>{intervention.status}</Badge>
                      <Badge tone={intervention.priority}>{intervention.priority}</Badge>
                    </div>
                    <p className="mt-2 text-sm text-muted">
                      {student
                        ? `${student.firstName} ${student.lastName}`
                        : "Unknown student"}{" "}
                      | {intervention.category}
                    </p>
                    <p className="mt-2 text-sm text-foreground">{intervention.description}</p>
                    <div className="mt-3 flex items-center justify-between gap-3 text-xs text-muted">
                      <span>
                        Review: {intervention.nextReviewAt ? formatDate(intervention.nextReviewAt) : "Not scheduled"}
                      </span>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          onClick={() => {
                            setInterventionEditId(intervention._id);
                            setInterventionDraft({
                              studentId: intervention.studentId,
                              title: intervention.title,
                              category: intervention.category,
                              description: intervention.description,
                              status: intervention.status,
                              priority: intervention.priority,
                              nextReviewAt: intervention.nextReviewAt ?? "",
                              attendanceDelta: intervention.attendanceDelta,
                              performanceDelta: intervention.performanceDelta,
                            });
                          }}
                          disabled={pending}
                        >
                          <Pencil className="mr-2 h-4 w-4" /> Edit
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => runAction(() => deleteIntervention(intervention._id))}
                          disabled={pending}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </section>

        <section className="grid gap-4">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold">Activity log</h2>
            <p className="mt-1 text-sm text-muted">
              A simple audit trail for operational visibility.
            </p>
            <div className="mt-4 space-y-3 max-h-[30rem] overflow-y-auto scrollbar-hide cursor-grab active:cursor-grabbing">
              {activity.map((entry) => (
                <div key={entry._id} className="rounded-2xl border border-border bg-surface-strong p-4 dark:bg-surface-strong dark:border-border">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold">{entry.actorName}</span>
                      <Badge tone={entry.actorRole as "admin" | "teacher" | "counselor"}>
                        {entry.actorRole}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted">
                      {formatDate(entry.createdAt)} | {entry.action}
                    </p>
                  </div>
                  <p className="mt-2 text-sm text-foreground">{entry.message}</p>
                </div>
              ))}
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  helper,
  icon,
}: {
  label: string;
  value: string;
  helper: string;
  icon: React.ReactNode;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm text-muted">{label}</p>
          <p className="mt-2 text-3xl font-semibold text-foreground">{value}</p>
        </div>
        <div className="rounded-2xl bg-primary/10 p-3 text-primary dark:bg-primary/20 dark:text-primary">{icon}</div>
      </div>
      <p className="mt-4 text-sm text-muted">{helper}</p>
    </Card>
  );
}

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-surface px-3 py-2 dark:bg-surface">
      <p className="text-xs uppercase tracking-[0.2em] text-muted">{label}</p>
      <p className="mt-1 font-semibold text-foreground">{value}</p>
    </div>
  );
}


















