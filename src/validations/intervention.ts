import { z } from "zod";
import {
  INTERVENTION_PRIORITIES,
  INTERVENTION_STATUSES,
} from "@/lib/constants";

export const interventionSchema = z.object({
  studentId: z.string().min(1),
  title: z.string().min(3).max(120),
  category: z.string().min(2).max(60),
  description: z.string().min(10).max(2000),
  status: z.enum(INTERVENTION_STATUSES).default("planned"),
  priority: z.enum(INTERVENTION_PRIORITIES).default("medium"),
  nextReviewAt: z.string().optional().or(z.literal("")),
  attendanceDelta: z.coerce.number().min(-100).max(100).default(0),
  performanceDelta: z.coerce.number().min(-100).max(100).default(0),
});
