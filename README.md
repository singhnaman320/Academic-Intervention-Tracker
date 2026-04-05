# Academic Intervention Tracker

A comprehensive academic support platform built with Next.js 16, TypeScript, MongoDB, Route Handlers, Tailwind CSS, and Zod. Designed to help educators identify at-risk students and implement timely intervention strategies.

## 🎯 Overview

The Academic Intervention Tracker is a modern web application that enables educational institutions to monitor student progress, identify at-risk individuals, and manage targeted interventions. The platform provides real-time analytics, risk scoring algorithms, and collaborative tools for teachers, counselors, and administrators.

## ✨ Key Features

### 📊 Student Management
- **Complete Student Profiles**: Track attendance, performance, and demographic information
- **Risk Assessment**: Automated scoring based on attendance rates and academic performance
- **CSV Import/Export**: Bulk student data operations for efficient data management
- **Real-time Updates**: Live monitoring of student progress and intervention effectiveness

### 🎯 Intervention Tracking
- **Priority-based Interventions**: Low, Medium, High, and Critical priority levels
- **Status Management**: Track intervention progress from creation to completion
- **Review System**: Scheduled reviews and outcome documentation
- **Collaborative Planning**: Multiple educators can coordinate on student interventions

### 👥 User Management
- **Role-based Access**: Admin, Teacher, and Counselor permissions
- **Secure Authentication**: JWT-based login with session management
- **User Dashboard**: Personalized workspace based on role and permissions
- **Activity Logging**: Comprehensive audit trail of all system activities

### 📱 Responsive Design
- **Mobile-First**: Optimized for phones, tablets, and desktop devices
- **Hamburger Menu**: Intuitive mobile navigation
- **Touch-Friendly**: Large tap targets and gesture support
- **Dark/Light Themes**: Accessible theme switching with system preference detection

### 🔒 Security & Privacy
- **Encrypted Sessions**: Secure JWT token-based authentication
- **Role Permissions**: Granular access control based on user roles
- **Data Protection**: Secure handling of sensitive student information
- **Session Management**: Automatic timeout and secure logout

## 🛠 Tech Stack

### Frontend
- **Next.js 16**: React framework with App Router and Server Components
- **TypeScript**: Type-safe development with comprehensive error handling
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Lucide React**: Modern icon library for consistent UI elements
- **React Hook Form**: Form management with validation and error handling

### Backend
- **Node.js**: JavaScript runtime with Route Handlers
- **MongoDB**: NoSQL database with Mongoose ODM
- **JWT Authentication**: Secure token-based session management
- **Zod Validation**: Runtime type validation and schema definition

### Development Tools
- **ESLint**: Code quality and consistency enforcement
- **Prettier**: Code formatting and style consistency
- **TypeScript**: Static type checking and IntelliSense support
- **Git Hooks**: Pre-commit checks and automated formatting

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/           # Authentication routes
│   │   ├── login/       # User login page
│   │   └── register/    # First admin registration
│   ├── (dashboard)/        # Protected dashboard routes
│   │   ├── dashboard/   # Main dashboard page
│   │   └── access/       # User management (admin only)
│   ├── (pages)/           # Public pages
│   │   ├── home/         # Landing page
│   │   ├── about-us/     # About page
│   │   └── help/         # Help documentation
│   ├── api/               # API routes
│   │   ├── auth/         # Authentication endpoints
│   │   ├── students/      # Student CRUD operations
│   │   ├── interventions/ # Intervention management
│   │   └── users/         # User management
│   └── layout.tsx         # Root layout with header/footer
├── components/              # Reusable UI components
│   ├── ui/               # Base UI components (Button, Input, etc.)
│   ├── dashboard/         # Dashboard-specific components
│   ├── site-header.tsx    # Navigation header with theme switcher
│   ├── site-footer.tsx    # Application footer
│   ├── auth-form.tsx       # Login/register form
│   └── theme-switcher.tsx # Theme toggle component
├── contexts/               # React contexts
│   └── theme-context.tsx  # Theme management context
├── lib/                   # Utility libraries
│   ├── auth.ts           # Authentication helpers
│   ├── types.ts          # TypeScript type definitions
│   ├── utils.ts          # General utility functions
│   └── validations.ts    # Zod validation schemas
├── models/                 # Database models
│   ├── Student.ts         # Student data model
│   ├── User.ts            # User data model
│   └── Intervention.ts   # Intervention data model
└── public/                 # Static assets
    ├── ait-logo.png       # Application logo
    ├── hero-banner.jpg     # Homepage banner
    └── favicon.ico         # Site favicon
```

## 🚀 Getting Started

### Prerequisites
- **Node.js**: Version 18.0 or higher
- **npm**: Version 8.0 or higher
- **MongoDB**: Version 5.0 or higher
- **Git**: For version control

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/singhnaman320/Academic-Intervention-Tracker.git
   cd Academic-Intervention-Tracker
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Database Setup**
   ```bash
   # Start MongoDB service
   # Update MONGODB_URI in .env file
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database Configuration
MONGODB_URI=mongodb://127.0.0.1:27017/academic-intervention-tracker

