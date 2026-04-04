import { ActivityLogModel } from "@/models/activity-log";
import type { SessionUser } from "@/lib/types";

type ActivityLogInput = {
  user: SessionUser;
  action: string;
  entityType: string;
  entityId: string;
  message: string;
  metadata?: Record<string, unknown>;
};

export async function createActivityLog({
  user,
  action,
  entityType,
  entityId,
  message,
  metadata,
}: ActivityLogInput) {
  await ActivityLogModel.create({
    actorId: user.id,
    actorName: user.name,
    actorRole: user.role,
    action,
    entityType,
    entityId,
    message,
    metadata,
  });
}
