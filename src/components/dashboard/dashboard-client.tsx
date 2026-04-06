"use client";

import { useMemo, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Download,
  FileUp,
  HeartHandshake,
  LogOut,
  Pencil,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";
import { AdminDashboardClient } from "@/components/dashboard/admin-dashboard-client";
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

const academicInterventionCategories = [
  "Academic Support",
  "Attendance Recovery",
  "Classroom Intervention",
  "Assessment Prep",
  "Parent Outreach",
];

const counselorInterventionCategories = [
  "Behavioral Support",
  "Emotional Wellness",
  "Counseling Check-In",
  "Family Outreach",
  "Peer Relationship Support",
];

function createDefaultIntervention(role: SessionUser["role"], studentId = ""): InterventionDraft {
  return {
    studentId,
    title: "",
    category:
      role === "counselor"
        ? counselorInterventionCategories[0]
        : academicInterventionCategories[0],
    description: "",
    status: "planned",
    priority: "medium",
    nextReviewAt: "",
    attendanceDelta: 0,
    performanceDelta: 0,
  };
}

export function DashboardClient(props: {
  currentUser: SessionUser;
  summary: DashboardSummary;
  students: StudentRecord[];
  interventions: InterventionRecord[];
  activity: ActivityRecord[];
  users: UserRecord[];
}) {
  const { currentUser } = props;

  if (currentUser.role === "admin") {
    return <AdminDashboardClient {...props} />;
  }

  return <StaffDashboardClient {...props} />;
}

function StaffDashboardClient({
  currentUser,
  summary,
  students,
  interventions,
  activity,
}: {
  currentUser: SessionUser;
  summary: DashboardSummary;
  students: StudentRecord[];
  interventions: InterventionRecord[];
  activity: ActivityRecord[];
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [studentDraft, setStudentDraft] = useState(defaultStudent);
  const [studentEditId, setStudentEditId] = useState<string | null>(null);
  const [interventionDraft, setInterventionDraft] = useState<InterventionDraft>(
    createDefaultIntervention(currentUser.role, students[0]?._id ?? ""),
  );
  const [interventionEditId, setInterventionEditId] = useState<string | null>(null);
  const [csvText, setCsvText] = useState(
    "firstName,lastName,gradeLevel,guardianName,guardianEmail,attendanceRate,averageScore,notes\nAva,Cole,Grade 9,Sara Cole,sara@example.com,68,51,Needs mentoring",
  );
  const [toasts, setToasts] = useState<
    Array<{ id: string; message: string; variant: "success" | "error" }>
  >([]);
  const toastIdRef = useRef(0);

  const isTeacher = currentUser.role === "teacher";
  const isCounselor = currentUser.role === "counselor";
  const canCreateStudents = isTeacher;
  const canDeleteStudents = isTeacher;
  const canImportStudents = isTeacher;
  const canEditAcademicFields = isTeacher;
  const interventionCategories = isCounselor
    ? counselorInterventionCategories
    : academicInterventionCategories;

  const studentsWithInterventions = useMemo(
    () =>
      students.map((student) => ({
        ...student,
        interventions: interventions.filter((item) => item.studentId === student._id),
      })),
    [interventions, students],
  );

  const recentActivity = useMemo(() => activity.slice(0, 8), [activity]);
  const canManageIntervention = (ownerId: string) => ownerId === currentUser.id;

  function addToast(message: string, variant: "success" | "error") {
    toastIdRef.current += 1;
    const id = `toast-${toastIdRef.current}`;
    setToasts((prev) => [...prev, { id, message, variant }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4000);
  }

  function resetStudentForm() {
    setStudentEditId(null);
    setStudentDraft(defaultStudent);
  }

  function resetInterventionForm() {
    setInterventionEditId(null);
    setInterventionDraft(createDefaultIntervention(currentUser.role, students[0]?._id ?? ""));
  }

  function startStudentEdit(student: StudentRecord) {
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
  }

  function startInterventionEdit(intervention: InterventionRecord) {
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
  }

  function runAction(task: () => Promise<void>) {
    startTransition(async () => {
      try {
        await task();
        router.refresh();
      } catch (error) {
        addToast(error instanceof Error ? error.message : "Something went wrong.", "error");
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

    if (response.status === 401) {
      router.push("/login");
      router.refresh();
      throw new Error("Your session has expired.");
    }

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

    resetStudentForm();
    addToast("Student created successfully.", "success");
  }

  async function updateStudent(studentId: string) {
    await apiRequest(`/api/students/${studentId}`, {
      method: "PATCH",
      body: JSON.stringify(studentDraft),
    });

    resetStudentForm();
    addToast(
      isCounselor ? "Support details updated successfully." : "Student updated successfully.",
      "success",
    );
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

    resetInterventionForm();
    addToast(
      isCounselor ? "Support plan created successfully." : "Intervention created successfully.",
      "success",
    );
  }

  async function updateIntervention(interventionId: string) {
    await apiRequest(`/api/interventions/${interventionId}`, {
      method: "PATCH",
      body: JSON.stringify(interventionDraft),
    });

    resetInterventionForm();
    addToast(
      isCounselor ? "Support plan updated successfully." : "Intervention updated successfully.",
      "success",
    );
  }

  async function deleteIntervention(interventionId: string) {
    await apiRequest(`/api/interventions/${interventionId}`, { method: "DELETE" });
    addToast(isCounselor ? "Support plan removed." : "Intervention removed.", "success");
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

    if (response.status === 401) {
      router.push("/login");
      router.refresh();
      throw new Error("Your session has expired.");
    }

    if (!response.ok) {
      throw new Error("Unable to sign out.");
    }

    router.push("/login");
    router.refresh();
  }

  const heroEyebrow = isTeacher ? "Teacher Dashboard" : "Counselor Dashboard";
  const heroTitle = isTeacher
    ? "Track academics, attendance, and classroom interventions."
    : "Coordinate student support, well-being, and follow-through.";
  const heroCopy = isTeacher
    ? "Teachers can manage student records, monitor attendance and performance, import rosters, and plan classroom-focused interventions."
    : "Counselors can update guardian and support notes, review risk signals, and run behavioral or emotional support plans without changing core academic records.";

  const studentFormTitle = isTeacher ? "Student management" : "Support update";
  const studentFormCopy = isTeacher
    ? "Create students or update academic and guardian details from one place."
    : "Counselors can update guardian contacts and support notes after selecting a student from the roster.";

  const interventionTitle = isTeacher ? "Academic intervention planner" : "Counseling support planner";
  const interventionCopy = isTeacher
    ? "Build classroom and attendance interventions with academic impact tracking."
    : "Plan behavioral, emotional, and outreach support with counseling-focused categories.";

  return (
    <div className="min-h-screen px-3 py-4 sm:px-4 sm:py-6 lg:px-8 lg:py-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:gap-6 lg:gap-8">
        <Card className="overflow-hidden bg-gradient-to-r from-stone-950 via-teal-900 to-teal-700 p-4 text-white sm:p-6 lg:p-8 dark:from-stone-800 dark:via-teal-800 dark:to-teal-600">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-teal-100 sm:text-sm">
                {heroEyebrow}
              </p>
              <h1 className="text-2xl font-semibold leading-tight sm:text-3xl lg:text-4xl xl:text-5xl">
                {heroTitle}
              </h1>
              <p className="max-w-2xl text-xs text-teal-50/90 sm:text-sm">{heroCopy}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <Badge tone={currentUser.role}>{currentUser.role}</Badge>
              <Button
                variant="secondary"
                onClick={() => runAction(signOut)}
                disabled={pending}
                className="text-xs sm:text-sm"
              >
                <LogOut className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" /> Sign out
              </Button>
            </div>
          </div>
        </Card>

        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Total students"
            value={String(summary.totalStudents)}
            helper="Profiles under active monitoring"
            icon={<Users className="h-5 w-5" />}
          />
          <MetricCard
            label="Urgent risk"
            value={String(summary.urgentStudents)}
            helper="Students needing immediate follow-up"
            icon={<Shield className="h-5 w-5" />}
          />
          <MetricCard
            label={isTeacher ? "Avg attendance" : "Active support plans"}
            value={isTeacher ? formatPercent(summary.averageAttendance) : String(summary.activeInterventions)}
            helper={isTeacher ? "Attendance trend across the roster" : "Interventions currently in progress"}
            icon={<Sparkles className="h-5 w-5" />}
          />
          <MetricCard
            label={isTeacher ? "Avg performance" : "Avg performance context"}
            value={formatPercent(summary.averagePerformance)}
            helper={isTeacher ? "Assessment trend across students" : "Academic context visible to support planning"}
            icon={<HeartHandshake className="h-5 w-5" />}
          />
        </section>

        <div className="fixed right-4 top-4 z-50 space-y-2">
          {toasts.map((toast) => (
            <Toast key={toast.id} message={toast.message} variant={toast.variant} />
          ))}
        </div>

        <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="p-4 sm:p-6">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold sm:text-2xl">
                  {isTeacher ? "Academic roster" : "Student support roster"}
                </h2>
                <p className="text-xs text-muted sm:text-sm">
                  {isTeacher
                    ? "Review attendance, grades, guardian details, and linked classroom interventions."
                    : "Review student context, guardian details, and linked support plans before updating notes."}
                </p>
              </div>
              {isTeacher ? (
                <button
                  type="button"
                  onClick={() => {
                    window.location.href = "/api/students/export";
                  }}
                  className="inline-flex items-center gap-2 rounded-2xl border border-border bg-surface-strong px-3 py-2 text-xs font-semibold transition hover:bg-surface sm:px-4 sm:text-sm dark:bg-surface-strong dark:hover:bg-surface"
                >
                  <Download className="h-4 w-4" /> Export CSV
                </button>
              ) : null}
            </div>
            <div className="max-h-[46rem] space-y-3 overflow-y-auto scrollbar-hide">
              {studentsWithInterventions.map((student) => (
                <Card key={student._id} className="border bg-surface-strong p-4 shadow-none dark:border-border dark:bg-surface-strong">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0 flex-1 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-semibold sm:text-lg">
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
                      <div className="space-y-1 text-xs text-muted sm:text-sm">
                        <p>{student.gradeLevel} | Grade level</p>
                        <p>Guardian: {student.guardianName}</p>
                        <p>{student.guardianEmail}</p>
                      </div>
                      <p className="text-sm text-foreground">
                        {student.notes || "No notes yet."}
                      </p>
                    </div>
                    <div className="grid grid-cols-1 gap-2 text-xs sm:grid-cols-3 sm:text-sm lg:min-w-[240px]">
                      <StatPill label="Attendance" value={formatPercent(student.attendanceRate)} />
                      <StatPill label="Score" value={formatPercent(student.averageScore)} />
                      <StatPill label="Updated" value={formatDate(student.updatedAt)} />
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    {student.interventions.length === 0 ? (
                      <span className="text-xs text-muted sm:text-sm">No plans linked yet.</span>
                    ) : null}
                    {student.interventions.map((item) => (
                      <span
                        key={item._id}
                        className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-2 py-1 text-xs font-medium dark:border-border dark:bg-surface"
                      >
                        <Badge tone={item.priority} className="text-xs">
                          {item.priority}
                        </Badge>
                        <span>{item.title}</span>
                      </span>
                    ))}
                    <Button
                      variant="ghost"
                      className="text-xs sm:text-sm"
                      onClick={() => startStudentEdit(student)}
                      disabled={pending}
                    >
                      <Pencil className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
                      {isTeacher ? "Edit record" : "Update support"}
                    </Button>
                    {canDeleteStudents ? (
                      <Button
                        variant="ghost"
                        className="text-xs sm:text-sm"
                        onClick={() => runAction(() => deleteStudent(student._id))}
                        disabled={pending}
                      >
                        Delete
                      </Button>
                    ) : null}
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
                  <h2 className="text-xl font-semibold">{studentFormTitle}</h2>
                  <p className="text-sm text-muted">{studentFormCopy}</p>
                </div>
              </div>
              {!canCreateStudents && !studentEditId ? (
                <div className="rounded-2xl border border-border bg-surface p-4 text-sm text-muted">
                  Select a student from the roster to update guardian contact details and support notes.
                </div>
              ) : null}
              <div className="grid gap-3 sm:grid-cols-2">
                <Input
                  placeholder="First name"
                  value={studentDraft.firstName}
                  disabled={!canEditAcademicFields}
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
                  disabled={!canEditAcademicFields}
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
                  disabled={!canEditAcademicFields}
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
                    disabled={!canEditAcademicFields}
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
                    disabled={!canEditAcademicFields}
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
                placeholder={isTeacher ? "Context for support plan" : "Support notes, observed concerns, or follow-up context"}
                value={studentDraft.notes}
                onChange={(event) =>
                  setStudentDraft((current) => ({
                    ...current,
                    notes: event.target.value,
                  }))
                }
              />
              {isCounselor ? (
                <p className="mt-3 text-xs text-muted">
                  Counselor edits are limited to guardian details and support notes. Academic fields stay read-only.
                </p>
              ) : null}
              <Button
                className="mt-4 w-full"
                onClick={() =>
                  runAction(() =>
                    studentEditId ? updateStudent(studentEditId) : createStudent(),
                  )
                }
                disabled={pending || (!canCreateStudents && !studentEditId)}
              >
                {studentEditId
                  ? isCounselor
                    ? "Save support update"
                    : "Update student"
                  : "Create student"}
              </Button>
              {studentEditId ? (
                <Button
                  variant="secondary"
                  className="mt-2 w-full"
                  onClick={resetStudentForm}
                  disabled={pending}
                >
                  Cancel edit
                </Button>
              ) : null}
            </Card>

            {canImportStudents ? (
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
                  <label className="mb-1 block text-sm font-medium text-foreground">
                    Upload CSV file
                  </label>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = (loadEvent) => {
                        const text = loadEvent.target?.result as string;
                        setCsvText(text);
                      };
                      reader.readAsText(file);
                    }}
                    className="block w-full text-sm text-foreground file:mr-4 file:rounded-2xl file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-primary-strong"
                  />
                </div>
                <div className="overflow-x-auto scrollbar-hide">
                  <Textarea
                    value={csvText}
                    onChange={(event) => setCsvText(event.target.value)}
                    className="w-[200%] whitespace-nowrap text-xs"
                    style={{
                      fontFamily:
                        'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
                    }}
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
            ) : null}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold">{interventionTitle}</h2>
            <p className="mt-1 text-sm text-muted">{interventionCopy}</p>
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
                placeholder={isTeacher ? "Intervention title" : "Support plan title"}
                value={interventionDraft.title}
                onChange={(event) =>
                  setInterventionDraft((current) => ({
                    ...current,
                    title: event.target.value,
                  }))
                }
              />
              <Select
                value={interventionDraft.category}
                onChange={(event) =>
                  setInterventionDraft((current) => ({
                    ...current,
                    category: event.target.value,
                  }))
                }
              >
                {interventionCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Select>
              <Textarea
                placeholder={isTeacher ? "Describe the support plan" : "Describe the counseling plan, triggers, supports, and next follow-up"}
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
                  <label className="text-xs text-muted">Review date</label>
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
                {isTeacher ? (
                  <>
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
                  </>
                ) : (
                  <div className="rounded-2xl border border-border bg-surface p-3 text-xs text-muted sm:col-span-2">
                    Counselors can track status, priority, category, and review dates. Academic impact metrics stay protected for teacher and admin workflows.
                  </div>
                )}
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
                {interventionEditId
                  ? isCounselor
                    ? "Update support plan"
                    : "Update intervention"
                  : isCounselor
                    ? "Create support plan"
                    : "Create intervention"}
              </Button>
              {interventionEditId ? (
                <Button variant="secondary" onClick={resetInterventionForm} disabled={pending}>
                  Cancel edit
                </Button>
              ) : null}
            </div>
          </Card>

          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold">
                {isTeacher ? "Recent classroom interventions" : "Recent support plans"}
              </h2>
              <div className="mt-4 max-h-[28rem] space-y-3 overflow-y-auto scrollbar-hide">
                {interventions.length === 0 ? (
                  <p className="text-sm text-muted">No plans logged yet.</p>
                ) : null}
                {interventions.map((intervention) => {
                  const student = students.find((item) => item._id === intervention.studentId);

                  return (
                    <div
                      key={intervention._id}
                      className="rounded-2xl border border-border bg-surface-strong p-4 dark:border-border dark:bg-surface-strong"
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
                          {canManageIntervention(intervention.ownerId) ? (
                            <>
                              <Button
                                variant="ghost"
                                onClick={() => startInterventionEdit(intervention)}
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
                            </>
                          ) : (
                            <span className="text-xs text-muted">Only the creator or admin can edit</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-semibold">Recent activity</h2>
              <p className="mt-1 text-sm text-muted">
                {isTeacher
                  ? "Recent operational changes across the academic workflow."
                  : "Recent operational changes across the support workflow."}
              </p>
              <div className="mt-4 space-y-3">
                {recentActivity.map((entry) => (
                  <div key={entry._id} className="rounded-2xl border border-border bg-surface-strong p-4 dark:border-border dark:bg-surface-strong">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold">{entry.actorName}</span>
                        <Badge tone={entry.actorRole as "admin" | "teacher" | "counselor"}>
                          {entry.actorRole}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted">{formatDate(entry.createdAt)}</p>
                    </div>
                    <p className="mt-2 text-sm text-foreground">{entry.message}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
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
        <div className="rounded-2xl bg-primary/10 p-3 text-primary dark:bg-primary/20 dark:text-primary">
          {icon}
        </div>
      </div>
      <p className="mt-4 text-sm text-muted">{helper}</p>
    </Card>
  );
}

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-surface px-3 py-3 dark:border-border dark:bg-surface">
      <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{label}</p>
      <p className="font-semibold text-foreground">{value}</p>
    </div>
  );
}





