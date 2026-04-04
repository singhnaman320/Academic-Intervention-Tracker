import { redirect } from "next/navigation";
import { RoleAccessClient } from "@/components/dashboard/role-access-client";
import { requireSessionUser } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { canManageUsers } from "@/lib/permissions";
import { UserModel } from "@/models/user";

export default async function RoleAccessPage() {
  const currentUser = await requireSessionUser();

  if (!canManageUsers(currentUser)) {
    redirect("/dashboard");
  }

  await connectToDatabase();
  const users = await UserModel.find().select("-passwordHash").sort({ createdAt: -1 }).lean();

  const normalizedUsers = users.map((user) => ({
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  }));

  return <RoleAccessClient currentUser={currentUser} users={normalizedUsers} />;
}
