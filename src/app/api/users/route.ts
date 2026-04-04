import { created, handleApiError, ok } from "@/lib/api";
import {
  forbiddenResponse,
  requireApiUser,
  unauthorizedResponse,
} from "@/lib/api-auth";
import { connectToDatabase } from "@/lib/db";
import { createActivityLog } from "@/lib/activity-log";
import { hashPassword } from "@/lib/auth";
import { canManageUsers } from "@/lib/permissions";
import { createUserSchema } from "@/validations/user";
import { UserModel } from "@/models/user";

export async function GET() {
  try {
    const user = await requireApiUser();

    if (!canManageUsers(user)) {
      return forbiddenResponse();
    }

    await connectToDatabase();
    const users = await UserModel.find().select("-passwordHash").sort({ createdAt: -1 }).lean();

    return ok({ users });
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

    if (!canManageUsers(user)) {
      return forbiddenResponse();
    }

    await connectToDatabase();
    const body = createUserSchema.parse(await request.json());
    const existingUser = await UserModel.findOne({ email: body.email.toLowerCase() });

    if (existingUser) {
      throw new Error("A user with that email already exists.");
    }

    const passwordHash = await hashPassword(body.password);
    const createdUser = await UserModel.create({
      name: body.name,
      email: body.email.toLowerCase(),
      passwordHash,
      role: body.role,
    });

    await createActivityLog({
      user,
      action: "user.created",
      entityType: "user",
      entityId: createdUser._id.toString(),
      message: `Created ${createdUser.role} account for ${createdUser.name}`,
    });

    const safeUser = {
      _id: createdUser._id.toString(),
      name: createdUser.name,
      email: createdUser.email,
      role: createdUser.role,
      createdAt: createdUser.createdAt,
      updatedAt: createdUser.updatedAt,
    };

    return created({ user: safeUser });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return unauthorizedResponse();
    }

    return handleApiError(error);
  }
}
