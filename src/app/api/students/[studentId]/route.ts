import { handleApiError, noContent, ok } from "@/lib/api";
import {
  forbiddenResponse,
  requireApiUser,
  unauthorizedResponse,
} from "@/lib/api-auth";
import { connectToDatabase } from "@/lib/db";
import { createActivityLog } from "@/lib/activity-log";
import {
  canDeleteStudents,
  canEditStudentAcademicFields,
  canEditStudentSupportFields,
} from "@/lib/permissions";
import { calculateRiskScore, deriveStudentStatus } from "@/lib/risk-score";
import { studentSchema } from "@/validations/student";
import { StudentModel } from "@/models/student";
import { InterventionModel } from "@/models/intervention";

export async function GET(
  _request: Request,
  context: { params: Promise<{ studentId: string }> },
) {
  try {
    await requireApiUser();
    await connectToDatabase();

    const { studentId } = await context.params;
    const [student, interventions] = await Promise.all([
      StudentModel.findById(studentId).lean(),
      InterventionModel.find({ studentId }).sort({ createdAt: -1 }).lean(),
    ]);

    if (!student) {
      throw new Error("Student not found.");
    }

    return ok({ student, interventions });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return unauthorizedResponse();
    }

    return handleApiError(error);
  }
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ studentId: string }> },
) {
  try {
    const user = await requireApiUser();

    if (!canEditStudentSupportFields(user)) {
      return forbiddenResponse();
    }

    await connectToDatabase();
    const { studentId } = await context.params;
    const body = studentSchema.parse(await request.json());
    const existingStudent = await StudentModel.findById(studentId);

    if (!existingStudent) {
      throw new Error("Student not found.");
    }

    const canEditAcademicFields = canEditStudentAcademicFields(user);
    const nextAttendanceRate = canEditAcademicFields
      ? body.attendanceRate
      : existingStudent.attendanceRate;
    const nextAverageScore = canEditAcademicFields
      ? body.averageScore
      : existingStudent.averageScore;

    const updatePayload = {
      firstName: canEditAcademicFields ? body.firstName : existingStudent.firstName,
      lastName: canEditAcademicFields ? body.lastName : existingStudent.lastName,
      gradeLevel: canEditAcademicFields ? body.gradeLevel : existingStudent.gradeLevel,
      guardianName: body.guardianName,
      guardianEmail: body.guardianEmail.toLowerCase(),
      attendanceRate: nextAttendanceRate,
      averageScore: nextAverageScore,
      notes: body.notes,
      riskScore: existingStudent.riskScore,
      status: existingStudent.status,
    };

    if (canEditAcademicFields) {
      const riskScore = calculateRiskScore({
        attendanceRate: nextAttendanceRate,
        averageScore: nextAverageScore,
      });

      updatePayload.riskScore = riskScore;
      updatePayload.status = deriveStudentStatus(riskScore);
    }

    const student = await StudentModel.findByIdAndUpdate(studentId, updatePayload, {
      new: true,
    });

    if (!student) {
      throw new Error("Student not found.");
    }

    await createActivityLog({
      user,
      action: "student.updated",
      entityType: "student",
      entityId: student._id.toString(),
      message: canEditAcademicFields
        ? `Updated student profile for ${student.firstName} ${student.lastName}`
        : `Updated support notes for ${student.firstName} ${student.lastName}`,
    });

    return ok({ student });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return unauthorizedResponse();
    }

    return handleApiError(error);
  }
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ studentId: string }> },
) {
  try {
    const user = await requireApiUser();

    if (!canDeleteStudents(user)) {
      return forbiddenResponse();
    }

    await connectToDatabase();
    const { studentId } = await context.params;
    const student = await StudentModel.findByIdAndDelete(studentId);

    if (!student) {
      throw new Error("Student not found.");
    }

    await InterventionModel.deleteMany({ studentId });

    await createActivityLog({
      user,
      action: "student.deleted",
      entityType: "student",
      entityId: studentId,
      message: `Deleted student profile for ${student.firstName} ${student.lastName}`,
    });

    return noContent();
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return unauthorizedResponse();
    }

    return handleApiError(error);
  }
}
