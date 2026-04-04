type StudentExportRecord = {
  fullName: string;
  gradeLevel: string;
  status: string;
  attendanceRate: number;
  averageScore: number;
  riskScore: number;
  guardianName: string;
  guardianEmail: string;
};

export function toCsv(records: StudentExportRecord[]) {
  const rows = [
    [
      "Full Name",
      "Grade Level",
      "Status",
      "Attendance Rate",
      "Average Score",
      "Risk Score",
      "Guardian Name",
      "Guardian Email",
    ],
    ...records.map((record) => [
      record.fullName,
      record.gradeLevel,
      record.status,
      record.attendanceRate.toString(),
      record.averageScore.toString(),
      record.riskScore.toString(),
      record.guardianName,
      record.guardianEmail,
    ]),
  ];

  return rows
    .map((row) =>
      row
        .map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`)
        .join(","),
    )
    .join("\n");
}
