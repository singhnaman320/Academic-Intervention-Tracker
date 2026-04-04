import { handleApiError, noContent, ok } from "@/lib/api";
import {
  forbiddenResponse,
  requireApiUser,
  unauthorizedResponse,
} from "@/lib/api-auth";
import { connectToDatabase } from "@/lib/db";
import { createActivityLog } from "@/lib/activity-log";
import { canManageInterventions } from "@/lib/permissions";
import { refreshStudentRiskScore } from "@/lib/student-service";
import { interventionSchema } from "@/validations/intervention";
import { InterventionModel } from "@/models/intervention";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ interventionId: string }> },
) {
  try {
    const user = await requireApiUser();

    if (!canManageInterventions(user)) {
      return forbiddenResponse();
    }

    await connectToDatabase();
    const { interventionId } = await context.params;
    const body = interventionSchema.parse(await request.json());

    const intervention = await InterventionModel.findByIdAndUpdate(
      interventionId,
      {
        ...body,
        nextReviewAt: body.nextReviewAt ? new Date(body.nextReviewAt) : undefined,
      },
      { new: true },
    );

    if (!intervention) {
      throw new Error("Intervention not found.");
    }

    await refreshStudentRiskScore(intervention.studentId.toString());

    await createActivityLog({
      user,
      action: "intervention.updated",
      entityType: "intervention",
      entityId: intervention._id.toString(),
      message: `Updated intervention '${intervention.title}'`,
      metadata: { studentId: intervention.studentId.toString() },
    });

    return ok({ intervention });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return unauthorizedResponse();
    }

    return handleApiError(error);
  }
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ interventionId: string }> },
) {
  try {
    const user = await requireApiUser();

    if (!canManageInterventions(user)) {
      return forbiddenResponse();
    }

    await connectToDatabase();
    const { interventionId } = await context.params;
    const intervention = await InterventionModel.findByIdAndDelete(interventionId);

    if (!intervention) {
      throw new Error("Intervention not found.");
    }

    await refreshStudentRiskScore(intervention.studentId.toString());

    await createActivityLog({
      user,
      action: "intervention.deleted",
      entityType: "intervention",
      entityId: interventionId,
      message: `Deleted intervention '${intervention.title}'`,
      metadata: { studentId: intervention.studentId.toString() },
    });

    return noContent();
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return unauthorizedResponse();
    }

    return handleApiError(error);
  }
}
