import { created, handleApiError, ok } from "@/lib/api";
import {
  forbiddenResponse,
  requireApiUser,
  unauthorizedResponse,
} from "@/lib/api-auth";
import { connectToDatabase } from "@/lib/db";
import { createActivityLog } from "@/lib/activity-log";
import { canCreateStudents } from "@/lib/permissions";
import { calculateRiskScore, deriveStudentStatus } from "@/lib/risk-score";
import { studentSchema } from "@/validations/student";
import { StudentModel } from "@/models/student";

export async function GET() {
  try {
    await requireApiUser();
    await connectToDatabase();

    const students = await StudentModel.find().sort({ updatedAt: -1 }).lean();
    return ok({ students });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return unauthorizedResponse();
    }

    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireApiUser();

    if (!canCreateStudents(user)) {
      return forbiddenResponse();
    }

    await connectToDatabase();

    const body = studentSchema.parse(await request.json());
    const riskScore = calculateRiskScore({
      attendanceRate: body.attendanceRate,
      averageScore: body.averageScore,
    });

    const student = await StudentModel.create({
      ...body,
      riskScore,
      status: deriveStudentStatus(riskScore),
      createdBy: user.id,
    });

    await createActivityLog({
      user,
      action: "student.created",
      entityType: "student",
      entityId: student._id.toString(),
      message: `Created student profile for ${student.firstName} ${student.lastName}`,
    });

    return created({ student });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return unauthorizedResponse();
    }

    return handleApiError(error);
  }
}