# Authentication
JWT_SECRET=your-super-secret-jwt-key-min-32-characters

# Application
APP_URL=http://localhost:3000
NODE_ENV=development
```

## 🎮 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint code
npm run lint

# Type checking
npm run typecheck

# Format code
npm run format
```

### Development Workflow

1. **Feature Development**: Create feature branches from `main`
2. **Code Quality**: Follow ESLint rules and TypeScript conventions
3. **Testing**: Test components and API endpoints
4. **Commits**: Use conventional commit messages
5. **Pull Requests**: Create PRs with detailed descriptions

## 🏗️ Architecture

### Authentication Flow
1. **User Registration**: First admin creates account via `/register`
2. **Login**: JWT-based authentication with secure sessions
3. **Role-based Access**: Different permissions for admin vs. staff
4. **Session Management**: Automatic timeout and secure logout

### Data Flow
1. **Student Data**: Attendance & performance → Risk scoring
2. **Risk Assessment**: Automated algorithm identifies at-risk students
3. **Intervention Creation**: Targeted support strategies
4. **Progress Tracking**: Monitor intervention effectiveness
5. **Analytics**: Generate reports and insights

### Component Architecture
- **Server Components**: SEO-optimized pages with data fetching
- **Client Components**: Interactive UI with state management
- **Shared Components**: Reusable UI elements with consistent styling
- **Context Providers**: Global state management for theme and auth

## 📊 Database Schema

### Student Model
```typescript
interface Student {
  _id: string;
  firstName: string;
  lastName: string;
  gradeLevel: string;
  guardianName: string;
  guardianEmail: string;
  attendanceRate: number; // 0-100
  averageScore: number;    // 0-100
  riskScore: number;       // 0-100 (calculated)
  status: "at-risk" | "not-at-risk" | "improving";
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Intervention Model
```typescript
interface Intervention {
  _id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high" | "critical";
  status: "planned" | "in-progress" | "completed" | "cancelled";
  studentId: string;
  nextReviewAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

### User Model
```typescript
interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "teacher" | "counselor";
  createdAt: Date;
  updatedAt: Date;
}
```

## 🎯 Core Features

### Risk Scoring Algorithm

The platform automatically calculates student risk scores based on:

```typescript
// Risk Score Calculation
const calculateRiskScore = (attendanceRate: number, averageScore: number): number => {
  const attendanceWeight = 0.4;  // 40% weight
  const performanceWeight = 0.6; // 60% weight
  
  const normalizedAttendance = 100 - attendanceRate;
  const normalizedPerformance = 100 - averageScore;
  
  const riskScore = (normalizedAttendance * attendanceWeight) + 
                   (normalizedPerformance * performanceWeight);
  
  return Math.min(100, Math.max(0, Math.round(riskScore)));
};

// Risk Categories
const getRiskCategory = (score: number): string => {
  if (score >= 60) return "critical";
  if (score >= 30) return "medium";
  return "low";
};
```

### CSV Import Format

For bulk student import, use this CSV format:

```csv
firstName,lastName,gradeLevel,guardianName,guardianEmail,attendanceRate,averageScore,notes
John,Doe,Grade 10,Jane Doe,jane.doe@school.edu,85,78,Needs math tutoring
Jane,Smith,Grade 11,Bob Smith,bob.smith@school.edu,92,65,Regular attendance
```

### Role Permissions

| Feature | Admin | Teacher | Counselor |
|----------|--------|---------|-----------|
| View Students | ✅ | ✅ | ✅ |
| Add Students | ✅ | ✅ | ✅ |
| Edit Students | ✅ | ✅ | ✅ |
| Delete Students | ✅ | ❌ | ❌ |
| View Interventions | ✅ | ✅ | ✅ |
| Create Interventions | ✅ | ✅ | ✅ |
| Edit Interventions | ✅ | ✅ | ✅ |
| Delete Interventions | ✅ | ✅ | ✅ |
| User Management | ✅ | ❌ | ❌ |
| Export Data | ✅ | ✅ | ✅ |

## 🎨 UI/UX Features

### Responsive Design
- **Mobile-First**: Progressive enhancement for larger screens
- **Touch Interactions**: Optimized for mobile devices
- **Keyboard Navigation**: Full accessibility support
- **Loading States**: Skeleton screens and spinners
- **Error Handling**: User-friendly error messages

### Theme System
- **Light/Dark Modes**: System preference detection
- **Smooth Transitions**: Animated theme switching
- **Persistent Settings**: User preferences saved locally
- **Accessibility**: High contrast ratios and proper focus states

### Navigation
- **Header**: Sticky navigation with logo and user menu
- **Mobile Menu**: Hamburger menu with slide-out navigation
- **Breadcrumbs**: Clear navigation hierarchy
- **Active States**: Visual indicators for current page

## 🔒 Security Features

### Authentication
- **JWT Tokens**: Secure session management
- **Password Hashing**: Bcrypt encryption for stored passwords
- **Session Timeout**: Automatic logout for inactivity
- **CSRF Protection**: Cross-site request forgery prevention

### Data Protection
- **Input Validation**: Zod schemas for all user inputs
- **SQL Injection Prevention**: Parameterized queries
- **XSS Protection**: Sanitized user inputs
- **Rate Limiting**: API endpoint protection

## 📱 API Documentation

### Authentication Endpoints

#### POST `/api/auth/login`
Login user and create session.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "user@example.com",
    "role": "teacher"
  }
}
```

#### POST `/api/auth/register`
Create new user account (first admin only).

#### POST `/api/auth/logout`
End user session and clear authentication.

### Student Endpoints

#### GET `/api/students`
Retrieve all students for authenticated user.

#### POST `/api/students`
Create new student record.

#### PUT `/api/students/[id]`
Update existing student.

#### DELETE `/api/students/[id]`
Delete student record.

#### POST `/api/students/import`
Bulk import students from CSV data.

#### GET `/api/students/export`
Export all students as CSV.

### Intervention Endpoints

#### GET `/api/interventions`
Retrieve all interventions.

#### POST `/api/interventions`
Create new intervention.

#### PUT `/api/interventions/[id]`
Update existing intervention.

#### DELETE `/api/interventions/[id]`
Delete intervention.

## 🚀 Deployment

### Production Deployment

#### Vercel (Recommended)
1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   ```

