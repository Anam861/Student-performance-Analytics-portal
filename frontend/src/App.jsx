import React, { useState, useMemo } from 'react';

// MOCK DATA INITIALIZATION
const INITIAL_USERS = [
  { id: '1', name: 'System Admin', email: 'admin@school.edu', role: 'admin' },
  { id: '2', name: 'Prof. Sarah Jenkins', email: 's.jenkins@school.edu', role: 'teacher' },
  { id: '3', name: 'Prof. Marcus Vance', email: 'm.vance@school.edu', role: 'teacher' },
  { id: '4', name: 'Alex Johnson', email: 'alex@school.edu', role: 'student', studentId: 'STU2026001', class: '10-A' },
  { id: '5', name: 'Emma Watson', email: 'emma@school.edu', role: 'student', studentId: 'STU2026002', class: '10-A' },
  { id: '6', name: 'Daniel Miller', email: 'daniel@school.edu', role: 'student', studentId: 'STU2026003', class: '12-C' }
];

const INITIAL_STUDENTS = [
  { id: 's1', userId: '4', studentId: 'STU2026001', name: 'Alex Johnson', class: '10-A', guardianName: 'Robert Johnson', guardianPhone: '+1-555-0199', gpa: 3.8, attendance: 96 },
  { id: 's2', userId: '5', studentId: 'STU2026002', name: 'Emma Watson', class: '10-A', guardianName: 'Chris Watson', guardianPhone: '+1-555-0144', gpa: 3.9, attendance: 98 },
  { id: 's3', userId: '6', studentId: 'STU2026003', name: 'Daniel Miller', class: '12-C', guardianName: 'Sarah Miller', guardianPhone: '+1-555-0177', gpa: 3.1, attendance: 88 }
];

const INITIAL_COURSES = [
  { id: 'c1', code: 'MATH101', name: 'Advanced Mathematics', teacherId: '2' },
  { id: 'c2', code: 'PHYS101', name: 'Introductory Physics', teacherId: '2' },
  { id: 'c3', code: 'LIT102', name: 'World Literature', teacherId: '3' }
];

const INITIAL_GRADES = [
  { id: 'g1', studentId: 's1', subjectId: 'c1', marksObtained: 94, maxMarks: 100, examType: 'Midterm', semester: 'Fall 2026', date: '2026-04-12' },
  { id: 'g2', studentId: 's1', subjectId: 'c2', marksObtained: 88, maxMarks: 100, examType: 'Midterm', semester: 'Fall 2026', date: '2026-04-14' },
  { id: 'g3', studentId: 's1', subjectId: 'c3', marksObtained: 91, maxMarks: 100, examType: 'Quiz', semester: 'Fall 2026', date: '2026-05-02' },
  { id: 'g4', studentId: 's2', subjectId: 'c1', marksObtained: 98, maxMarks: 100, examType: 'Midterm', semester: 'Fall 2026', date: '2026-04-12' },
  { id: 'g5', studentId: 's2', subjectId: 'c2', marksObtained: 95, maxMarks: 100, examType: 'Midterm', semester: 'Fall 2026', date: '2026-04-14' },
  { id: 'g6', studentId: 's3', subjectId: 'c3', marksObtained: 78, maxMarks: 100, examType: 'Midterm', semester: 'Fall 2026', date: '2026-04-20' }
];

const INITIAL_ATTENDANCE = [
  { id: 'a1', studentId: 's1', date: '2026-06-20', status: 'Present', remarks: 'On time' },
  { id: 'a2', studentId: 's1', date: '2026-06-21', status: 'Present', remarks: 'On time' },
  { id: 'a3', studentId: 's1', date: '2026-06-22', status: 'Late', remarks: '10 mins late' },
  { id: 'a4', studentId: 's1', date: '2026-06-23', status: 'Absent', remarks: 'Excused sick' },
  { id: 'a5', studentId: 's1', date: '2026-06-24', status: 'Present', remarks: 'On time' },
  { id: 'a6', studentId: 's2', date: '2026-06-24', status: 'Present', remarks: 'On time' },
  { id: 'a7', studentId: 's3', date: '2026-06-24', status: 'Absent', remarks: 'No notice' }
];

