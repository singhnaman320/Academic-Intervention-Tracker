import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth-form";
import { connectToDatabase } from "@/lib/db";
import { UserModel } from "@/models/user";
import { getSessionUser } from "@/lib/auth";
import { UserRemovedAlert } from "@/components/ui/user-removed-alert";

export default async function LoginPage() {
  const user = await getSessionUser();

  if (user) {
    redirect("/dashboard");
  }

  await connectToDatabase();
  const hasUsers = (await UserModel.countDocuments()) > 0;

  if (!hasUsers) {
    redirect("/register");
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6">
        <UserRemovedAlert />
        <AuthForm mode="login" />
      </div>
    </main>
  );
}
