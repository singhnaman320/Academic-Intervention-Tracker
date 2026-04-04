import { created, handleApiError, ok } from "@/lib/api";
import {
  forbiddenResponse,
  requireApiUser,
  unauthorizedResponse,
} from "@/lib/api-auth";
import { connectToDatabase } from "@/lib/db";
import { createActivityLog } from "@/lib/activity-log";
import { canManageInterventions } from "@/lib/permissions";
import { interventionSchema } from "@/validations/intervention";
import { InterventionModel } from "@/models/intervention";
import { refreshStudentRiskScore } from "@/lib/student-service";

export async function GET() {
  try {
    await requireApiUser();
    await connectToDatabase();

    const interventions = await InterventionModel.find().sort({ createdAt: -1 }).lean();
    return ok({ interventions });
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

    if (!canManageInterventions(user)) {
      return forbiddenResponse();
    }

    await connectToDatabase();
    const body = interventionSchema.parse(await request.json());

    const intervention = await InterventionModel.create({
      ...body,
      nextReviewAt: body.nextReviewAt ? new Date(body.nextReviewAt) : undefined,
      ownerId: user.id,
    });

    await refreshStudentRiskScore(body.studentId);

    await createActivityLog({
      user,
      action: "intervention.created",
      entityType: "intervention",
      entityId: intervention._id.toString(),
      message: `Created intervention '${intervention.title}'`,
      metadata: { studentId: body.studentId },
    });

    return created({ intervention });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return unauthorizedResponse();
    }

    return handleApiError(error);
  }
}
