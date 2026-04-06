import { DashboardClient } from "@/components/dashboard/dashboard-client";
import { requireSessionUser } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { getDashboardActivity, getDashboardSummary } from "@/lib/dashboard";
import { InterventionModel } from "@/models/intervention";
import { StudentModel } from "@/models/student";
import { UserModel } from "@/models/user";

export default async function DashboardPage() {
  const currentUser = await requireSessionUser();
  await connectToDatabase();

  const [summary, students, interventions, activity, users] = await Promise.all([
    getDashboardSummary(),
    StudentModel.find().sort({ updatedAt: -1 }).lean(),
    InterventionModel.find().sort({ createdAt: -1 }).lean(),
    getDashboardActivity(),
    currentUser.role === "admin"
      ? UserModel.find().select("-passwordHash").sort({ createdAt: -1 }).lean()
      : Promise.resolve([]),
  ]);

  const normalizedStudents = students.map((student) => ({
    _id: student._id.toString(),
    firstName: student.firstName,
    lastName: student.lastName,
    gradeLevel: student.gradeLevel,
    guardianName: student.guardianName,
    guardianEmail: student.guardianEmail,
    attendanceRate: student.attendanceRate,
    averageScore: student.averageScore,
    notes: student.notes,
    status: student.status,
    riskScore: student.riskScore,
    createdAt: student.createdAt.toISOString(),
    updatedAt: student.updatedAt.toISOString(),
  }));

  const normalizedInterventions = interventions.map((intervention) => ({
    _id: intervention._id.toString(),
    studentId: intervention.studentId.toString(),
    title: intervention.title,
    category: intervention.category,
    description: intervention.description,
    status: intervention.status,
    priority: intervention.priority,
    nextReviewAt: intervention.nextReviewAt?.toISOString(),
    attendanceDelta: intervention.attendanceDelta,
    performanceDelta: intervention.performanceDelta,
    ownerId: intervention.ownerId.toString(),
    createdAt: intervention.createdAt.toISOString(),
    updatedAt: intervention.updatedAt.toISOString(),
  }));

  const normalizedActivity = activity.map((entry) => ({
    _id: entry._id.toString(),
    actorName: entry.actorName,
    actorRole: entry.actorRole,
    action: entry.action,
    entityType: entry.entityType,
    entityId: entry.entityId,
    message: entry.message,
    createdAt: entry.createdAt.toISOString(),
  }));

  const normalizedUsers = users.map((user) => ({
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  }));

  return (
    <DashboardClient
      currentUser={currentUser}
      summary={summary}
      students={normalizedStudents}
      interventions={normalizedInterventions}
      activity={normalizedActivity}
      users={normalizedUsers}
    />
  );
}
