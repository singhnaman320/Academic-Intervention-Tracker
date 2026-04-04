import { z } from "zod";

const envSchema = z.object({
  MONGODB_URI: z.string().min(1),
  JWT_SECRET: z.string().min(16),
  APP_URL: z.string().url().default("http://localhost:3000"),
});

export const env = envSchema.parse({
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  APP_URL: process.env.APP_URL ?? "http://localhost:3000",
});
