import { connectToDatabase } from "@/lib/db";
import { StudentModel } from "@/models/student";
import { InterventionModel } from "@/models/intervention";
import { ActivityLogModel } from "@/models/activity-log";

export async function getDashboardSummary() {
  await connectToDatabase();

  const [students, activeInterventions] = await Promise.all([
    StudentModel.find().lean(),
    InterventionModel.countDocuments({ status: "active" }),
  ]);

  const totalStudents = students.length;
  const urgentStudents = students.filter((student) => student.status === "urgent").length;
  const averageAttendance = totalStudents
    ? students.reduce((total, student) => total + student.attendanceRate, 0) / totalStudents
    : 0;
  const averagePerformance = totalStudents
    ? students.reduce((total, student) => total + student.averageScore, 0) / totalStudents
    : 0;

  return {
    totalStudents,
    urgentStudents,
    activeInterventions,
    averageAttendance,
    averagePerformance,
  };
}

export async function getDashboardActivity(limit = 8) {
  await connectToDatabase();

  return ActivityLogModel.find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();
}
