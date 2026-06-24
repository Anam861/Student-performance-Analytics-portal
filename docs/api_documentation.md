# API Documentation - Student Performance Analytics Portal

This document outlines the REST API routes exposed by the backend Express server, complete with authorization details, input payload specifications, and response status codes.

---

## Base URL
All routes are prefixed by: `/api`

---

## 1. Authentication routes (`/api/auth`)

### Login User
* **Method & Path**: `POST /api/auth/login`
* **Access**: Public
* **Request Body**:
  ```json
  {
    "email": "teacher@school.edu",
    "password": "securepassword123"
  }
  ```
* **Responses**:
  * **200 OK**:
    ```json
    {
      "success": true,
      "token": "eyJhbGciOiJIUzI1NiIsIn...",
      "user": {
        "id": "603d2e5b8d23471df4bcde21",
        "name": "Prof. Smith",
        "email": "teacher@school.edu",
        "role": "teacher"
      }
    }
    ```
  * **401 Unauthorized**: Invalid credentials.

---

### Register User
* **Method & Path**: `POST /api/auth/register`
* **Access**: Private (Admin Only)
* **Request Body**:
  ```json
  {
    "name": "Jane Doe",
    "email": "student1@school.edu",
    "password": "changeme999",
    "role": "student"
  }
  ```
* **Responses**:
  * **201 Created**:
    ```json
    {
      "success": true,
      "message": "User registered successfully",
      "user": {
        "id": "603d2e8b8d23471df4bcde25",
        "name": "Jane Doe",
        "email": "student1@school.edu",
        "role": "student"
      }
    }
    ```
  * **400 Bad Request**: Missing/invalid fields or email already exists.

---

## 2. Student Profile routes (`/api/students`)

### Get All Students
* **Method & Path**: `GET /api/students`
* **Access**: Private (Admin, Teacher Only)
* **Response**:
  * **200 OK**:
    ```json
    {
      "success": true,
      "students": [
        {
          "_id": "603d2ebb8d23471df4bcde30",
          "studentId": "STU2026001",
          "class": "10-A",
          "userId": {
            "name": "Alex Johnson",
            "email": "alex@school.edu"
          }
        }
      ]
    }
    ```

---

### Create Student Profile
* **Method & Path**: `POST /api/students`
* **Access**: Private (Admin Only)
* **Request Body**:
  ```json
  {
    "userId": "603d2e8b8d23471df4bcde25",
    "studentId": "STU2026001",
    "class": "10-A",
    "guardianName": "Robert Johnson",
    "guardianPhone": "+1234567890"
  }
  ```
* **Response**:
  * **201 Created**: Student record initialized.

---

## 3. Academic Grade routes (`/api/grades`)

### Record Grade
* **Method & Path**: `POST /api/grades`
* **Access**: Private (Teacher Only)
* **Request Body**:
  ```json
  {
    "studentId": "603d2ebb8d23471df4bcde30",
    "subjectId": "603d2efb8d23471df4bcde45",
    "marksObtained": 85,
    "maxMarks": 100,
    "examType": "Midterm",
    "semester": "Fall 2026"
  }
  ```
* **Response**:
  * **201 Created**: Grade logged.

---

### Get Grades for Student
* **Method & Path**: `GET /api/grades/student/:studentId`
* **Access**: Private (Admin, Teacher, and Owner Student)
* **Response**:
  * **200 OK**:
    ```json
    {
      "success": true,
      "grades": [
        {
          "_id": "603d2f2b8d23471df4bcde50",
          "marksObtained": 85,
          "maxMarks": 100,
          "examType": "Midterm",
          "semester": "Fall 2026",
          "subjectId": {
            "name": "Mathematics",
            "code": "MATH101"
          }
        }
      ]
    }
    ```

---

## 4. Attendance routes (`/api/attendance`)

### Log Attendance
* **Method & Path**: `POST /api/attendance`
* **Access**: Private (Teacher Only)
* **Request Body**:
  ```json
  {
    "studentId": "603d2ebb8d23471df4bcde30",
    "date": "2026-06-24",
    "status": "Present",
    "remarks": "On time"
  }
  ```
* **Response**:
  * **201 Created**: Attendance record logged.

---

### Get Attendance History
* **Method & Path**: `GET /api/attendance/student/:studentId`
* **Access**: Private (Admin, Teacher, and Owner Student)
* **Response**:
  * **200 OK**:
    ```json
    {
      "success": true,
      "attendance": [
        {
          "date": "2026-06-24T00:00:00.000Z",
          "status": "Present",
          "remarks": "On time"
        }
      ]
    }
    ```
