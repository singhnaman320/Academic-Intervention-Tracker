"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Card } from "@/components/ui/card";

type AuthMode = "login" | "register";

export function AuthForm({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(formData: FormData) {
    const payload = Object.fromEntries(formData.entries());
    const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";

    startTransition(async () => {
      setError(null);

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({ message: "Request failed." }));
        setError(data.message ?? "Request failed.");
        return;
      }

      const redirectTo = searchParams.get("redirectTo") ?? "/dashboard";
      router.push(redirectTo);
      router.refresh();
    });
  }

  return (
    <Card className="w-full max-w-md p-6 sm:p-8">
      <div className="mb-6 sm:mb-8 space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          Academic Intervention Tracker
        </p>
        <h1 className="text-2xl sm:text-3xl font-semibold text-foreground">
          {mode === "login" ? "Welcome back" : "Create the first admin account"}
        </h1>
        <p className="text-sm text-muted">
          {mode === "login"
            ? "Sign in to manage at-risk students, interventions, and staff activity."
            : "Bootstrap the platform with the first secure administrator account."}
        </p>
      </div>

      <form action={onSubmit} className="space-y-4">
        {mode === "register" ? <Input name="name" placeholder="Full name" required /> : null}
        <Input name="email" type="email" placeholder="Email address" required />
        <Input name="password" type="password" placeholder="Password" required minLength={8} />
        {mode === "register" ? (
          <Select name="role" defaultValue="admin" disabled>
            <option value="admin">Administrator</option>
          </Select>
        ) : null}
        {error ? <p className="text-sm text-danger">{error}</p> : null}
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Please wait..." : mode === "login" ? "Sign in" : "Create account"}
        </Button>
      </form>
    </Card>
  );
}
