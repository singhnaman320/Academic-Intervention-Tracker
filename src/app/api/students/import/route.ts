import Papa from "papaparse";
import { created, handleApiError } from "@/lib/api";
import {
  forbiddenResponse,
  requireApiUser,
  unauthorizedResponse,
} from "@/lib/api-auth";
import { connectToDatabase } from "@/lib/db";
import { createActivityLog } from "@/lib/activity-log";
import { canImportStudents } from "@/lib/permissions";
import { calculateRiskScore, deriveStudentStatus } from "@/lib/risk-score";
import { studentImportSchema } from "@/validations/student";
import { StudentModel } from "@/models/student";

export async function POST(request: Request) {
  try {
    const user = await requireApiUser();

    if (!canImportStudents(user)) {
      return forbiddenResponse();
    }

    await connectToDatabase();

    const body = await request.json();
    const csvText = body.csv as string;

    if (!csvText) {
      throw new Error("CSV content is required.");
    }

    const parsed = Papa.parse<Record<string, string>>(csvText, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header: string) => header.trim(),
    });

    const studentsToCreate = parsed.data.map((row: Record<string, string>) => {
      const payload = studentImportSchema.parse({
        firstName: row.firstName,
        lastName: row.lastName,
        gradeLevel: row.gradeLevel,
        guardianName: row.guardianName,
        guardianEmail: row.guardianEmail,
        attendanceRate: row.attendanceRate,
        averageScore: row.averageScore,
        notes: row.notes ?? "",
      });

      const riskScore = calculateRiskScore({
        attendanceRate: payload.attendanceRate,
        averageScore: payload.averageScore,
      });

      return {
        ...payload,
        riskScore,
        status: deriveStudentStatus(riskScore),
        createdBy: user.id,
      };
    });

    const createdStudents = await StudentModel.insertMany(studentsToCreate);

    await createActivityLog({
      user,
      action: "student.imported",
      entityType: "student",
      entityId: "bulk-import",
      message: `Imported ${createdStudents.length} students from CSV`,
      metadata: { count: createdStudents.length },
    });

    return created({ count: createdStudents.length });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return unauthorizedResponse();
    }

    return handleApiError(error);
  }
}
