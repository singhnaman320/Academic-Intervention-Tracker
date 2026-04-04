import { handleApiError, noContent, ok } from "@/lib/api";
import {
  forbiddenResponse,
  requireApiUser,
  unauthorizedResponse,
} from "@/lib/api-auth";
import { connectToDatabase } from "@/lib/db";
import { createActivityLog } from "@/lib/activity-log";
import { canManageUsers } from "@/lib/permissions";
import { hashPassword } from "@/lib/auth";
import { userSchema } from "@/validations/user";
import { UserModel } from "@/models/user";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ userId: string }> },
) {
  try {
    const user = await requireApiUser();

    if (!canManageUsers(user)) {
      return forbiddenResponse();
    }

    await connectToDatabase();
    const { userId } = await context.params;
    const body = userSchema.parse(await request.json());

    const updatePayload: Record<string, unknown> = {
      name: body.name,
      email: body.email.toLowerCase(),
      role: body.role,
    };

    if (body.password) {
      updatePayload.passwordHash = await hashPassword(body.password);
    }

    const updatedUser = await UserModel.findByIdAndUpdate(userId, updatePayload, {
      new: true,
    }).select("-passwordHash");

    if (!updatedUser) {
      throw new Error("User not found.");
    }

    await createActivityLog({
      user,
      action: "user.updated",
      entityType: "user",
      entityId: userId,
      message: `Updated user account for ${updatedUser.name}`,
    });

    return ok({ user: updatedUser });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return unauthorizedResponse();
    }

    return handleApiError(error);
  }
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ userId: string }> },
) {
  try {
    const user = await requireApiUser();

    if (!canManageUsers(user)) {
      return forbiddenResponse();
    }

    await connectToDatabase();
    const { userId } = await context.params;

    if (user.id === userId) {
      throw new Error("You cannot delete your own account.");
    }

    const deletedUser = await UserModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      throw new Error("User not found.");
    }

    await createActivityLog({
      user,
      action: "user.deleted",
      entityType: "user",
      entityId: userId,
      message: `Deleted user account for ${deletedUser.name}`,
    });

    return noContent();
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return unauthorizedResponse();
    }

    return handleApiError(error);
  }
}