export default function App() {
  // STATE MANAGEMENT
  const [users, setUsers] = useState(INITIAL_USERS);
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [grades, setGrades] = useState(INITIAL_GRADES);
  const [attendance, setAttendance] = useState(INITIAL_ATTENDANCE);
  
  // VIEW AND SESSION STATE
  const [currentView, setCurrentView] = useState('login'); // login, admin, teacher, student, docs
  const [currentUser, setCurrentUser] = useState(null);
  const [docsTab, setDocsTab] = useState('arch'); // arch, db, api, roles
  
  // LOGGED-IN SPECIFIC STATES
  const [selectedClass, setSelectedClass] = useState('10-A');
  const [editingGrade, setEditingGrade] = useState(null);
  const [apiResponseText, setApiResponseText] = useState('');
  const [activeApiRoute, setActiveApiRoute] = useState(null);
  
  // FORM STATES
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('student');
  const [newGradeScore, setNewGradeScore] = useState('');

  // LOGIN MOCK ACTIONS
  const handleQuickLogin = (role) => {
    const matchedUser = users.find(u => u.role === role);
    setCurrentUser(matchedUser);
    setCurrentView(role);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('login');
  };

  // ADMIN ACTIONS
  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail) return;
    const newId = (users.length + 1).toString();
    const newUser = {
      id: newId,
      name: newUserName,
      email: newUserEmail,
      role: newUserRole
    };
    setUsers([...users, newUser]);
    
    if (newUserRole === 'student') {
      const studentId = `STU20260${10 + students.length}`;
      const newStudent = {
        id: `s${students.length + 1}`,
        userId: newId,
        studentId,
        name: newUserName,
        class: '10-A',
        guardianName: 'Guardian Contact',
        guardianPhone: '+1-555-0100',
        gpa: 3.5,
        attendance: 95
      };
      setStudents([...students, newStudent]);
    }
    
    setNewUserName('');
    setNewUserEmail('');
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };

  // TEACHER ACTIONS
  const activeClassStudents = useMemo(() => {
    return students.filter(s => s.class === selectedClass);
  }, [students, selectedClass]);

  const classGrades = useMemo(() => {
    const studentIds = activeClassStudents.map(s => s.id);
    return grades.filter(g => studentIds.includes(g.studentId));
  }, [grades, activeClassStudents]);

  const classAvgGpa = useMemo(() => {
    if (activeClassStudents.length === 0) return 0;
    const sum = activeClassStudents.reduce((acc, s) => acc + s.gpa, 0);
    return (sum / activeClassStudents.length).toFixed(2);
  }, [activeClassStudents]);

  const handleEditGrade = (grade) => {
    setEditingGrade(grade);
    setNewGradeScore(grade.marksObtained);
  };

  const handleUpdateGrade = (e) => {
    e.preventDefault();
    if (!editingGrade) return;
    
    const updatedGrades = grades.map(g => {
      if (g.id === editingGrade.id) {
        return { ...g, marksObtained: Number(newGradeScore) };
      }
      return g;
    });
    
    setGrades(updatedGrades);
    setEditingGrade(null);
    setNewGradeScore('');

    // Re-calculate mock GPA for the modified student
    const studentId = editingGrade.studentId;
    const studentGrades = updatedGrades.filter(g => g.studentId === studentId);
    const avgScore = studentGrades.reduce((acc, g) => acc + g.marksObtained, 0) / studentGrades.length;
    // Map 0-100 score to 0.0-4.0 GPA
    const newGpa = Number(((avgScore / 100) * 4).toFixed(2));
    
    setStudents(students.map(s => {
      if (s.id === studentId) {
        return { ...s, gpa: newGpa };
      }
      return s;
    }));
  };

  // STUDENT ACTIONS
  const studentProfile = useMemo(() => {
    if (!currentUser || currentUser.role !== 'student') return null;
    return students.find(s => s.userId === currentUser.id);
  }, [currentUser, students]);

  const studentMarks = useMemo(() => {
    if (!studentProfile) return [];
    return grades.filter(g => g.studentId === studentProfile.id).map(g => {
      const course = INITIAL_COURSES.find(c => c.id === g.subjectId);
      return {
        ...g,
        subjectName: course ? course.name : 'Unknown Course',
        subjectCode: course ? course.code : 'N/A'
      };
    });
  }, [studentProfile, grades]);

  const studentAttendanceList = useMemo(() => {
    if (!studentProfile) return [];
    return attendance.filter(a => a.studentId === studentProfile.id);
  }, [studentProfile, attendance]);

  // API DEMO CALLS SIMULATION
  const handleTryApi = (route) => {
    setActiveApiRoute(route);
    let mockResponse = {};
    switch (route) {
      case 'login':
        mockResponse = {
          success: true,
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
          user: { id: "603d2e5b8d2", name: "Prof. Sarah Jenkins", email: "s.jenkins@school.edu", role: "teacher" }
        };
        break;
      case 'get_students':
        mockResponse = {
          success: true,
          students: students.map(s => ({ id: s.id, studentId: s.studentId, name: s.name, class: s.class }))
        };
        break;
      case 'get_grades':
        mockResponse = {
          success: true,
          grades: grades.slice(0, 3)
        };
        break;
      case 'get_attendance':
        mockResponse = {
          success: true,
          attendance: attendance.slice(0, 3)
        };
        break;
      default:
        mockResponse = { message: "Route not configured in simulation" };
    }
    setApiResponseText(JSON.stringify(mockResponse, null, 2));
  };

  return (
    <div className="app-container">
      {/* SIDEBAR NAVIGATION */}
      {currentView !== 'login' && (
        <aside className="sidebar">
          <div className="sidebar-logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="url(#blue-grad)" />
              <path d="M2 17L12 22L22 17" stroke="url(#blue-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 12L12 17L22 12" stroke="url(#blue-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <defs>
                <linearGradient id="blue-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#6366f1" />
                  <stop offset="1" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
            <span>Codiora Portal</span>
          </div>
          
          <ul className="sidebar-menu">
            {currentUser?.role === 'admin' && (
              <li 
                className={`sidebar-item ${currentView === 'admin' ? 'active' : ''}`}
                onClick={() => setCurrentView('admin')}
              >
                <span>🛡️</span> Admin Console
              </li>
            )}
            
            {currentUser?.role === 'teacher' && (
              <li 
                className={`sidebar-item ${currentView === 'teacher' ? 'active' : ''}`}
                onClick={() => setCurrentView('teacher')}
              >
                <span>📝</span> Class Book
              </li>
            )}
            
            {currentUser?.role === 'student' && (
              <li 
                className={`sidebar-item ${currentView === 'student' ? 'active' : ''}`}
                onClick={() => setCurrentView('student')}
              >
                <span>📊</span> My Analytics
              </li>
            )}
            
            <li 
              className={`sidebar-item ${currentView === 'docs' ? 'active' : ''}`}
              onClick={() => setCurrentView('docs')}
            >
              <span>📚</span> System Specs
            </li>
          </ul>

          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="user-badge">
              <div className="user-avatar">
                {currentUser?.name?.charAt(0) || 'U'}
              </div>
              <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                <div style={{ fontWeight: '500' }}>{currentUser?.name || 'Guest'}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{currentUser?.role}</div>
              </div>
            </div>
            <button className="btn btn-secondary" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </aside>
      )}

      {/* CORE VIEWPORT */}
      <main className="main-content" style={currentView === 'login' ? { padding: 0, justifyContent: 'center', alignItems: 'center' } : {}}>
        
        {/* LOGIN SCREEN */}
        {currentView === 'login' && (
          <div className="glass-panel" style={{ padding: '40px', width: '100%', maxWidth: '460px' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h2 className="gradient-text" style={{ fontSize: '2.2rem', marginBottom: '8px' }}>Codiora MERN</h2>
              <p style={{ color: 'var(--text-muted)' }}>Student Performance Analytics Hub</p>
            </div>
            
            <div className="glass-panel" style={{ padding: '20px', marginBottom: '24px', background: 'rgba(255,255,255,0.02)' }}>
              <h4 style={{ marginBottom: '12px', fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Select Prototype Account</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button className="btn btn-secondary" onClick={() => handleQuickLogin('admin')} style={{ justifyContent: 'flex-start' }}>
                  <span>🛡️</span> Log in as Administrator
                </button>
                <button className="btn btn-secondary" onClick={() => handleQuickLogin('teacher')} style={{ justifyContent: 'flex-start' }}>
                  <span>📝</span> Log in as Teacher
                </button>
                <button className="btn btn-secondary" onClick={() => handleQuickLogin('student')} style={{ justifyContent: 'flex-start' }}>
                  <span>📊</span> Log in as Student
                </button>
              </div>
            </div>

            <button className="btn btn-primary" onClick={() => handleQuickLogin('admin')} style={{ width: '100%' }}>
              Browse System Documentation
            </button>
          </div>
        )}

        {/* ADMIN DASHBOARD VIEW */}
        {currentView === 'admin' && (
          <>
            <div className="top-bar">
              <div>
                <h1 className="gradient-text">Admin Command Console</h1>
                <p style={{ color: 'var(--text-muted)' }}>Manage users and global school data configurations</p>
              </div>
            </div>

            <div className="metrics-grid">
              <div className="glass-panel metric-card">
                <span className="metric-title">Registered Students</span>
                <span className="metric-value">{students.length}</span>
                <span className="metric-change up">↑ Active registration</span>
              </div>
              <div className="glass-panel metric-card">
                <span className="metric-title">Instructional Staff</span>
                <span className="metric-value">{users.filter(u => u.role === 'teacher').length}</span>
                <span className="metric-change">Standard schedule</span>
              </div>
              <div className="glass-panel metric-card">
                <span className="metric-title">Average Attendance</span>
                <span className="metric-value">94%</span>
                <span className="metric-change up">↑ Normal ranges</span>
              </div>
              <div className="glass-panel metric-card">
                <span className="metric-title">Database Status</span>
                <span className="metric-value" style={{ color: 'var(--success)', fontSize: '1.8rem' }}>Connected</span>
                <span className="metric-change up">Mongoose OK</span>
              </div>
            </div>

            <div className="dashboard-grid">
              {/* User management */}
              <div className="glass-panel" style={{ padding: '24px' }}>
                <h3 style={{ marginBottom: '20px' }}>User Account Operations</h3>
                <div className="table-container">
                  <table className="custom-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Access Role</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(u => (
                        <tr key={u.id}>
                          <td>{u.name}</td>
                          <td>{u.email}</td>
                          <td>
                            <span className={`status-badge ${u.role}`}>
                              {u.role}
                            </span>
                          </td>
                          <td>
                            {u.role !== 'admin' && (
                              <button 
                                onClick={() => handleDeleteUser(u.id)}
                                style={{ background: 'transparent', border: 'none', color: 'var(--error)', cursor: 'pointer', fontSize: '0.85rem' }}
                              >
                                Revoke Access
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Add User form */}
              <div className="glass-panel" style={{ padding: '24px' }}>
                <h3 style={{ marginBottom: '20px' }}>Create User Account</h3>
                <form onSubmit={handleAddUser}>
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Jane Doe" 
                      value={newUserName}
                      onChange={(e) => setNewUserName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input 
                      type="email" 
                      className="form-input" 
                      placeholder="jane@school.edu" 
                      value={newUserEmail}
                      onChange={(e) => setNewUserEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Access Level</label>
                    <select 
                      className="form-input" 
                      style={{ background: 'var(--bg-dark)' }}
                      value={newUserRole}
                      onChange={(e) => setNewUserRole(e.target.value)}
                    >
                      <option value="student">Student Profile</option>
                      <option value="teacher">Teacher Account</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
                    Provision Credentials
                  </button>
                </form>
              </div>
            </div>
          </>
        )}

        {/* TEACHER DASHBOARD VIEW */}
        {currentView === 'teacher' && (
          <>
            <div className="top-bar">
              <div>
                <h1 className="gradient-text">Class Gradebook Log</h1>
                <p style={{ color: 'var(--text-muted)' }}>Input marks and analyze course metrics</p>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <select 
                  className="form-input" 
                  style={{ width: '140px', background: 'var(--bg-panel)' }}
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                >
                  <option value="10-A">Class 10-A</option>
                  <option value="12-C">Class 12-C</option>
                </select>
              </div>
            </div>

            <div className="metrics-grid">
              <div className="glass-panel metric-card">
                <span className="metric-title">Enrolled Students</span>
                <span className="metric-value">{activeClassStudents.length}</span>
                <span className="metric-change">Current Class Size</span>
              </div>
              <div className="glass-panel metric-card">
                <span className="metric-title">Class Average GPA</span>
                <span className="metric-value">{classAvgGpa} / 4.0</span>
                <span className="metric-change up">↑ Dynamically recalculated</span>
              </div>
              <div className="glass-panel metric-card">
                <span className="metric-title">Logged Grades</span>
                <span className="metric-value">{classGrades.length}</span>
                <span className="metric-change">Assessments evaluated</span>
              </div>
            </div>

            <div className="dashboard-grid">
              {/* Student grades table */}
              <div className="glass-panel" style={{ padding: '24px' }}>
                <h3 style={{ marginBottom: '20px' }}>Student Performance Index</h3>
                <div className="table-container">
                  <table className="custom-table">
                    <thead>
                      <tr>
                        <th>StudentID</th>
                        <th>Student Name</th>
                        <th>Attendance %</th>
                        <th>GPA Index</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeClassStudents.map(s => (
                        <tr key={s.id}>
                          <td><code>{s.studentId}</code></td>
                          <td>{s.name}</td>
                          <td>{s.attendance}%</td>
                          <td>
                            <strong style={{ color: s.gpa >= 3.5 ? 'var(--success)' : 'white' }}>
                              {s.gpa.toFixed(2)}
                            </strong>
                          </td>
                          <td>
                            <button 
                              className="btn btn-secondary" 
                              style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                              onClick={() => {
                                const stGrade = grades.find(g => g.studentId === s.id);
                                if (stGrade) handleEditGrade(stGrade);
                              }}
                            >
                              Edit Score
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Edit Grade Form */}
              <div className="glass-panel" style={{ padding: '24px' }}>
                <h3>Score Entry Console</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '20px' }}>
                  Select "Edit Score" on a student to load their grade records here.
                </p>
                {editingGrade ? (
                  <form onSubmit={handleUpdateGrade}>
                    <div className="form-group">
                      <label className="form-label">Student ID</label>
                      <input type="text" className="form-input" value={editingGrade.studentId} disabled />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Marks Obtained (out of 100)</label>
                      <input 
                        type="number" 
                        className="form-input" 
                        min="0"
                        max="100"
                        value={newGradeScore}
                        onChange={(e) => setNewGradeScore(e.target.value)}
                      />
                    </div>
                    <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                      <button type="submit" className="btn btn-primary" style={{ flexGrow: 1 }}>
                        Apply Grade
                      </button>
                      <button type="button" className="btn btn-secondary" onClick={() => setEditingGrade(null)}>
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '200px', border: '1px dashed var(--card-border)', borderRadius: '8px' }}>
                    <span style={{ fontSize: '2rem' }}>📊</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '12px' }}>No student record selected</span>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* STUDENT DASHBOARD VIEW */}
        {currentView === 'student' && studentProfile && (
          <>
            <div className="top-bar">
              <div>
                <h1 className="gradient-text">My Performance Workspace</h1>
                <p style={{ color: 'var(--text-muted)' }}>Registered as Student ID: <code>{studentProfile.studentId}</code></p>
              </div>
            </div>

            <div className="metrics-grid">
              <div className="glass-panel metric-card">
                <span className="metric-title">Cumulative GPA</span>
                <span className="metric-value" style={{ color: 'var(--success)' }}>{studentProfile.gpa.toFixed(2)}</span>
                <span className="metric-change">Out of 4.0</span>
              </div>
              <div className="glass-panel metric-card">
                <span className="metric-title">Attendance Rate</span>
                <span className="metric-value">{studentProfile.attendance}%</span>
                <span className="metric-change">Requirement: &gt;90%</span>
              </div>
              <div className="glass-panel metric-card">
                <span className="metric-title">Assessments Tracked</span>
                <span className="metric-value">{studentMarks.length}</span>
                <span className="metric-change">All semesters</span>
              </div>
            </div>

            <div className="dashboard-grid">
              {/* Grade card lists */}
              <div className="glass-panel" style={{ padding: '24px' }}>
                <h3 style={{ marginBottom: '20px' }}>Academic Marks Ledger</h3>
                <div className="table-container">
                  <table className="custom-table">
                    <thead>
                      <tr>
                        <th>Code</th>
                        <th>Subject</th>
                        <th>Exam Type</th>
                        <th>Semester</th>
                        <th>Marks Obtained</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentMarks.map(m => (
                        <tr key={m.id}>
                          <td><code>{m.subjectCode}</code></td>
                          <td>{m.subjectName}</td>
                          <td>{m.examType}</td>
                          <td>{m.semester}</td>
                          <td>
                            <strong>{m.marksObtained}</strong> / {m.maxMarks}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Graphical representation & Attendance */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {/* GPA Trend Curve */}
                <div className="glass-panel" style={{ padding: '24px' }}>
                  <h3 style={{ marginBottom: '16px' }}>GPA Progression Trend</h3>
                  <div style={{ height: '140px', width: '100%', position: 'relative' }}>
                    <svg viewBox="0 0 300 100" style={{ width: '100%', height: '100%' }}>
                      {/* Grid Lines */}
                      <line x1="0" y1="20" x2="300" y2="20" stroke="rgba(255,255,255,0.05)" />
                      <line x1="0" y1="50" x2="300" y2="50" stroke="rgba(255,255,255,0.05)" />
                      <line x1="0" y1="80" x2="300" y2="80" stroke="rgba(255,255,255,0.05)" />
                      
                      {/* Spline Curve */}
                      <path 
                        d="M 20 80 Q 90 40 160 55 T 280 20" 
                        fill="none" 
                        stroke="url(#chart-grad)" 
                        strokeWidth="3" 
                      />
                      
                      {/* Dots */}
                      <circle cx="20" cy="80" r="4" fill="var(--primary)" />
                      <circle cx="90" cy="40" r="4" fill="var(--primary)" />
                      <circle cx="160" cy="55" r="4" fill="var(--primary)" />
                      <circle cx="280" cy="20" r="4" fill="var(--secondary)" />

                      <defs>
                        <linearGradient id="chart-grad" x1="0" y1="0" x2="1" y2="0">
                          <stop stopColor="#6366f1" />
                          <stop offset="1" stopColor="#22d3ee" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                    <span>Term 1</span>
                    <span>Term 2</span>
                    <span>Midterm</span>
                    <span>Current</span>
                  </div>
                </div>

                {/* Attendance Logs */}
                <div className="glass-panel" style={{ padding: '24px' }}>
                  <h3 style={{ marginBottom: '16px' }}>Recent Presence History</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {studentAttendanceList.map(a => (
                      <div key={a.id} style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                        <span style={{ fontSize: '0.9rem' }}>{a.date}</span>
                        <span className={`status-badge ${a.status.toLowerCase()}`}>{a.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* SYSTEM SPECS / DOCUMENTATION TAB */}
        {currentView === 'docs' && (
          <>
            <div className="top-bar">
              <div>
                <h1 className="gradient-text">Portal System Blueprint</h1>
                <p style={{ color: 'var(--text-muted)' }}>MERN design and planning center</p>
              </div>
            </div>

            <div className="docs-layout">
              {/* TOC */}
              <nav className="docs-toc">
                <div 
                  className={`docs-toc-item ${docsTab === 'arch' ? 'active' : ''}`}
                  onClick={() => setDocsTab('arch')}
                >
                  System Architecture
                </div>
                <div 
                  className={`docs-toc-item ${docsTab === 'db' ? 'active' : ''}`}
                  onClick={() => setDocsTab('db')}
                >
                  Database Schema
                </div>
                <div 
                  className={`docs-toc-item ${docsTab === 'api' ? 'active' : ''}`}
                  onClick={() => setDocsTab('api')}
                >
                  API Routing Specs
                </div>
                <div 
                  className={`docs-toc-item ${docsTab === 'roles' ? 'active' : ''}`}
                  onClick={() => setDocsTab('roles')}
                >
                  Permissions Matrix
                </div>
              </nav>

              {/* SPECIFICATION PANELS */}
              <div className="glass-panel docs-panel markdown-body">
                {docsTab === 'arch' && (
                  <div>
                    <h2>1. System Architecture Layout</h2>
                    <p>
                      The Student Performance Analytics Portal uses a structured 3-tier client-server layout.
                      The React web interface communicates with a Node/Express API, which interacts with a MongoDB data store.
                    </p>

                    <h3>MERN Architecture Flow</h3>
                    <div style={{ background: 'rgba(0,0,0,0.2)', padding: '24px', borderRadius: '12px', border: '1px solid var(--card-border)', display: 'flex', justifyContent: 'center', margin: '24px 0' }}>
                      <svg width="400" height="200" viewBox="0 0 400 200" style={{ maxWidth: '100%' }}>
                        {/* React Card */}
                        <rect x="10" y="70" width="90" height="60" rx="8" fill="rgba(99, 102, 241, 0.15)" stroke="var(--primary)" strokeWidth="1.5" />
                        <text x="55" y="105" fill="white" fontSize="11" textAnchor="middle">React (Vite)</text>
                        
                        {/* Arrow 1 */}
                        <line x1="100" y1="100" x2="140" y2="100" stroke="var(--text-muted)" strokeWidth="1.5" markerEnd="url(#arrow)" />
                        
                        {/* Express Card */}
                        <rect x="150" y="70" width="100" height="60" rx="8" fill="rgba(34, 211, 238, 0.15)" stroke="var(--secondary)" strokeWidth="1.5" />
                        <text x="200" y="98" fill="white" fontSize="11" textAnchor="middle">Express Server</text>
                        <text x="200" y="115" fill="var(--text-muted)" fontSize="9" textAnchor="middle">(JWT Auth)</text>

                        {/* Arrow 2 */}
                        <line x1="250" y1="100" x2="290" y2="100" stroke="var(--text-muted)" strokeWidth="1.5" markerEnd="url(#arrow)" />

                        {/* Mongo Card */}
                        <rect x="300" y="70" width="90" height="60" rx="8" fill="rgba(16, 185, 129, 0.15)" stroke="var(--success)" strokeWidth="1.5" />
                        <text x="345" y="100" fill="white" fontSize="11" textAnchor="middle">MongoDB</text>
                        <text x="345" y="115" fill="var(--text-muted)" fontSize="9" textAnchor="middle">(Mongoose)</text>

                        <defs>
                          <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--text-muted)" />
                          </marker>
                        </defs>
                      </svg>
                    </div>

                    <h3>Core Design Features</h3>
                    <ul>
                      <li><strong>JWT Authentication:</strong> Secure payload transport utilizing digital signatures.</li>
                      <li><strong>REST API Design:</strong> Clean, stateless request architecture using standard HTTP statuses.</li>
                      <li><strong>Database Indices:</strong> Mongoose indices added to high-traffic columns to speed up analysis.</li>
                    </ul>
                  </div>
                )}

                {docsTab === 'db' && (
                  <div>
                    <h2>2. Database Schemas (MongoDB)</h2>
                    <p>Below are Mongoose schema field maps defining the data objects utilized inside the MongoDB cluster.</p>
                    
                    <h3>Users Model</h3>
                    <table>
                      <thead>
                        <tr><th>Field</th><th>Type</th><th>Constraint</th></tr>
                      </thead>
                      <tbody>
                        <tr><td><code>name</code></td><td>String</td><td>Required</td></tr>
                        <tr><td><code>email</code></td><td>String</td><td>Required, Unique, Format Validation</td></tr>
                        <tr><td><code>role</code></td><td>String</td><td>Enum: [admin, teacher, student]</td></tr>
                        <tr><td><code>password</code></td><td>String</td><td>Hashed, minlength: 6, hidden in query responses</td></tr>
                      </tbody>
                    </table>

                    <h3>Students Model</h3>
                    <table>
                      <thead>
                        <tr><th>Field</th><th>Type</th><th>Ref Relation</th></tr>
                      </thead>
                      <tbody>
                        <tr><td><code>userId</code></td><td>ObjectId</td><td>User Schema (1:1 relationship)</td></tr>
                        <tr><td><code>studentId</code></td><td>String</td><td>Unique, primary key representation</td></tr>
                        <tr><td><code>class</code></td><td>String</td><td>Index constraint enabled</td></tr>
                      </tbody>
                    </table>
                  </div>
                )}

                {docsTab === 'api' && (
                  <div>
                    <h2>3. REST API Routes Specifications</h2>
                    <p>Select a route from the list to test and simulate an API call payload output.</p>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', margin: '20px 0' }}>
                      <div className="glass-panel" style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <span style={{ background: 'var(--primary)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold', marginRight: '10px' }}>POST</span>
                          <code>/api/auth/login</code>
                        </div>
                        <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => handleTryApi('login')}>Try Route</button>
                      </div>

                      <div className="glass-panel" style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <span style={{ background: 'var(--success)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold', marginRight: '10px' }}>GET</span>
                          <code>/api/students</code>
                        </div>
                        <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => handleTryApi('get_students')}>Try Route</button>
                      </div>

                      <div className="glass-panel" style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <span style={{ background: 'var(--success)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold', marginRight: '10px' }}>GET</span>
                          <code>/api/grades/student/:studentId</code>
                        </div>
                        <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => handleTryApi('get_grades')}>Try Route</button>
                      </div>
                    </div>

                    {activeApiRoute && (
                      <div style={{ marginTop: '24px' }}>
                        <h4 style={{ marginBottom: '8px' }}>Response Body Output:</h4>
                        <pre>
                          <code>{apiResponseText}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                )}

                {docsTab === 'roles' && (
                  <div>
                    <h2>4. Role-Based Permissions Grid</h2>
                    <p>Permissions matrix enforced across both UI components and route middleware layers.</p>
                    
                    <table>
                      <thead>
                        <tr><th>Capability</th><th>Admin</th><th>Teacher</th><th>Student</th></tr>
                      </thead>
                      <tbody>
                        <tr><td>Create login accounts</td><td>✅ Yes</td><td>❌ No</td><td>❌ No</td></tr>
                        <tr><td>Register grades</td><td>✅ Yes</td><td>✅ Yes</td><td>❌ No</td></tr>
                        <tr><td>Record daily attendance</td><td>✅ Yes</td><td>✅ Yes</td><td>❌ No</td></tr>
                        <tr><td>View class aggregates</td><td>✅ Yes</td><td>✅ Yes</td><td>❌ No</td></tr>
                        <tr><td>View individual grade-cards</td><td>✅ Yes</td><td>✅ Yes</td><td>✅ Own Only</td></tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

      </main>
    </div>
  );
}
