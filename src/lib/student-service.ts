import { Types } from "mongoose";
import { calculateRiskScore, deriveStudentStatus } from "@/lib/risk-score";
import { InterventionModel } from "@/models/intervention";
import { StudentModel } from "@/models/student";

export async function refreshStudentRiskScore(studentId: string) {
  const interventions = await InterventionModel.find({ studentId }).lean();
  const student = await StudentModel.findById(studentId);

  if (!student) {
    return null;
  }

  const interventionRisk = interventions.reduce((highest, item) => {
    return Math.max(
      highest,
      calculateRiskScore({
        attendanceRate: student.attendanceRate,
        averageScore: student.averageScore,
        interventionPriority: item.priority,
        interventionStatus: item.status,
      }),
    );
  }, calculateRiskScore({ attendanceRate: student.attendanceRate, averageScore: student.averageScore }));

  student.riskScore = interventionRisk;
  student.status = deriveStudentStatus(interventionRisk);
  await student.save();

  return student;
}

export function toObjectId(id: string) {
  return new Types.ObjectId(id);
}
