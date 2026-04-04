import { z } from "zod";
import { USER_ROLES } from "@/lib/constants";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export const registerSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.email(),
  password: z.string().min(8).max(72),
  role: z.enum(USER_ROLES).default("teacher"),
});
