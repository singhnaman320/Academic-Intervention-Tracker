export type StudentRecord = {
  _id: string;
  firstName: string;
  lastName: string;
  gradeLevel: string;
  guardianName: string;
  guardianEmail: string;
  attendanceRate: number;
  averageScore: number;
  notes: string;
  status: "on-track" | "watchlist" | "urgent";
  riskScore: number;
  createdAt: string;
  updatedAt: string;
};

export type InterventionRecord = {
  _id: string;
  studentId: string;
  title: string;
  category: string;
  description: string;
  status: "planned" | "active" | "completed";
  priority: "low" | "medium" | "high" | "critical";
  nextReviewAt?: string;
  attendanceDelta: number;
  performanceDelta: number;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
};

export type ActivityRecord = {
  _id: string;
  actorName: string;
  actorRole: string;
  action: string;
  entityType: string;
  entityId: string;
  message: string;
  createdAt: string;
};

export type UserRecord = {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "teacher" | "counselor";
  createdAt: string;
  updatedAt: string;
};
