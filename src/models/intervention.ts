import { Schema, model, models } from "mongoose";
import {
  INTERVENTION_PRIORITIES,
  INTERVENTION_STATUSES,
} from "@/lib/constants";

const interventionSchema = new Schema(
  {
    studentId: { type: Schema.Types.ObjectId, ref: "Student", required: true, index: true },
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: INTERVENTION_STATUSES,
      default: "planned",
      required: true,
    },
    priority: {
      type: String,
      enum: INTERVENTION_PRIORITIES,
      default: "medium",
      required: true,
    },
    ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    nextReviewAt: { type: Date },
    attendanceDelta: { type: Number, default: 0 },
    performanceDelta: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const InterventionModel =
  models.Intervention ?? model("Intervention", interventionSchema);
