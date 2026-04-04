import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth-form";
import { connectToDatabase } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { UserModel } from "@/models/user";

export default async function RegisterPage() {
  const user = await getSessionUser();

  if (user) {
    redirect("/dashboard");
  }

  await connectToDatabase();
  const hasUsers = (await UserModel.countDocuments()) > 0;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 py-10 sm:px-6 lg:px-8">
      {hasUsers ? (
        <div className="w-full max-w-md rounded-3xl border border-border bg-surface-strong p-8 text-center shadow-[0_18px_45px_rgba(15,23,42,0.08)] dark:shadow-[0_22px_55px_rgba(0,0,0,0.28)]">
          <h1 className="text-2xl font-semibold">Platform already initialized</h1>
          <p className="mt-3 text-sm text-muted">Public registration is disabled after first administrator account is created.</p>
          <Link href="/login" className="mt-6 inline-flex rounded-2xl bg-primary px-4 py-2.5 text-sm font-semibold text-white">Go to login</Link>
        </div>
      ) : (
        <div className="w-full max-w-md">
          <AuthForm mode="register" />
        </div>
      )}
    </main>
  );
}
