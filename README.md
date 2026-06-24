# Student Performance Analytics Portal

This repository contains the project planning, design documents, and the initial code skeleton for the **Student Performance Analytics Portal** MERN stack application.

---

## 📂 Project Structure

```text
student-performance-analytics-portal/
├── backend/                  # Express.js REST API Server
│   ├── config/               # Database Connection Setup
│   ├── middleware/           # JWT & Role Authentication Middleware
│   ├── models/               # MongoDB Mongoose Schemas
│   ├── routes/               # Express Router Definitions
│   └── package.json          # Backend Dependencies
├── frontend/                 # Vite + React + Vanilla CSS Frontend SPA
│   ├── src/                  # React Application Code
│   │   ├── components/       # Reusable UI Elements
│   │   ├── pages/            # Dashboard Views (Admin, Teacher, Student)
│   │   ├── styles/           # CSS Tokens & Glassmorphic Layouts
│   │   └── App.jsx           # Main Interactive Wireframe Client
│   └── package.json          # Frontend Dependencies
├── docs/                     # Design Planning, Blueprints & Assets
└── README.md                 # Setup & Execution Guide (This File)
```

---

## 📋 Design & Planning Blueprint Sheets

All system design blueprints are available as markdown specifications located in the [docs/](./docs/) directory:
1. **[System Architecture Diagram](./docs/architecture_diagram.md)** — High-level MERN stack client-server data flow diagram.
2. **[Database Schema Draft](./docs/database_schema.md)** — Mongoose schemas, indexes, and collections detail.
3. **[REST API Documentation](./docs/api_documentation.md)** — Endpoint routes, request/response models, and role permissions.
4. **[User Access Roles](./docs/user_roles.md)** — Permissions matrix mapping Admin, Teacher, and Student scopes.
5. **[Wireframes Spec](./docs/wireframes.md)** — Visual mockups spec designed using the **Lumina Analytics** glassmorphic dark theme.

---

## 🎥 Project Walkthrough Video

Watch the interactive video walkthrough demonstrating the portal prototype client:
* **[Project Demo Video](./docs/assets/project_video.mp4)**

---


## 🚀 Setup & Execution Instructions

Follow these steps to initialize and start the application locally:

### 1. Extract the Project
Unzip the folder to your desired local workspace.

### 2. Install Dependencies
You can install dependencies for both the frontend and backend with a single command from the project root directory:
```bash
npm run setup
```

Alternatively, you can install them manually by running:

**Frontend:**
```bash
cd frontend
npm install
cd ..
```

**Backend:**
```bash
cd backend
npm install
cd ..
```

### 3. Set Up Environment Variables
Create a file named `.env` inside the `backend/` folder and configure your MongoDB database URL and JWT signing key:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/analytics_db
JWT_SECRET=your_jwt_secret_token_key_here
```

### 4. Run the Application

You can start the project from the root folder:

*   **Start the React Frontend (Vite):**
    ```bash
    npm run client
    ```
    This spins up the client portal. Open `http://localhost:5173/` in your browser.
    *You can login with the quick-switch prototype accounts for Admin, Teacher, or Student, or explore the Specs and mock API route testers.*

*   **Start the Node/Express Backend Server:**
    ```bash
    npm run server
    ```
    This starts the API server listening on port `5000`.
