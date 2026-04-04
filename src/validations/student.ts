import { z } from "zod";

export const studentSchema = z.object({
  firstName: z.string().min(2).max(80),
  lastName: z.string().min(2).max(80),
  gradeLevel: z.string().min(1).max(20),
  guardianName: z.string().min(2).max(80),
  guardianEmail: z.email(),
  attendanceRate: z.coerce.number().min(0).max(100),
  averageScore: z.coerce.number().min(0).max(100),
  notes: z.string().max(1000).default(""),
});

export const studentImportSchema = studentSchema;
