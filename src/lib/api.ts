import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function ok<T>(data: T, init?: ResponseInit) {
  return NextResponse.json(data, init);
}

export function created<T>(data: T) {
  return NextResponse.json(data, { status: 201 });
}

export function noContent() {
  return new NextResponse(null, { status: 204 });
}

export function handleApiError(error: unknown) {
  if (error instanceof ZodError) {
    const issues = error.flatten();
    // Provide field-specific messages for common Zod validation issues
    const fieldMessages: Record<string, string> = {
      firstName: "First name is required.",
      lastName: "Last name is required.",
      email: "Please enter a valid email address.",
      role: "Role is required.",
      password: "Password must be at least 8 characters long.",
      gradeLevel: "Grade level is required.",
      guardianName: "Guardian name is required.",
      guardianEmail: "Please enter a valid guardian email.",
      attendanceRate: "Attendance rate is required.",
      averageScore: "Average score is required.",
      title: "Intervention title is required.",
      studentId: "Student selection is required.",
    };

    const message = issues.fieldErrors
      ? Object.entries(issues.fieldErrors)
          .map(([field, msg]) => fieldMessages[field] || msg)
          .join("; ")
      : "Validation failed";

    return NextResponse.json(
      {
        message,
        issues: issues,
      },
      { status: 422 },
    );
  }

  if (error instanceof Error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }

  return NextResponse.json({ message: "Unexpected server error" }, { status: 500 });
}
