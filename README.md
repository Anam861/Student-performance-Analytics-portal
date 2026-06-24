# Student Performance Analytics Portal

This repository contains the project planning, design documents, and the initial code skeleton for the **Student Performance Analytics Portal** MERN stack application.

---

## 📂 Project Structure

```text
student-performance-analytics-portal/
├── backend/                  # Express.js REST API Server
│   ├── config/               # Database Connection Setup
│   ├── controllers/          # API Route Request Handlers
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
├── pdf_exports/              # Design Planning & Blueprint PDFs
└── README.md                 # Setup & Execution Guide (This File)
```

---

## 📋 Design & Planning Blueprint Sheets

All design specifications have been compiled into print-ready PDFs located in the [pdf_exports/](./pdf_exports/) directory:
1. `0_Project_Walkthrough.pdf` — Overview of the prototype client and Figma screenshots.
2. `1_Architecture_Diagram.pdf` — High-level MERN stack client-server data flow diagram.
3. `2_Database_Schema.pdf` — Mongoose schemas, indexes, and collections detail.
4. `3_API_Documentation.pdf` — Endpoint routes, request/response models, and roles check.
5. `4_User_Roles.pdf` — Permissions matrix mapping Admin, Teacher, and Student scopes.
6. `5_Wireframes_Spec.pdf` — High-fidelity Figma visual mockups for all core pages.

*Note: Visual wireframes were designed using the **Lumina Analytics** glassmorphic dark theme inside the Figma/Stitch workspace under project ID: `projects/3602507402818866855`.*

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
