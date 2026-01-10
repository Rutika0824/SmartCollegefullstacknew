// // src/App.jsx
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { useContext } from "react";

// import { AuthContext } from "./auth/AuthContext";
// import Sidebar from "./components/Sidebar";

// // Auth pages
// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";

// // Dashboard
// import Dashboard from "./pages/dashboard/Dashboard";

// // Admin-only pages
// import DepartmentList from "./pages/departments/DepartmentList";
// import AddDepartment from "./pages/departments/AddDepartment";
// import CourseList from "./pages/courses/CourseList";
// import AddCourse from "./pages/courses/AddCourse";
// import StudentList from "./pages/students/StudentList";
// import AddStudent from "./pages/students/AddStudent";

// // Attendance (admin + teacher)
// import AttendanceList from "./pages/attendance/AttendanceList";
// import MarkAttendance from "./pages/attendance/MarkAttendance";
// import ProtectedRoute from "./components/ProtectedRoute";

// export default function App() {
//   const { user } = useContext(AuthContext);

//   return (
//     <BrowserRouter>
//       <div className="container-fluid p-0">
//         <div className="row g-0">
//           {user && (
//             <div className="col-auto">
//               <Sidebar />
//             </div>
//           )}
//           <main className={`col ${user ? '' : 'd-flex align-items-center justify-content-center'}`}>
//             <div className={user ? "p-4 w-100" : "w-100"} style={{ minHeight: '100vh' }}>
//               <Routes>
//                 {/* Default route */}
//                 <Route
//                   path="/"
//                   element={<Navigate to={user ? "/dashboard" : "/login"} replace />}
//                 />

//                 {/* Public routes */}
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/register" element={<Register />} />

//                 {/* Protected: Dashboard (both roles) */}
//                 <Route
//                   path="/dashboard"
//                   element={
//                     <ProtectedRoute>
//                       <Dashboard />
//                     </ProtectedRoute>
//                   }
//                 />

//                 {/* Admin-only routes */}
//                 <Route
//                   path="/departments"
//                   element={
//                     <ProtectedRoute allowedRoles={['admin']}>
//                       <DepartmentList />
//                     </ProtectedRoute>
//                   }
//                 />
//                 <Route
//                   path="/departments/new"
//                   element={
//                     <ProtectedRoute allowedRoles={['admin']}>
//                       <AddDepartment />
//                     </ProtectedRoute>
//                   }
//                 />

//                 <Route
//                   path="/courses"
//                   element={
//                     <ProtectedRoute allowedRoles={['admin']}>
//                       <CourseList />
//                     </ProtectedRoute>
//                   }
//                 />
//                 <Route
//                   path="/courses/new"
//                   element={
//                     <ProtectedRoute allowedRoles={['admin']}>
//                       <AddCourse />
//                     </ProtectedRoute>
//                   }
//                 />

//                 <Route
//                   path="/students"
//                   element={
//                     <ProtectedRoute allowedRoles={['admin']}>
//                       <StudentList />
//                     </ProtectedRoute>
//                   }
//                 />
//                 <Route
//                   path="/students/new"
//                   element={
//                     <ProtectedRoute allowedRoles={['admin']}>
//                       <AddStudent />
//                     </ProtectedRoute>
//                   }
//                 />

//                 {/* Attendance: accessible to both admin and teacher */}
//                 <Route
//                   path="/attendance"
//                   element={
//                     <ProtectedRoute allowedRoles={['admin', 'teacher']}>
//                       <AttendanceList />
//                     </ProtectedRoute>
//                   }
//                 />
//                 <Route
//                   path="/attendance/mark"
//                   element={
//                     <ProtectedRoute allowedRoles={['admin', 'teacher']}>
//                       <MarkAttendance />
//                     </ProtectedRoute>
//                   }
//                 />

//                 {/* Fallback */}
//                 <Route path="*" element={<Navigate to="/" replace />} />
//               </Routes>
//             </div>
//           </main>
//         </div>
//       </div>
//     </BrowserRouter>
//   );
// }











// // src/App.jsx
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { useContext } from "react";

// import { AuthContext } from "./auth/AuthContext";
// import Sidebar from "./components/Sidebar";

// // Auth pages
// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";

// // Dashboard
// import Dashboard from "./pages/dashboard/Dashboard";

// // Admin-only pages
// import DepartmentList from "./pages/departments/DepartmentList";
// import AddDepartment from "./pages/departments/AddDepartment";
// import CourseList from "./pages/courses/CourseList";
// import AddCourse from "./pages/courses/AddCourse";
// import StudentList from "./pages/students/StudentList";
// import AddStudent from "./pages/students/AddStudent";

// // Attendance (admin + teacher)
// import AttendanceList from "./pages/attendance/AttendanceList";
// import MarkAttendance from "./pages/attendance/MarkAttendance";
// import ProtectedRoute from "./components/ProtectedRoute";

// export default function App() {
//   const { user, loading } = useContext(AuthContext);

//   // Show loader while checking auth state
//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center vh-100">
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <BrowserRouter>
//       <div className="container-fluid p-0">
//         <div className="row g-0">
//           {/* Sidebar: only show if user is logged in */}
//           {user && (
//             <div className="col-auto">
//               <Sidebar />
//             </div>
//           )}
//           <main className={`col ${user ? '' : 'd-flex align-items-center justify-content-center'}`}>
//             <div className={user ? "p-4 w-100" : "w-100"} style={{ minHeight: '100vh' }}>
//               <Routes>
//                 {/* Default route */}
//                 <Route
//                   path="/"
//                   element={<Navigate to={user ? "/dashboard" : "/login"} replace />}
//                 />

