import { created, handleApiError } from "@/lib/api";
import { connectToDatabase } from "@/lib/db";
import { hashPassword, setSessionCookie } from "@/lib/auth";
import { registerSchema } from "@/validations/auth";
import { UserModel } from "@/models/user";

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const body = registerSchema.parse(await request.json());
    const existingUsers = await UserModel.countDocuments();
    const existingUser = await UserModel.findOne({ email: body.email.toLowerCase() });

    if (existingUser) {
      throw new Error("An account with that email already exists.");
    }

    if (existingUsers > 0) {
      throw new Error("Public registration is disabled after the first admin account is created.");
    }

    const passwordHash = await hashPassword(body.password);
    const user = await UserModel.create({
      name: body.name,
      email: body.email.toLowerCase(),
      passwordHash,
      role: "admin",
    });

    const sessionUser = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    } as const;

    await setSessionCookie(sessionUser);

    return created({ user: sessionUser });
  } catch (error) {
    return handleApiError(error);
  }
}