2. **Deploy Project**
   ```bash
   # Deploy to Vercel
   vercel --prod
   ```

3. **Environment Variables**
   Set up production environment variables in Vercel dashboard:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NEXTAUTH_URL`

#### Docker Deployment
1. **Build Docker Image**
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY . .
   RUN npm run build
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Deploy with Docker Compose**
   ```yaml
   version: '3.8'
   services:
     app:
       build: .
       ports:
         - "3000:3000"
       environment:
         - MONGODB_URI=${MONGODB_URI}
         - JWT_SECRET=${JWT_SECRET}
   ```

### Environment Configuration

#### Development (.env.local)
```env
MONGODB_URI=mongodb://127.0.0.1:27017/academic-intervention-tracker
JWT_SECRET=dev-secret-key-change-in-production
APP_URL=http://localhost:3000
NODE_ENV=development
```

#### Production (.env)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/academic-intervention-tracker
JWT_SECRET=super-secure-production-secret-key-32-chars
APP_URL=https://yourdomain.com
NODE_ENV=production
```

## 🧪 Testing

### Unit Testing
```bash
# Run unit tests
npm run test

# Run tests with coverage
npm run test:coverage
```

### Integration Testing
```bash
# Test API endpoints
npm run test:integration

# Test database operations
npm run test:db
```

### E2E Testing
```bash
# Run end-to-end tests
npm run test:e2e

# Run tests in CI mode
npm run test:ci
```

## 🔧 Configuration

### Tailwind CSS Configuration
```javascript
// tailwind.config.js
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#14b8a6',
        secondary: '#64748b',
      },
    },
  },
};
```

### TypeScript Configuration
```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

## 🐛 Troubleshooting

### Common Issues

#### Database Connection
```bash
# Check MongoDB connection
mongosh "mongodb://127.0.0.1:27017/academic-intervention-tracker"

# Check network connectivity
ping mongodb.example.com
```

#### Authentication Issues
```bash
# Clear browser cookies
# Check localStorage for theme preferences
# Verify JWT secret is correctly set
```

#### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Performance Optimization

#### Database Indexes
```javascript
// Recommended MongoDB indexes
db.students.createIndex({ "riskScore": -1 });
db.students.createIndex({ "status": 1 });
db.interventions.createIndex({ "studentId": 1 });
```

#### Caching Strategy
- **Static Assets**: Optimized with Next.js Image component
- **API Responses**: Appropriate cache headers
- **Database Queries**: Efficient indexing and projection

## 🤝 Contributing

### Development Guidelines
1. **Fork Repository**: Create your own fork
2. **Feature Branches**: Create descriptive branch names
3. **Code Style**: Follow existing patterns and ESLint rules
4. **Commit Messages**: Use conventional commit format
5. **Pull Requests**: Include tests and documentation

### Commit Convention
```
type(scope): description

feat(dashboard): add student risk scoring
fix(auth): resolve login validation error
docs(readme): update installation guide
style(header): improve mobile responsiveness
refactor(api): optimize database queries
test(interventions): add unit tests for CRUD operations
```

### Code Review Process
1. **Automated Checks**: CI/CD pipeline validation
2. **Peer Review**: Manual review by team members
3. **Testing**: Comprehensive test coverage
4. **Documentation**: Update relevant documentation

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) file for details.

## 👥 Support

### Documentation
- **Help Center**: Built-in help documentation at `/help`
- **API Docs**: Comprehensive API documentation
- **User Guides**: Step-by-step tutorials

### Community
- **Issues**: Report bugs via GitHub Issues
- **Features**: Request features via GitHub Discussions
- **Contributions**: Welcome pull requests from community

---

## 🎉 Acknowledgments

Built with ❤️ for educational institutions worldwide, helping educators support student success through data-driven intervention strategies.

**Academic Intervention Tracker** - Empowering educators to make a difference, one student at a time.