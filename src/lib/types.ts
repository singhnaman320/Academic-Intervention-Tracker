import type {
  INTERVENTION_PRIORITIES,
  INTERVENTION_STATUSES,
  STUDENT_STATUSES,
  USER_ROLES,
} from "@/lib/constants";

export type UserRole = (typeof USER_ROLES)[number];
export type StudentStatus = (typeof STUDENT_STATUSES)[number];
export type InterventionStatus = (typeof INTERVENTION_STATUSES)[number];
export type InterventionPriority = (typeof INTERVENTION_PRIORITIES)[number];

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

export type DashboardSummary = {
  totalStudents: number;
  urgentStudents: number;
  activeInterventions: number;
  averageAttendance: number;
  averagePerformance: number;
};
