"use client";

import Link from "next/link";
import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Pencil, ShieldCheck, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Toast } from "@/components/ui/toast";
import type { SessionUser } from "@/lib/types";
import type { UserRecord } from "@/types/records";

type UserDraft = {
  name: string;
  email: string;
  password: string;
  role: "admin" | "teacher" | "counselor";
};

const defaultUser: UserDraft = {
  name: "",
  email: "",
  password: "",
  role: "teacher",
};

export function RoleAccessClient({
  currentUser,
  users,
}: {
  currentUser: SessionUser;
  users: UserRecord[];
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [userDraft, setUserDraft] = useState<UserDraft>(defaultUser);
  const [userEditId, setUserEditId] = useState<string | null>(null);
  const [toasts, setToasts] = useState<
    Array<{ id: string; message: string; variant: "success" | "error" }>
  >([]);
  const toastIdRef = useRef(0);

  function addToast(message: string, variant: "success" | "error") {
    toastIdRef.current += 1;
    const id = `toast-${toastIdRef.current}`;
    setToasts((prev) => [...prev, { id, message, variant }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3500);
  }

  function runAction(task: () => Promise<void>) {
    startTransition(async () => {
      try {
        await task();
        router.refresh();
      } catch (error) {
        addToast(error instanceof Error ? error.message : "Something went wrong.", "error");
      }
    });
  }

  async function apiRequest(path: string, options: RequestInit) {
    const response = await fetch(path, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers ?? {}),
      },
    });

    if (response.status === 401) {
      router.push("/login");
      router.refresh();
      throw new Error("Your session has expired.");
    }

    if (!response.ok) {
      const data = await response.json().catch(() => ({ message: "Request failed." }));
      throw new Error(data.message ?? "Request failed.");
    }

    return response;
  }

  async function createUser() {
    await apiRequest("/api/users", {
      method: "POST",
      body: JSON.stringify(userDraft),
    });

    setUserDraft(defaultUser);
    addToast("Staff account created.", "success");
  }

  async function updateUser(userId: string) {
    await apiRequest(`/api/users/${userId}`, {
      method: "PATCH",
      body: JSON.stringify({
        name: userDraft.name,
        email: userDraft.email,
        role: userDraft.role,
        password: userDraft.password || undefined,
      }),
    });

    setUserEditId(null);
    setUserDraft(defaultUser);
    addToast("Staff account updated.", "success");
  }

  async function deleteUser(userId: string) {
    await apiRequest(`/api/users/${userId}`, { method: "DELETE" });
    addToast("Staff account removed.", "success");
  }

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-foreground">
              <ArrowLeft className="h-4 w-4" /> Back to dashboard
            </Link>
            <h1 className="mt-3 text-4xl font-semibold text-foreground">Role-based access</h1>
            <p className="mt-2 max-w-2xl text-sm text-muted">
              Only admins can view this page, create staff accounts, and manage role assignments across the platform.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge tone={currentUser.role}>{currentUser.role}</Badge>
            <div className="rounded-2xl border border-border bg-surface-strong px-4 py-3 text-sm">
              <p className="font-semibold text-foreground">{users.length} staff accounts</p>
              <p className="text-muted">Admins, teachers, and counselors</p>
            </div>
          </div>
        </div>

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="p-6">
            <div className="flex items-start gap-3">
              <div className="rounded-2xl bg-primary/12 p-3 text-primary">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold">Access management</h2>
                <p className="mt-1 text-sm text-muted">
                  Provision users and assign the correct role so access stays secure and intentional.
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Input
                placeholder="Name"
                value={userDraft.name}
                onChange={(event) =>
                  setUserDraft((current) => ({ ...current, name: event.target.value }))
                }
              />
              <Input
                placeholder="Email"
                type="email"
                value={userDraft.email}
                onChange={(event) =>
                  setUserDraft((current) => ({ ...current, email: event.target.value }))
                }
              />
              <Input
                placeholder={userEditId ? "New password (optional)" : "Password"}
                type="password"
                value={userDraft.password}
                onChange={(event) =>
                  setUserDraft((current) => ({ ...current, password: event.target.value }))
                }
              />
              <Select
                value={userDraft.role}
                onChange={(event) =>
                  setUserDraft((current) => ({
                    ...current,
                    role: event.target.value as "admin" | "teacher" | "counselor",
                  }))
                }
              >
                <option value="teacher">Teacher</option>
                <option value="counselor">Counselor</option>
                <option value="admin">Admin</option>
              </Select>
            </div>

            <Button
              className="mt-4"
              onClick={() => runAction(() => (userEditId ? updateUser(userEditId) : createUser()))}
              disabled={pending}
            >
              {userEditId ? "Update staff account" : "Create staff account"}
            </Button>
            {userEditId ? (
              <Button
                variant="secondary"
                className="mt-2"
                onClick={() => {
                  setUserEditId(null);
                  setUserDraft(defaultUser);
                }}
                disabled={pending}
              >
                Cancel edit
              </Button>
            ) : null}
          </Card>

          <Card className="p-6">
            <div className="flex items-start gap-3">
              <div className="rounded-2xl bg-primary/12 p-3 text-primary">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold">Permission overview</h2>
                <p className="mt-1 text-sm text-muted">
                  A quick view of what each role is intended to manage in the system.
                </p>
              </div>
            </div>
            <div className="mt-5 space-y-3">
              <PermissionCard role="admin" summary="Full administrative control, user management, and data operations." />
              <PermissionCard role="teacher" summary="Can manage academic progress, attendance, classroom interventions, and CSV roster imports." />
              <PermissionCard role="counselor" summary="Can manage behavioral and emotional support plans, plus limited guardian and support-note edits." />
            </div>
          </Card>
        </section>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold">Current staff</h2>
          <p className="mt-1 text-sm text-muted">Edit or remove staff accounts below. Your current session account cannot be deleted.</p>
          <div className="mt-5 space-y-3">
            {users.map((user) => (
              <div
                key={user._id}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-surface-strong p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-foreground">{user.name}</span>
                    <Badge tone={user.role}>{user.role}</Badge>
                  </div>
                  <p className="text-sm text-muted">{user.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setUserEditId(user._id);
                      setUserDraft({
                        name: user.name,
                        email: user.email,
                        password: "",
                        role: user.role,
                      });
                    }}
                    disabled={pending}
                  >
                    <Pencil className="mr-2 h-4 w-4" /> Edit
                  </Button>
                  {currentUser.id !== user._id ? (
                    <Button
                      variant="ghost"
                      onClick={() => runAction(() => deleteUser(user._id))}
                      disabled={pending}
                    >
                      Delete user
                    </Button>
                  ) : (
                    <span className="text-xs font-medium text-muted">Current session</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="fixed right-4 top-4 z-50 space-y-2">
          {toasts.map((toast) => (
            <Toast key={toast.id} message={toast.message} variant={toast.variant} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PermissionCard({ role, summary }: { role: "admin" | "teacher" | "counselor"; summary: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface-strong p-4">
      <div className="flex items-center gap-2">
        <Badge tone={role}>{role}</Badge>
      </div>
      <p className="mt-3 text-sm text-muted">{summary}</p>
    </div>
  );
}




