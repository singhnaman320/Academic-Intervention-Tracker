import { Schema, model, models } from "mongoose";
import { STUDENT_STATUSES } from "@/lib/constants";

const studentSchema = new Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    gradeLevel: { type: String, required: true, trim: true },
    guardianName: { type: String, required: true, trim: true },
    guardianEmail: { type: String, required: true, lowercase: true, trim: true },
    attendanceRate: { type: Number, required: true, min: 0, max: 100 },
    averageScore: { type: Number, required: true, min: 0, max: 100 },
    notes: { type: String, default: "", trim: true },
    status: {
      type: String,
      enum: STUDENT_STATUSES,
      required: true,
      default: "on-track",
    },
    riskScore: { type: Number, required: true, min: 0, max: 100 },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

export const StudentModel = models.Student ?? model("Student", studentSchema);
