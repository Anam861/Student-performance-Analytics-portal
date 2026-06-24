# User Roles and Permissions Matrix - Student Performance Analytics Portal

This document clarifies the access levels, credentials, and actions permitted for each of the three user roles defined in the Student Performance Analytics Portal system.

---

## Roles Overview

```
                      ┌───────────────┐
                      │    ADMIN      │  <-- System configuration, User accounts
                      └───────┬───────┘
                              │
                      ┌───────▼───────┐
                      │    TEACHER    │  <-- Classroom logging, Grade entry
                      └───────┬───────┘
                              │
                      ┌───────▼───────┐
                      │    STUDENT    │  <-- Report card, Personal analytics
                      └───────────────┘
```

---

## Detailed Permissions Matrix

| Feature / Action | Admin | Teacher | Student | Details / Notes |
| :--- | :---: | :---: | :---: | :--- |
| **Login / Logout** | Yes | Yes | Yes | All users authenticate using JWT |
| **View Profile Settings** | Yes | Yes | Yes | Can reset own password |
| **Create/Edit User Logins** | Yes | No | No | Only Admin can provision accounts |
| **Register Student Profiles** | Yes | No | No | Link User to demographic Student schema |
| **Assign Course to Teacher** | Yes | No | No | Map course code to teacher User ID |
| **Log Grades** | Yes | Yes | No | Teacher logs marks for assigned courses only |
| **Edit/Delete Grades** | Yes | Yes | No | Allow corrections before term lock |
| **Log Daily Attendance** | Yes | Yes | No | Teacher marks student attendance |
| **View Global Institution KPIs**| Yes | No | No | Access global school performance dashboard |
| **View Class-Level Analytics** | Yes | Yes | No | Average GPA, distribution charts by class |
| **View Student Profile Sheet** | Yes | Yes | Self Only| Teachers see students they teach |
| **View Personal Grade Card** | Yes | Yes | Self Only| Student sees own score cards |
| **View Personal Attendance History**| Yes | Yes | Self Only| Student reviews presence percentages |

---

## Security Enforcement Rules

1. **Role-Based Token Verification**:
   - The Express backend reads the JWT, verifies the signature, and matches the embedded `role` value against route permissions using `authorize('admin', 'teacher')`.

2. **Data Scope Isolation**:
   - For student access requests, the backend controller confirms that the queried student ID matches the authenticated user's ID (`req.user.id === student.userId`), preventing cross-tenant access.
