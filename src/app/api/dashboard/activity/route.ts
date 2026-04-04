import { getDashboardActivity } from "@/lib/dashboard";
import { handleApiError, ok } from "@/lib/api";
import { requireApiUser, unauthorizedResponse } from "@/lib/api-auth";

export async function GET() {
  try {
    await requireApiUser();
    const activity = await getDashboardActivity();
    return ok({ activity });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return unauthorizedResponse();
    }

    return handleApiError(error);
  }
}
