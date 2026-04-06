import { z } from "zod";

export const studentSchema = z.object({
  firstName: z.string().min(2).max(80),
  lastName: z.string().min(2).max(80),
  gradeLevel: z.enum([
    "Kindergarten",
    "Pre-K",
    "Grade 1",
    "Grade 2", 
    "Grade 3",
    "Grade 4",
    "Grade 5",
    "Grade 6",
    "Grade 7",
    "Grade 8",
    "Grade 9",
    "Grade 10",
    "Grade 11",
    "Grade 12",
    "Freshman",
    "Sophomore", 
    "Junior",
    "Senior"
  ]),
  guardianName: z.string().min(2).max(80),
  guardianEmail: z.email(),
  attendanceRate: z.coerce.number().min(0).max(100),
  averageScore: z.coerce.number().min(0).max(100),
  notes: z.string().max(500).optional(),
});

export const studentImportSchema = studentSchema;
