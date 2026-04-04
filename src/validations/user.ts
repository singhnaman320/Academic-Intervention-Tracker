import { z } from "zod";
import { USER_ROLES } from "@/lib/constants";

export const userSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.email(),
  password: z.string().min(8).max(72).optional(),
  role: z.enum(USER_ROLES),
});

export const createUserSchema = userSchema.extend({
  password: z.string().min(8).max(72),
});
