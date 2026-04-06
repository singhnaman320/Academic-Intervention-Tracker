# Academic Intervention Tracker

A comprehensive academic support platform built with Next.js 16, TypeScript, MongoDB, Route Handlers, Tailwind CSS, and Zod. Designed to help educators identify at-risk students and implement timely intervention strategies.

## Overview

The Academic Intervention Tracker is a modern web application that enables educational institutions to monitor student progress, identify at-risk individuals, and manage targeted interventions. The platform provides real-time analytics, risk scoring algorithms, and role-based workflows for teachers, counselors, and administrators.

## Key Features

### Student Management
- Complete student profiles for attendance, performance, guardian details, and support notes
- Risk assessment based on attendance and academic performance
- CSV import and export for teacher/admin workflows
- Live updates to student progress and intervention effectiveness

### Intervention Tracking
- Priority-based interventions with planned, active, and completed states
- Teacher-focused academic intervention categories
- Counselor-focused support intervention categories
- Review date planning and outcome documentation
- Intervention ownership rules so staff can manage only their own interventions, while admins can manage all

### User Management
- Role-based access with admin, teacher, and counselor dashboards
- Admin dashboard with full system access and user management
- Teacher dashboard for academic progress, attendance, classroom interventions, and CSV roster work
- Counselor dashboard for support plans, guardian updates, and read-only academic context
- Secure authentication with JWT-based sessions
- Activity logging for system actions

### Responsive Design
- Mobile-first layouts for phones, tablets, and desktops
- Responsive navigation and dashboard sections
- Dark and light theme support

### Security and Privacy
- Encrypted session handling
- Role permissions enforced in the API and UI
- Secure handling of student information
- Automatic logout when a deleted account makes another authenticated request

## Tech Stack

### Frontend
- Next.js 16
- TypeScript
- Tailwind CSS
- Lucide React

### Backend
- Node.js Route Handlers
- MongoDB with Mongoose
- JWT authentication
- Zod validation

## Project Structure

```text
src/
├── app/
│   ├── (auth)/
│   ├── (dashboard)/
│   │   ├── dashboard/
│   │   └── access/
│   ├── (pages)/
│   │   ├── home/
│   │   ├── about-us/
│   │   └── help/
│   ├── api/
│   │   ├── auth/
│   │   ├── students/
│   │   ├── interventions/
│   │   └── users/
│   └── layout.tsx
├── components/
│   ├── dashboard/
│   ├── ui/
│   ├── auth-form.tsx
│   ├── site-footer.tsx
│   ├── site-header.tsx
│   └── theme-switcher.tsx
├── contexts/
├── lib/
├── models/
└── public/
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm 8+
- MongoDB 5+

### Installation

1. Clone the repository
```bash
git clone https://github.com/singhnaman320/Academic-Intervention-Tracker.git
cd Academic-Intervention-Tracker
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```env
MONGODB_URI=mongodb://127.0.0.1:27017/academic-intervention-tracker
JWT_SECRET=your-super-secret-jwt-key-min-32-characters
APP_URL=http://localhost:3000
NODE_ENV=development
```

4. Start the development server
```bash
npm run dev
```

## Architecture

### Authentication Flow
1. The first admin account is created through `/register`
2. Users log in with JWT-based sessions
3. Role-based access controls dashboard and API behavior
4. Invalid or deleted sessions are treated as signed out

### Data Flow
1. Student attendance and average score feed risk scoring
2. Risk scoring identifies students needing attention
3. Teachers and counselors create role-appropriate interventions
4. Activity logs capture operational actions

## Database Schema

### Student Model
```ts
interface Student {
  _id: string;
  firstName: string;
  lastName: string;
  gradeLevel: string;
  guardianName: string;
  guardianEmail: string;
  attendanceRate: number;
  averageScore: number;
  riskScore: number;
  status: "on-track" | "watchlist" | "urgent";
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Intervention Model
```ts
interface Intervention {
  _id: string;
  studentId: string;
  title: string;
  category: string;
  description: string;
  status: "planned" | "active" | "completed";
  priority: "low" | "medium" | "high" | "critical";
  ownerId: string;
  nextReviewAt?: Date;
  attendanceDelta: number;
  performanceDelta: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### User Model
```ts
interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "teacher" | "counselor";
  createdAt: Date;
  updatedAt: Date;
}
```

## Role Permissions

| Feature | Admin | Teacher | Counselor |
| --- | --- | --- | --- |
| View students | Yes | Yes | Yes |
| Create students | Yes | Yes | No |
| Edit full student record | Yes | Yes | No |
| Edit guardian details and notes | Yes | Yes | Yes |
| Delete students | Yes | Yes | No |
| Import students | Yes | Yes | No |
| Export students | Yes | Yes | No |
| View interventions | Yes | Yes | Yes |
| Create interventions | Yes | Yes | Yes |
| Edit any intervention | Yes | No | No |
| Edit own intervention | Yes | Yes | Yes |
| Delete any intervention | Yes | No | No |
| Delete own intervention | Yes | Yes | Yes |
| Adjust attendance/performance impact on interventions | Yes | Yes | No |
| User management | Yes | No | No |

## CSV Import Format

```csv
firstName,lastName,gradeLevel,guardianName,guardianEmail,attendanceRate,averageScore,notes
John,Doe,Grade 10,Jane Doe,jane.doe@school.edu,85,78,Needs math tutoring
Jane,Smith,Grade 11,Bob Smith,bob.smith@school.edu,92,65,Regular attendance
```

## API Overview

### Authentication
- `POST /api/auth/login`
- `POST /api/auth/register`
- `POST /api/auth/logout`

### Students
- `GET /api/students`
- `POST /api/students`
- `PATCH /api/students/[id]`
- `DELETE /api/students/[id]`
- `POST /api/students/import`
- `GET /api/students/export`

### Interventions
- `GET /api/interventions`
- `POST /api/interventions`
- `PATCH /api/interventions/[id]`
- `DELETE /api/interventions/[id]`

### Users
- `GET /api/users`
- `POST /api/users`
- `PATCH /api/users/[id]`
- `DELETE /api/users/[id]`

## Deployment

### Vercel
Set these environment variables in Vercel:
- `MONGODB_URI`
- `JWT_SECRET`
- `APP_URL`

## Troubleshooting

### Common Issues
- Login problems: verify credentials and account status
- CSV import problems: verify required headers and data formatting
- Intervention edit restrictions: only admins can edit all interventions; staff can edit only their own

## Support
- Built-in help page: `/help`
- GitHub Issues for bugs and feature requests
