import { requireApiUser, unauthorizedResponse } from "@/lib/api-auth";
import { handleApiError } from "@/lib/api";
import { connectToDatabase } from "@/lib/db";
import { toCsv } from "@/lib/csv";
import { StudentModel } from "@/models/student";

export async function GET() {
  try {
    await requireApiUser();
    await connectToDatabase();

    const students = await StudentModel.find().sort({ lastName: 1, firstName: 1 }).lean();
    const csv = toCsv(
      students.map((student) => ({
        fullName: `${student.firstName} ${student.lastName}`,
        gradeLevel: student.gradeLevel,
        status: student.status,
        attendanceRate: student.attendanceRate,
        averageScore: student.averageScore,
        riskScore: student.riskScore,
        guardianName: student.guardianName,
        guardianEmail: student.guardianEmail,
      })),
    );

    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": 'attachment; filename="students-export.csv"',
      },
    });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return unauthorizedResponse();
    }

    return handleApiError(error);
  }
}
