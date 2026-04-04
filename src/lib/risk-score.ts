import type { InterventionPriority, InterventionStatus, StudentStatus } from "@/lib/types";

type RiskScoreInput = {
  attendanceRate: number;
  averageScore: number;
  interventionStatus?: InterventionStatus;
  interventionPriority?: InterventionPriority;
};

export function calculateRiskScore({
  attendanceRate,
  averageScore,
  interventionStatus,
  interventionPriority,
}: RiskScoreInput) {
  let score = 0;

  if (attendanceRate < 75) score += 35;
  else if (attendanceRate < 85) score += 18;

  if (averageScore < 50) score += 35;
  else if (averageScore < 65) score += 18;

  if (interventionStatus === "active") score += 10;
  if (interventionPriority === "high") score += 8;
  if (interventionPriority === "critical") score += 15;

  return Math.min(100, score);
}

export function deriveStudentStatus(riskScore: number): StudentStatus {
  if (riskScore >= 60) return "urgent";
  if (riskScore >= 30) return "watchlist";
  return "on-track";
}
