import { Schema, model, models } from "mongoose";
import { USER_ROLES } from "@/lib/constants";

const activityLogSchema = new Schema(
  {
    actorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    actorName: { type: String, required: true, trim: true },
    actorRole: { type: String, enum: USER_ROLES, required: true },
    action: { type: String, required: true, trim: true },
    entityType: { type: String, required: true, trim: true },
    entityId: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true },
);

export const ActivityLogModel =
  models.ActivityLog ?? model("ActivityLog", activityLogSchema);
