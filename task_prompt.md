# AI Prompt: MERN Stack Project Planning and Initial System Design

**Role**: Lead MERN Stack Architect & Senior Full-Stack Engineer
**Task**: Project Planning and Initial System Design for the **Student Performance Analytics Portal**
**Project Goal**: Design a robust, scalable foundation for a portal that enables Admins, Teachers, and Students to monitor, analyze, and manage academic performance, attendance, and student profiles.

You are required to perform the complete planning phase and produce high-quality, professional system deliverables. Do not write the full application code, but set up the exact codebase skeleton and all design specifications.

---

## Part 1: Project Structure Creation
Initialize the folder structure for a monorepo or separated frontend/backend layout.
1. Create a root project directory.
2. Setup a `backend/` folder containing:
   - `server.js` (Express configuration, middleware setup, database connection integration)
   - `config/db.js` (Mongoose connection logic using environment variables)
   - `models/` (Schema definitions directory)
   - `controllers/` (Request handlers directory)
   - `routes/` (Express routes directory)
   - `middleware/` (Auth, error handling, and role validation directory)
   - `package.json` (Defining dependencies like `express`, `mongoose`, `jsonwebtoken`, `bcryptjs`, `cors`, `dotenv`)
3. Setup a `frontend/` folder containing a standard Vite + React project structure:
   - `src/components/` (Reusable UI components)
   - `src/pages/` (Page wireframes/views)
   - `src/styles/` (Global styles and design system tokens)
   - `package.json`, `vite.config.js`, `index.html`

---

## Part 2: System Architecture Design
Draft a system architecture document (`docs/architecture_diagram.md`) which includes:
1. **Architecture Diagram**: A Mermaid.js flow diagram mapping the client-server interaction:
   - Client Tier: React SPA (Vite)
   - Application Tier: Node.js / Express.js REST API
   - Database Tier: MongoDB (Mongoose ODM)
   - Authentication Flow: JWT token generation, storage (HTTP-only cookies or authorization headers), and verification middleware.
2. **Data Flow description**: Step-by-step description of how a request (e.g., fetching a student's analytics) flows from the UI, gets authorized, queries MongoDB, aggregates data, and returns the response.

---

## Part 3: Database Schema Planning
Draft a database planning document (`docs/database_schema.md`). Design the MongoDB database schemas using Mongoose types. For each collection, specify the schema structure, fields, data types, validations (e.g., required, unique), and indices.
Include the following collections:
1. **Users**: Core authentication collection (name, email, password hash, role).
2. **Students**: Student-specific profiles (linked to Users collection via ObjectId, registration number, class/grade level, enrollment date, status).
3. **Courses/Subjects**: Subject details (name, code, assigned teacher ObjectId).
4. **Grades**: Academic scores (student ObjectId, subject ObjectId, exam type like 'Midterm'/'Final', marks obtained, max marks, term/semester, date).
5. **Attendance**: Daily records (student ObjectId, date, status: 'Present'/'Absent'/'Late', remarks).

Define relational mapping (e.g., one-to-one, one-to-many) and specify which fields should be indexed for faster query times in analytics lookups.

---

## Part 4: User Roles & Permissions Matrix
Draft a roles definition document (`docs/user_roles.md`). Outline permissions for the three core roles:
- **Admin**:
  - Full CRUD on Users, Students, and Courses.
  - View global dashboard metrics (total enrollment, overall average, attendance rates).
  - System logs and audit access.
- **Teacher**:
  - View assigned courses and enrolled students.
  - CRUD on Grades for students in their assigned courses.
  - Record and view student attendance.
  - View class-level analytics (pass rates, grade distribution).
- **Student**:
  - Read-only access to their own academic grades.
  - Read-only access to their personal attendance statistics.
  - View individual performance charts and progress trends.
  - No access to other students' data or class-wide metrics.

---

## Part 5: REST API Planning Document
Draft an API documentation draft (`docs/api_documentation.md`) detailing the REST endpoints. Use clean API design principles (RESTful paths, proper HTTP verbs). For each route, document:
- **HTTP Method** & **Path**
- **Access Level** (Public, Auth, Admin-Only, Teacher-Only, Owner-Only)
- **Request Parameters / Request Body Schema** (JSON format)
- **Success Response** (200 OK / 201 Created with JSON structure)
- **Error Responses** (e.g., 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found)

Cover all key functionalities:
- Auth: `/api/auth/register` (Admin), `/api/auth/login`, `/api/auth/me`
- Students: `/api/students` (CRUD)
- Grades: `/api/grades` (CRUD, and fetching by student)
- Attendance: `/api/attendance` (CRUD, bulk insert)
- Analytics: `/api/analytics/overview`, `/api/analytics/class/:classId`, `/api/analytics/student/:studentId`

---

## Part 6: Wireframe & UI Layout Specifications
Draft a UI wireframes document (`docs/wireframes.md`) that details the UI layouts and design system requirements. Spec out the following interfaces:
1. **Design System Tokens**: Define color palettes (cool slate, deep indigo accents, alert colors for poor performance), typography (Inter/Outfit), and UI components (Glassmorphism cards, sidebar layouts).
2. **Login Screen**: Minimalist layout with role-based redirection.
3. **Admin Dashboard**: Grid-based display featuring:
   - High-level KPIs (Total Students, Total Teachers, Average Attendance, Average GPA).
   - Quick Action buttons (Add User, Create Class).
   - User Management table.
4. **Teacher Dashboard**: Performance-driven view featuring:
   - Class selector dropdown.
   - Grade distribution histogram mock layout.
   - Attendance summary radial chart.
   - Student grade table with quick inline inline edit buttons.
5. **Student Portal**: Student-centric view featuring:
   - Overall GPA gauge.
   - Subject-wise score breakdown radar or bar chart.
   - Attendance calendar mock.
   - Teacher comments/feedback feed.

---

## Part 7: Version Control Initialization
Initialize the Git repository:
1. Create a `.gitignore` in the root folder, ignoring `node_modules`, `.env`, build directories (`dist/`), and OS-specific files (`.DS_Store`).
2. Run `git init`.
3. Stage files (`git add .`) and make the initial commit (`git commit -m "chore: initial MERN project skeleton & system design documentation"`).

---

## Deliverables Summary
Ensure the repository contains:
1. The physical directory structure with corresponding skeleton folders and `package.json` files.
2. `docs/architecture_diagram.md`
3. `docs/database_schema.md`
4. `docs/api_documentation.md`
5. `docs/user_roles.md`
6. `docs/wireframes.md`
7. A `.git/` folder representing an initialized local Git repository.
