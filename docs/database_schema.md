# Database Schema Planning - Student Performance Analytics Portal

This document outlines the MongoDB schema designs, validation rules, indices, and relationships. Mongoose is utilized as the ODM to enforce schemas at the application layer.

---

## Entity-Relationship Mapping

MongoDB is non-relational, but schemas reference other collections via `mongoose.Schema.Types.ObjectId` (represented as standard 12-byte Hex IDs).

```
  [User] ──(1:1)──> [Student] ──(1:N)──> [Grade] <──(N:1)── [Course]
                        │
                        └──(1:N)──> [Attendance]
```

---

## Collections Details

### 1. Users Collection
Stores the authentication details and general access profiles of all system users (Admins, Teachers, Students).

| Field | Type | Validation | Description |
| :--- | :--- | :--- | :--- |
| `_id` | ObjectId | Primary Key | Unique MongoDB document identifier |
| `name` | String | Required | Full display name of the user |
| `email` | String | Required, Unique, Email Match | Login email address |
| `password` | String | Required, minlength: 6, select: false | Hashed password string |
| `role` | String | Required, enum: `admin`, `teacher`, `student` | Authorization level of user |
| `createdAt` | Date | Auto | Timestamp of record creation |
| `updatedAt` | Date | Auto | Timestamp of last record update |

---

### 2. Students Collection
Holds specific registration and academic demographic information for students. Refers directly back to the `Users` collection.

| Field | Type | Validation | Description |
| :--- | :--- | :--- | :--- |
| `_id` | ObjectId | Primary Key | Unique document identifier |
| `userId` | ObjectId | Required, Ref: `User` | Maps student details to their base User login account |
| `studentId` | String | Required, Unique | Academic registration number (e.g. `STU2026001`) |
| `class` | String | Required | Grade/Class room designation (e.g. `10-A`, `12-C`) |
| `enrollmentDate` | Date | Default: Now | Date the student enrolled in the institution |
| `guardianName` | String | Required | Parent/Guardian contact name |
| `guardianPhone` | String | Required | Parent/Guardian phone number |

*Index: Single index on `class: 1` to speed up teacher analytics queries when filtering performance by class.*

---

### 3. Courses Collection
Contains the metadata of courses taught at the institution.

| Field | Type | Validation | Description |
| :--- | :--- | :--- | :--- |
| `_id` | ObjectId | Primary Key | Unique document identifier |
| `code` | String | Required, Unique | Unique subject/course code (e.g. `CS101`, `MATH202`) |
| `name` | String | Required | Display name of the course |
| `teacherId` | ObjectId | Required, Ref: `User` | Reference to the Teacher User managing this course |

---

### 4. Grades Collection
Stores exam and assignment mark details. Refers to both the Student and the Course documents.

| Field | Type | Validation | Description |
| :--- | :--- | :--- | :--- |
| `_id` | ObjectId | Primary Key | Unique document identifier |
| `studentId` | ObjectId | Required, Ref: `Student` | Reference to the Student receiving this grade |
| `subjectId` | ObjectId | Required, Ref: `Course` | Reference to the Course the grade applies to |
| `marksObtained` | Number | Required, min: 0 | Number of marks awarded |
| `maxMarks` | Number | Required, default: 100 | Maximum possible score for this assessment |
| `examType` | String | Required, enum: `Quiz`, `Assignment`, `Midterm`, `Final Exam`, `Project` | Assessment categorization |
| `semester` | String | Required | Semester/Term (e.g., `Fall 2026`, `Spring 2026`) |
| `date` | Date | Default: Now | Date of assessment logging |

*Index: Compound index on `{ studentId: 1, subjectId: 1 }` for accelerating academic progress dashboard queries.*

---

### 5. Attendance Collection
Tracks daily student attendance records.

| Field | Type | Validation | Description |
| :--- | :--- | :--- | :--- |
| `_id` | ObjectId | Primary Key | Unique document identifier |
| `studentId` | ObjectId | Required, Ref: `Student` | Reference to the Student |
| `date` | Date | Required | Calendar date of the log |
| `status` | String | Required, enum: `Present`, `Absent`, `Late` | Student presence classification |
| `remarks` | String | Optional | Notes or reason (e.g., "Sick leave with note") |

*Index: Compound index on `{ studentId: 1, date: 1 }` (unique constraint) to enforce a single attendance state per student per day.*
