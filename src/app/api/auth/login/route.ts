import { handleApiError, ok } from "@/lib/api";
import { connectToDatabase } from "@/lib/db";
import { setSessionCookie, verifyPassword } from "@/lib/auth";
import { loginSchema } from "@/validations/auth";
import { UserModel } from "@/models/user";

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const body = loginSchema.parse(await request.json());
    const user = await UserModel.findOne({ email: body.email.toLowerCase() });

    if (!user) {
      throw new Error("Invalid email or password.");
    }

    const isValid = await verifyPassword(body.password, user.passwordHash);

    if (!isValid) {
      throw new Error("Invalid email or password.");
    }

    const sessionUser = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    } as const;

    await setSessionCookie(sessionUser);

    return ok({ user: sessionUser });
  } catch (error) {
    return handleApiError(error);
  }
}