//                 {/* Public routes */}
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/register" element={<Register />} />

//                 {/* Protected: Dashboard (both roles) */}
//                 <Route
//                   path="/dashboard"
//                   element={
//                     <ProtectedRoute>
//                       <Dashboard />
//                     </ProtectedRoute>
//                   }
//                 />

//                 {/* Admin-only routes */}
//                 <Route
//                   path="/departments"
//                   element={
//                     <ProtectedRoute allowedRoles={['admin']}>
//                       <DepartmentList />
//                     </ProtectedRoute>
//                   }
//                 />
//                 <Route
//                   path="/departments/new"
//                   element={
//                     <ProtectedRoute allowedRoles={['admin']}>
//                       <AddDepartment />
//                     </ProtectedRoute>
//                   }
//                 />

//                 <Route
//                   path="/courses"
//                   element={
//                     <ProtectedRoute allowedRoles={['admin']}>
//                       <CourseList />
//                     </ProtectedRoute>
//                   }
//                 />
//                 <Route
//                   path="/courses/new"
//                   element={
//                     <ProtectedRoute allowedRoles={['admin']}>
//                       <AddCourse />
//                     </ProtectedRoute>
//                   }
//                 />

//                 <Route
//                   path="/students"
//                   element={
//                     <ProtectedRoute allowedRoles={['admin']}>
//                       <StudentList />
//                     </ProtectedRoute>
//                   }
//                 />
//                 <Route
//                   path="/students/new"
//                   element={
//                     <ProtectedRoute allowedRoles={['admin']}>
//                       <AddStudent />
//                     </ProtectedRoute>
//                   }
//                 />

//                 {/* Attendance: accessible to both admin and teacher */}
//                 <Route
//                   path="/attendance"
//                   element={
//                     <ProtectedRoute allowedRoles={['admin', 'teacher']}>
//                       <AttendanceList />
//                     </ProtectedRoute>
//                   }
//                 />
//                 <Route
//                   path="/attendance/mark"
//                   element={
//                     <ProtectedRoute allowedRoles={['admin', 'teacher']}>
//                       <MarkAttendance />
//                     </ProtectedRoute>
//                   }
//                 />

//                 {/* Fallback */}
//                 <Route path="*" element={<Navigate to="/" replace />} />
//               </Routes>
//             </div>
//           </main>
//         </div>
//       </div>
//     </BrowserRouter>
//   );
// }









import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "./auth/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

/* Auth Pages */
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

/* Dashboards */
import Dashboard from "./pages/dashboard/Dashboard";
import StudentDashboard from "./pages/dashboard/StudentDashboard";

/* Admin – Departments */
import AddDepartment from "./pages/departments/AddDepartment";
import DepartmentList from "./pages/departments/DepartmentList";

/* Admin – Courses */
import AddCourse from "./pages/courses/AddCourse";
import CourseList from "./pages/courses/CourseList";

/* Admin – Students */
import AddStudent from "./pages/students/AddStudent";
import StudentList from "./pages/students/StudentList";

/* Attendance */
import MarkAttendance from "./pages/attendance/MarkAttendance";
import AttendanceList from "./pages/attendance/AttendanceList";
import MyAttendance from "./pages/attendance/MyAttendance";

export default function App() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar only when logged in */}
          {user && <Sidebar />}

          <main className="col p-0">
            {/* Navbar only when logged in */}
            {user && <Navbar />}

            <div className="p-4">
              <Routes>
                {/* Root Redirect */}
                <Route
                  path="/"
                  element={
                    <Navigate to={user ? "/dashboard" : "/login"} />
                  }
                />

                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      {user?.role === "student" ? (
                        <StudentDashboard />
                      ) : (
                        <Dashboard />
                      )}
                    </ProtectedRoute>
                  }
                />

                {/* ================= ADMIN ROUTES ================= */}

                {/* Departments */}
                <Route
                  path="/departments"
                  element={
                    <ProtectedRoute>
                      <DepartmentList />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/departments/add"
                  element={
                    <ProtectedRoute>
                      <AddDepartment />
                    </ProtectedRoute>
                  }
                />

                {/* Courses */}
                <Route
                  path="/courses"
                  element={
                    <ProtectedRoute>
                      <CourseList />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/courses/add"
                  element={
                    <ProtectedRoute>
                      <AddCourse />
                    </ProtectedRoute>
                  }
                />

                {/* Students */}
                <Route
                  path="/students"
                  element={
                    <ProtectedRoute>
                      <StudentList />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/students/add"
                  element={
                    <ProtectedRoute>
                      <AddStudent />
                    </ProtectedRoute>
                  }
                />

                {/* ================= ATTENDANCE ROUTES ================= */}

                {/* Teacher / Admin */}
                <Route
                  path="/attendance"
                  element={
                    <ProtectedRoute>
                      <MarkAttendance />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/attendance/list"
                  element={
                    <ProtectedRoute>
                      <AttendanceList />
                    </ProtectedRoute>
                  }
                />

                {/* Student */}
                <Route
                  path="/my-attendance"
                  element={
                    <ProtectedRoute>
                      <MyAttendance />
                    </ProtectedRoute>
                  }
                />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
